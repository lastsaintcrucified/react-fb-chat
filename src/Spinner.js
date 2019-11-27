import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content={"hold on a sec..."} />
    </Dimmer>
  );
};

export default Spinner;
