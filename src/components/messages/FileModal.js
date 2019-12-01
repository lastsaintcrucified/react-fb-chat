import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import mime from "mime-types";

class FileModal extends Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"]
  };

  isAuthorized = fileName =>
    this.state.authorized.includes(mime.lookup(fileName));

  addFile = e => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, close } = this.props;
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        close();
        this.clearFile();
      }
    }
  };

  clearFile = () => this.setState({ file: null });

  render() {
    const { modal, close } = this.props;

    return (
      <Modal basic open={modal} onClose={close}>
        <Modal.Header>Select an Image File</Modal.Header>

        <Modal.Content>
          <Input
            fluid
            label="file type jpeg,png"
            onChange={this.addFile}
            name="file"
            type="file"
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
            <Icon name="checkmark" />
            Send
          </Button>
          <Button color="red" inverted onClick={close}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default FileModal;
