import React, { useState, useContext } from "react";
import "./styles.css";
import { NotesContext } from "../context/NotesProvider";
import SidebarItem from "../SidebarItem/index";

const Sidebar = props => {
  const [title, setTitle] = useState("");
  const [isEditable, setEditable] = useState(false);
  const { addNote } = useContext(NotesContext);

  const handleSubmit = e => {
    e.preventDefault();
    addNote(title);
    setEditable(false);
    setTitle("");
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="flex flex-h-bet flex-v-center sidebar-heading">
          <h2>My Notes</h2>
          <button onClick={() => setEditable(true)}>
            <img src="/img/pencil-edit.svg" alt="" />
          </button>
        </div>
        {isEditable ? (
          <form onSubmit={handleSubmit}>
            <div className="flex input-wrapper">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button>Add</button>
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
