import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <div className="finished">
        <div>
          <h4>Finished!</h4>
          <p>Thank you for participating! Please submit the following code: <strong>C2A8NL83</strong></p>
        </div>
      </div>
    );
  }
}
