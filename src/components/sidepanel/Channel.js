import React, { Component } from "react";
import firebase from "../../firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channel extends Component {
  state = {
    channels: [],
    channelName: "",
    channelDetails: "",
    channelRef: firebase.database().ref("channels"),
    user: this.props.currentUser,
    modal: false
  };

  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true });

  isFormValid = () => this.state.channelName && this.state.channelDetails;

  addChannel = () => {
    const { channelName, channelDetails, user, channelRef } = this.state;
    const key = channelRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };
    channelRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.addListener();
  }

  addListener = () => {
    let loadedChannels = [];
    this.state.channelRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };

  displayChannel = channels => {
    return (
      channels.length > 0 &&
      channels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => console.log(channel)}
          name={channel.name}
          style={{ opacity: "0.7" }}
        >
          #{channel.name}
        </Menu.Item>
      ))
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid) {
      this.addChannel();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              Channels
            </span>{" "}
            ({channels.length}){" "}
            <Icon name="add" onClick={this.openModal} floated="right" />
          </Menu.Item>
          {this.displayChannel(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  name="channelName"
                  onChange={this.handleChange}
                  label="Name of Channel"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  name="channelDetails"
                  onChange={this.handleChange}
                  label="About Channel"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" onClick={this.handleSubmit} />
              Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channel;
