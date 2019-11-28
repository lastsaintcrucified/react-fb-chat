import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Button,
  Segment,
  Header,
  Message,
  Icon
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errMsg: "",
    loading: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password, errMsg } = this.state;

    if (!email || !password) {
      this.setState({ errMsg: "You can not left a field empty!!" });
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          this.setState({ errMsg: null, loading: false });
          console.log(signedInUser);
        })
        .catch(err => {
          this.setState({
            errMsg: errMsg.concat(" and ", err),
            loading: false
          });
        });
    }
  };
  render() {
    const { email, password, errMsg, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ width: 480 }}>
          <Header as="h2" icon textAlign="center">
            <Icon name="user" color="purple" />
            Login
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
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
              <Button.Group>
                <Button
                  disabled={loading}
                  className={loading ? "loading" : null}
                  type="submit"
                >
                  login
                </Button>
                <Button.Or />
                <Button as={Link} to="/register" color="purple">
                  register
                </Button>
              </Button.Group>
            </Segment>
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

export default Login;
