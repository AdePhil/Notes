import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { firestore } from "../firebase";

const collectIdAndDoc = doc => ({ ...doc.data(), id: doc.id });
export const NotesContext = React.createContext();

const NotesProvider = props => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore.collection("notes").onSnapshot(snapshot => {
      const notes = snapshot.docs.map(doc => collectIdAndDoc(doc));
      setNotes(notes);
    });
    return () => unsubscribe();
  });
  return (
    <NotesContext.Provider value={notes}>
      {props.children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {};

export default NotesProvider;
