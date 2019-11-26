import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  state = {};
  handleChange = () => {};
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ width: 480 }}>
          <Header as="h2" icon color="green" textAlign="center">
            <Icon name="rocket" color="green" />
            Register for broChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                onchange={this.handleChange}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                onchange={this.handleChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onchange={this.handleChange}
              />
              <Form.Input
                fluid
                name="confirmpassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                onchange={this.handleChange}
              />
              <Button color="green" size="large" fluid>
                Submit
              </Button>
            </Segment>
            <Message>
              Already a user?<Link to="/login">Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
