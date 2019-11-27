import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Message,
  Icon
} from "semantic-ui-react";

class Register extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errMsg: "",
    loading: false,
    usersRef: firebase.database().ref("users")
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validatePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password < 6 || confirmPassword < 6) {
      return true;
    } else if (password !== confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { userName, email, password, confirmPassword, errMsg } = this.state;

    if (!userName || !email || !password || !confirmPassword) {
      this.setState({ errMsg: "You can not left a field empty!!" });
    } else if (this.validatePassword()) {
      this.setState({
        errMsg: "Passwords should match and more than 6 character"
      });
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: userName,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              console.log(createdUser);
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
              });
            });
          this.setState({ errMsg: null, loading: false });
        })
        .catch(err => {
          this.setState({
            errMsg: errMsg.concat(" and ", err),
            loading: false
          });
        });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      userName,
      email,
      password,
      confirmPassword,
      errMsg,
      loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ width: 480 }}>
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="rocket" color="green" />
            Register for broChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="userName"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={userName}
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                value={email}
                type="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                type="password"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                name="confirmPassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm password"
                value={confirmPassword}
                type="password"
                onChange={this.handleChange}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : null}
                color="green"
                size="large"
                fluid
              >
                Submit
              </Button>
            </Segment>

            <Message>
              Already a user?<Link to="/login">Login</Link>
            </Message>
          </Form>
          {errMsg ? (
            <Message attached="bottom" error>
              <Icon name="blind" />
              {errMsg}
            </Message>
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
