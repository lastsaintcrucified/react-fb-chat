import React, { Component } from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";

class ColorPanel extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        vertical
        width="very thin"
        visible
        inverted
        icon="labeled"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" />
      </Sidebar>
    );
  }
}

export default ColorPanel;
