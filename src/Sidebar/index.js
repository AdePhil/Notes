import React from "react";
import "./styles.css";
import { NotesContext } from "../context/NotesProvider";
import SidebarItem from "../SidebarItem/index";

const Sidebar = props => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2>My Notes</h2>
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
