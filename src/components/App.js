import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import ColorPanel from "./colorpanel/ColorPanel";
import SidePanel from "./sidepanel/SidePanel";
import Messages from "./messages/Messages";
import MetaPanel from "./metapanel/MetaPanel";
import "./App.css";

const App = props => {
  return (
    <Grid columns="equal" className="app">
      <ColorPanel />

      <SidePanel
        key={props.currentUser && props.currentUser.id}
        currentUser={props.currentUser}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={props.currentChannel && props.currentChannel.id}
          currentChannel={props.currentChannel}
          currentUser={props.currentUser}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
  };
};

export default connect(mapStateToProps)(App);
