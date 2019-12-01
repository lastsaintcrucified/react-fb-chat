import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    const {
      channelName,
      numOfUniqueUser,
      handleSearchOnChange,
      searchState
    } = this.props;
    return (
      <Segment clearing>
        {/**Channel Title */}
        <Header as="h2" floated="left">
          <span>
            {channelName}
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>{numOfUniqueUser}</Header.Subheader>
        </Header>

        {/**Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            onChange={handleSearchOnChange}
            placeholder="Search Messages"
            loading={searchState}
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
