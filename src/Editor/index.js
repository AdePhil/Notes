import React, { useState, useContext, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { debounce } from "../utils/utils";
import { NotesContext } from "../context/NotesProvider";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const Editor = ({ note }) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const { updateNote, isSaving } = useContext(NotesContext);
  const debounceOnChange = React.useCallback(debounce(updateNote, 1500), []);

  // const latestTitle = useRef("");
  const inputRef = useRef();

  useEffect(() => {
    if (!note) {
      setId(null);
      setBody("");
      setTitle("");
    }
    if (note && note.id !== id) {
      console.log("here in effect");
      setId(note.id);
      setBody(note.body);
      setTitle(note.title);
    }
  }, [id, note]);

  useEffect(() => {
    debounceOnChange({
      id,
      body,
      title
    });
  }, [body, debounceOnChange, id, title]);

  const updateBody = async newBody => {
    if (body !== newBody) {
      setBody(newBody);
    }
  };

  const enableInput = async () => {
    await setIsDisabled(false);
    inputRef.current.focus();
  };

  const updateTitle = e => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleTitleChange = e => {
    e.preventDefault();
    updateNote({ id, body, title });
    setIsDisabled(true);
  };

  return (
    <div className="editor-container">
      <div className="editor">
        {id ? (
          <div className="flex flex-v-center">
            <button onClick={enableInput}>
              <img
                src="/img/pencil-edit.svg"
                alt="Edit icon"
                className="edit-icon"
              />
            </button>
            <form onSubmit={handleTitleChange}>
              <input
                ref={inputRef}
                type="text"
                value={title}
                onChange={updateTitle}
                className={`${
                  isDisabled ? "disabled editor-input" : "editor-input"
                }`}
                disabled={isDisabled}
              />
            </form>
            {isSaving ? <span className="bold">Saving...</span> : null}
          </div>
        ) : null}
        <ReactQuill
          style={{ height: "100%" }}
          value={body}
          onChange={updateBody}
        />
      </div>
    </div>
  );
};

export default Editor;
