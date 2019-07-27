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
          {notes =>
            notes.map(note => <SidebarItem note={note} key={note.id} />)
          }
        </NotesContext.Consumer>
      </div>
    </div>
  );
};

export default Sidebar;
