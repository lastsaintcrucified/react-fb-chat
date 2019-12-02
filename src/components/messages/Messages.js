import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import Message from "./Message";

class Messages extends Component {
  state = {
    isPrivateChannel: this.props.isPrivateChannel,
    messages: [],
    messagesLoading: true,
    privateMessagesRef: firebase.database().ref("privatemessages"),
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numOfUniqueUser: "",
    searchState: false,
    searchTerm: "",
    searchResults: [],
    listeners: []
  };

  componentDidMount() {
    const { channel, user, listeners } = this.state;
    if (channel && user) {
      this.removeListeners(listeners);
      this.addListeners(channel.id);
    }
  }

  componentWillUnmount() {
    this.removeListeners(this.state.listeners);
  }
  addToListeners = (id, ref, event) => {
    const index = this.state.listeners.findIndex(listener => {
      return (
        listener.id === id && listener.ref === ref && listener.event === event
      );
    });

    if (index === -1) {
      const newListener = { id, ref, event };
      this.setState({ listeners: this.state.listeners.concat(newListener) });
    }
  };

  removeListeners = listeners => {
    listeners.forEach(listener => {
      listener.ref.child(listener.id).off(listener.event);
    });
  };

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messagesLoading: false });
      this.countUniqueUsers(loadedMessages);
    });
    this.addToListeners(channelId, ref, "child_added");
  };

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, isPrivateChannel } = this.state;
    return isPrivateChannel ? privateMessagesRef : messagesRef;
  };

  countUniqueUsers = messages => {
    const uniqueUser = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const numOfUniqueUser = `${uniqueUser.length} users`;
    this.setState({ numOfUniqueUser });
  };

  displayMessage = messages => {
    return (
      messages.length > 0 &&
      messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
      ))
    );
  };

  displayChannelName = channel => {
    return channel
      ? `${this.state.isPrivateChannel ? "@" : "#"}${channel.name}`
      : "";
  };

  handleSearchOnChange = e => {
    this.setState(
      {
        searchTerm: e.target.value,
        searchState: true
      },
      () => this.handleSearchMessages()
    );
  };
  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (message.content && message.content.match(regex)) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchState: false }), 1000);
  };

  render() {
    const {
      messagesRef,
      channel,
      user,
      messages,
      numOfUniqueUser,
      searchResults,
      searchState,
      isPrivateChannel
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          numOfUniqueUser={numOfUniqueUser}
          channelName={this.displayChannelName(channel)}
          handleSearchOnChange={this.handleSearchOnChange}
          searchState={searchState}
          isPrivateChannel={isPrivateChannel}
        />

        <Segment>
          <Comment.Group className="messages">
            {this.state.searchResults.length > 0
              ? this.displayMessage(searchResults)
              : this.displayMessage(messages)}
          </Comment.Group>
        </Segment>

        <MessagesForm
          currentUser={user}
          currentChannel={channel}
          messagesRef={messagesRef}
          isPrivateChannel={isPrivateChannel}
          getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
