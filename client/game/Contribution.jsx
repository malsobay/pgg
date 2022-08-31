import React from "react";

import ContributionResponse from "./ContributionResponse";
import ContributionPrompt from "./ContributionPrompt.jsx";
import "./Contribution.css";

export default class Contribution extends React.Component {
  render() {
    return (
      <div className="contribution-body">
        <ContributionPrompt {...this.props} />
        <ContributionResponse {...this.props} />
      </div>
    );
  }
}
