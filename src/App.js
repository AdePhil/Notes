import "./App.css";
import React from "react";
import Sidebar from "./Sidebar/index";
import Editor from "./Editor/index";
import { NotesContext } from "./context/NotesProvider";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <NotesContext.Consumer>
        {({ notes, selectedNoteIndex }) => (
          <Editor
            note={notes[selectedNoteIndex] ? notes[selectedNoteIndex] : {}}
          />
        )}
      </NotesContext.Consumer>
    </div>
  );
}

export default App;
