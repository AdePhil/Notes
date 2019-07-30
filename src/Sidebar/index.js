import React, { useState, useContext, useRef, useEffect } from "react";
import "./styles.css";
import { NotesContext } from "../context/NotesProvider";
import SidebarItem from "../SidebarItem/index";

const Sidebar = props => {
  const [title, setTitle] = useState("");
  const [isEditable, setEditable] = useState(false);
  const { addNote, isLoading } = useContext(NotesContext);
  const inputRef = useRef();

  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
    }
  }, [isEditable]);
  const handleSubmit = e => {
    e.preventDefault();
    addNote(title);
    setEditable(false);
    setTitle("");
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {isLoading ? (
          <div className="loader">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              />
            </svg>
          </div>
        ) : null}
        <div className="flex flex-h-bet flex-v-center sidebar-heading">
          <h2>My Notes</h2>
          <button onClick={() => setEditable(true)}>
            <img src="/img/pencil-edit-w.svg" alt="" />
          </button>
        </div>
        {isEditable ? (
          <form onSubmit={handleSubmit}>
            <div className="flex input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder={"Enter note title"}
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="title-input"
                onBlur={() => setEditable(false)}
              />
              <button className="add">Add</button>
            </div>
          </form>
        ) : null}
        <NotesContext.Consumer>
          {({ notes, selectedNoteIndex, setSelectedNoteIndex, deleteNote }) =>
            notes.map((note, i) => (
              <SidebarItem
                note={note}
                key={note.id}
                index={i}
                selectedNoteIndex={selectedNoteIndex}
                setSelectedNoteIndex={setSelectedNoteIndex}
                deleteNote={deleteNote}
              />
            ))
          }
        </NotesContext.Consumer>
      </div>
    </div>
  );
};

export default Sidebar;
