import React, { useEffect, useState } from "react";
import firebase, { firestore } from "../firebase";

export const NotesContext = React.createContext();

const NotesProvider = props => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const collectIdAndDoc = doc => ({ ...doc.data(), id: doc.id });
  useEffect(() => {
    let unsubscribe;
    try {
      setIsLoading(true);
      unsubscribe = firestore
        .collection("notes")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setIsLoading(false);
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

  const updateNote = async ({ id, body, title }) => {
    const currentNote = notes[selectedNoteIndex];
    if (!id) return;
    if (!body && !body.trim() && body.trim() === currentNote.body.trim())
      return;
    if (!title && !title.trim() && body.trim() === currentNote.body.trim())
      return;
    setIsSaving(true);
    try {
      await firestore
        .collection("notes")
        .doc(`${id}`)
        .update({
          body,
          title,
          id,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  };
  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNoteIndex,
        setSelectedNoteIndex,
        deleteNote,
        addNote,
        updateNote,
        isLoading,
        isSaving
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
