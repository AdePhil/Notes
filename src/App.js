import "./App.css";
import React from "react";
import Sidebar from "./Sidebar/index";
import Editor from "./Editor/index";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
