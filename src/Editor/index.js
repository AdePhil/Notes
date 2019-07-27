import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { NotesContext } from "../context/NotesProvider";
const Editor = props => {
  return (
    <div className="editor-container">
      <div className="editor">
        <h1>Editor</h1>
        <NotesContext.Consumer>
          {({ notes, selectedNoteIndex }) => (
            <ReactQuill
              style={{ height: "100%" }}
              value={notes[selectedNoteIndex] && notes[selectedNoteIndex].body}
            />
          )}
        </NotesContext.Consumer>
      </div>
    </div>
  );
};

export default Editor;
