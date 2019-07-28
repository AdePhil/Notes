import React from "react";
import ReactQuill from "react-quill";
import { debounce } from "../utils/utils";
import { NotesContext } from "../context/NotesProvider";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
class Editor extends React.Component {
  state = {
    body: this.props.note.body || "",
    title: this.props.note.title || "",
    id: this.props.note.id || null,
    isDisabled: true
  };

  static contextType = NotesContext;

  componentDidUpdate = oldProps => {
    if (this.props.note.id !== this.state.id) {
      const { body, id, title } = this.props.note;
      this.setState({ body, title, id });
    }
  };

  updateBody = async body => {
    if (this.state.body !== body) {
      await this.setState({ body });
      this.update();
    }
  };

  updateTitle = e => {
    const title = e.target.value;
    this.setState({ title });
  };

  handleTitleChange = e => {
    e.preventDefault();
    const { body, id, title } = this.state;
    this.context.updateNote({ id, body, title });
    this.setState({ isDisabled: true });
  };

  update = debounce(() => {
    console.log("update function");
    const { id, body, title } = this.state;
    // const updatedAt = firestore.FieldValue.serverTimestamp();
    this.context.updateNote({ id, body, title });
  }, 1500);

  render() {
    const { title, isDisabled } = this.state;
    return (
      <div className="editor-container">
        <div className="editor">
          <div className="flex">
            <button onClick={() => this.setState({ isDisabled: false })}>
              <img
                src="/img/pencil-edit.svg"
                alt="Edit icon"
                className="edit-icon"
              />
            </button>
            <form onSubmit={this.handleTitleChange}>
              <input
                type="text"
                value={title}
                onChange={this.updateTitle}
                className={`${
                  isDisabled ? "disabled editor-input" : "editor-input"
                }`}
                disabled={isDisabled}
              />
            </form>
          </div>
          <ReactQuill
            style={{ height: "100%" }}
            value={this.state.body}
            onChange={this.updateBody}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
