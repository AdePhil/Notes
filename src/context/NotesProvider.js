import React, { useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";

export const NotesContext = React.createContext();

const NotesProvider = props => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);

  const collectIdAndDoc = doc => ({ ...doc.data(), id: doc.id });
  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firestore
        .collection("notes")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
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

  const addNote = async title => {
    const time = firebase.firestore.FieldValue.serverTimestamp();
    const docRef = await firestore.collection("notes").add({
      title,
      body: "",
      createdAt: time,
      updatedAt: time
    });
    const newNote = { id: docRef.id, title, body: "" };
    await setNotes([newNote, ...notes]);
    const index = notes.indexOf(notes.filter(note => note.id === docRef.id)[0]);
    if (index !== -1) {
      selectedNoteIndex(index);
    }
    console.log(index);
  };

  const updateNote = ({ id, body, title }) => {
    if (!id) return;
    console.table({ id, body, title });
    firestore
      .collection("notes")
      .doc(`${id}`)
      .update({
        body,
        title,
        id,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNoteIndex,
        setSelectedNoteIndex,
        deleteNote,
        addNote,
        updateNote
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
