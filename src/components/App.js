import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import SidePanel from "./sidepanel/SidePanel";
import Messages from "./messages/Messages";
import MetaPanel from "./metapanel/MetaPanel";
import "./App.css";

const App = props => {
  return (
    <Grid columns="equal" className="app">
      <SidePanel
        key={props.currentUser && props.currentUser.id}
        currentUser={props.currentUser}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={props.currentChannel && props.currentChannel.id}
          currentChannel={props.currentChannel}
          currentUser={props.currentUser}
          isPrivateChannel={props.isPrivateChannel}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel
          key={props.currentChannel && props.currentChannel.id}
          currentChannel={props.currentChannel}
          isPrivateChannel={props.isPrivateChannel}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
  };
};

export default connect(mapStateToProps)(App);
