import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

export const NotesContext = React.createContext();

const NotesProvider = props => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);

  const collectIdAndDoc = doc => ({ ...doc.data(), id: doc.id });
  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firestore.collection("notes").onSnapshot(snapshot => {
        const notes = snapshot.docs.map(doc => collectIdAndDoc(doc));
        setNotes(notes);
      });
    } catch (error) {
      console.log(error);
    }

    return () => unsubscribe();
  }, []);
  const deleteNote = async note => {
    console.log("here in delete note ", note);
    try {
      await firestore
        .collection("notes")
        .doc(`${note.id}`)
        .delete();
      if (selectedNoteIndex > notes.length - 2) {
        setSelectedNoteIndex(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NotesContext.Provider
      value={{ notes, selectedNoteIndex, setSelectedNoteIndex, deleteNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
