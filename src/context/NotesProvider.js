import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { firestore } from "../firebase";

const collectIdAndDoc = doc => ({ ...doc.data(), id: doc.id });
export const NotesContext = React.createContext();

const NotesProvider = props => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  useEffect(() => {
    const unsubscribe = firestore.collection("notes").onSnapshot(snapshot => {
      const notes = snapshot.docs.map(doc => collectIdAndDoc(doc));
      setNotes(notes);
    });
    return () => unsubscribe();
  });
  return (
    <NotesContext.Provider
      value={{ notes, selectedNoteIndex, note: notes[selectedNoteIndex] }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {};

export default NotesProvider;
