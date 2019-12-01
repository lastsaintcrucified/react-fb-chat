import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import Message from "./Message";

class Messages extends Component {
  state = {
    messages: [],
    messagesLoading: true,
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numOfUniqueUser: "",
    searchState: false,
    searchTerm: "",
    searchResults: []
  };

  componentDidMount() {
    const { channel, user } = this.state;
    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messagesLoading: false });
      this.countUniqueUsers(loadedMessages);
    });
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

  displayChannelName = channel => (channel ? `#${channel.name}` : "");

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
      searchState
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          numOfUniqueUser={numOfUniqueUser}
          channelName={this.displayChannelName(channel)}
          handleSearchOnChange={this.handleSearchOnChange}
          searchState={searchState}
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
        />
      </React.Fragment>
    );
  }
}

export default Messages;
