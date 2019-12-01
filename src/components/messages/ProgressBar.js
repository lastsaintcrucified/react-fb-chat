import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploadState, percentUploaded }) =>
  uploadState === "uploading" && (
    <Progress
      className="progress__bar"
      progress
      size="medium"
      percent={percentUploaded}
      indicating
      inverted
    />
  );

export default ProgressBar;
