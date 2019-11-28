import React, { Component } from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };
  dropDownOption = () => [
    {
      key: "user",
      text: (
        <span>
          signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>change your avatar</span>
    },
    {
      key: "signed out",
      text: <span onClick={this.handleSignOut}>sign out</span>
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed Out!!"));
  };

  render() {
    const { displayName, photoURL } = this.state.user;
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/*App Header*/}
            <Header inverted floated="left" as="h2">
              <Icon name="rocket" />
              <Header.Content>broChat</Header.Content>
            </Header>
            {/*Drop down*/}
            <Header inverted as="h4" style={{ padding: "0.25em" }}>
              <Dropdown
                trigger={
                  <span>
                    <Image src={photoURL} spaced="right" avatar /> {displayName}
                  </span>
                }
                options={this.dropDownOption()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
