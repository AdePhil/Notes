import React from "react";
import ReactQuill from "react-quill";
import { debounce } from "../utils/utils";
import { firestore } from "../firebase";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
class Editor extends React.Component {
  state = {
    body: this.props.note.body || "",
    title: this.props.note.title || "",
    id: this.props.note.id || null
  };

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

  update = debounce(() => {
    console.log("update function");
    const { id, body, title } = this.state;
    // const updatedAt = firestore.FieldValue.serverTimestamp();
    firestore
      .collection("notes")
      .doc(`${id}`)
      .update({ body, title, id });
  }, 1500);

  render() {
    return (
      <div className="editor-container">
        <div className="editor">
          <h1>Editor</h1>
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
