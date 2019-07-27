import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const Editor = () => {
  return (
    <div className="editor-container">
      <div className="editor">
        <h1>Editor</h1>
        <ReactQuill style={{ height: "100%" }} />
      </div>
    </div>
  );
};

export default Editor;
