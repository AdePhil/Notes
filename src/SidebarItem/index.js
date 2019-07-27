import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { strip } from "../utils/utils";

const SidebarItem = ({ note, index, selectedNoteIndex }) => {
  return (
    <div
      className={`sidebar-item ${index === selectedNoteIndex ? "active" : ""}`}
    >
      <div className="flex flex-h-bet">
        <h2>{note.title}</h2>
        <img src="/img/delete.svg" alt="Delete note" />
      </div>
      <p>{strip(note.body)}</p>
    </div>
  );
};

SidebarItem.propTypes = {};

export default SidebarItem;
