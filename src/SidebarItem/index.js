import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const SidebarItem = ({ note }) => {
  return (
    <div className="sidebar-item">
      <div class="flex flex-h-bet">
        <h2>{note.title}</h2>
        <img src="/img/delete.svg" alt="Delete note" />
      </div>
      <p>{note.body}</p>
    </div>
  );
};

SidebarItem.propTypes = {};

export default SidebarItem;
