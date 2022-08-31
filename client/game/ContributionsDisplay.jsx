import React from "react";
import "./PunishmentResponse.css";

export default class ContributionsDisplay extends React.Component {
  render() {
    const { game, round, player } = this.props;
    const totalContributions = round.get("totalContributions");
    const contribution = player.round.get("contribution");
    const multiplier = game.treatment.multiplier;
    const playerCount = game.treatment.playerCount;
    const totalReturns = round.get("totalReturns");
    const payoff = round.get("payoff");

    return (
      <body>
        <div className="contributions-container-punishment">
          <h2 className="contributions-heading">Total Contributions</h2>
          <div className="contributions-total-wrapper">
            <div className="contributions-total-record">
              <b>Contributions</b>
            </div>
            <div className="contributions-total-record">
              <div>You contributed</div>
              <div>{contribution}</div>
            </div>
            <div className="contributions-total-record">
              <div>Others contributed</div>
              <div>+{totalContributions - contribution}</div>
            </div>
            <div className="divider"/>
            <div className="contributions-total-record">
              <div>Total contributions</div>
              <div>{totalContributions}</div>
            </div>
          </div>

          <div className="contributions-total-wrapper">
            <div className="contributions-total-record">
              <b>Total Returns</b>
            </div>
            <div className="contributions-total-record">
              <div>Total contributions</div>
              <div>{totalContributions}</div>
            </div>
            <div className="contributions-total-record">
              <div>Multiplier</div>
              <div>x{multiplier}</div>
            </div>
            <div className="divider"/>
            <div className="contributions-total-record">
              <div>Total returns</div>
              <div>{totalReturns}</div>
            </div>
          </div>

          <div className="contributions-total-wrapper">
            <div className="contributions-total-record">
              <b>Your Returns</b>
            </div>
            <div className="contributions-total-record">
              <div>Total returns</div>
              <div>{totalReturns}</div>
            </div>
            <div className="contributions-total-record">
              <div>All players</div>
              <div>/{game.treatment.playerCount}</div>
            </div>
            <div className="divider"/>
            <div className="contributions-total-record">
              <div>Your returns</div>
              <div>{payoff}</div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
