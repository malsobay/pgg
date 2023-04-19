import React from "react";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="w-1/2 prose">
          <h4>Finished!</h4>
          <p>
            Thank you for participating! Your bonus will be processed shortly.
          </p>
        </div>
      </div>
    );
  }
}
