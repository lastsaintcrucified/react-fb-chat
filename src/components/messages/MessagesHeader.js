import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    return (
      <Segment clearing>
        {/**Channel Title */}
        <Header as="h2" floated="left">
          <span>
            Channel
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2user</Header.Subheader>
        </Header>

        {/**Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
