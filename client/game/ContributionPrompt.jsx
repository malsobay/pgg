import React from "react";
import "./Contribution.css";
export default class ContributionPrompt extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    const multiplier = game.treatment.multiplier;
    const endowment = game.treatment.endowment;
    const returnsA = (endowment * multiplier) / 2;
    const returnsB = (endowment * multiplier) / 2 + endowment;
    const returnsBoth = endowment * multiplier;
    const returnsNeither = 0;
    /*const returnsBoth = (
      ((parseFloat(playerValue) + parseFloat(playerBValue)) * multiplier) /
      2
    ).toFixed(0);
    const returnsA = ((playerValue * multiplier) / 2).toFixed(0);
    const returnsA_other = parseFloat(returnsA) + parseFloat(playerBValue);

    const returnsB = ((playerBValue * multiplier) / 2).toFixed(0);
    const returnsB_other = parseFloat(returnsB) + parseFloat(playerValue);
    */

    return (
      <div>
        <div className="contribution-container">
          <h2 className="contribution-heading">
            Contributions
          </h2>
          <h4> Multiplier: {multiplier}x</h4>
          <div className="contribution-image"/>
        </div>
        <div className="instructions-text">
        You can contribute any of your {endowment} money units towards the
            public fund, which will be multiplied then divided equally among the
            group.
        </div>
        {/*
        <div>Rounded table shown below</div>

        <div>
          <table>
            <tr>
              <th></th>
              <th>B contributes</th>
              <th>B does not contribute</th>
            </tr>
            <tr>
              <th>You contribute</th>
              <th>
                {returnsBoth} / {returnsBoth}
              </th>
              <th>
                {returnsA} / {returnsB}
              </th>
            </tr>
            <tr>
              <th> You do not contribute </th>
              <th>
                {returnsB} / {returnsA}
              </th>
              <th>
                {returnsNeither} / {returnsNeither}
              </th>
            </tr>
          </table>
            </div>

    */}
      </div>
    );
  }
}
