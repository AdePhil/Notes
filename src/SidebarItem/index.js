import React from "react";
import "./styles.css";
import { strip } from "../utils/utils";

const SidebarItem = ({
  note,
  index,
  selectedNoteIndex,
  setSelectedNoteIndex,
  deleteNote
}) => {
  return (
    <div
      className={`sidebar-item ${index === selectedNoteIndex ? "active" : ""}`}
      onClick={() => setSelectedNoteIndex(index)}
    >
      <div className="flex flex-h-bet">
        <h2>{note.title}</h2>
        <button onClick={() => deleteNote(note)}>
          <img src="/img/delete.svg" alt="Delete note" />
        </button>
      </div>
      <p>{strip(`${note.body}`)}</p>
    </div>
  );
};

export default SidebarItem;
