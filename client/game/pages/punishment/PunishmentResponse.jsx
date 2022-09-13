import React, { Component } from "react";
import "./PunishmentResponse.css";

export default class PunishmentResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: "",
      amountValid: false,
      punishmentDict: {},
    };
  }

  handleChange = (event, param) => {
    const { player } = this.props;
    const punished = player.round.get("punished");
    punished[param] = event.target.value;
    player.round.set("punished", punished);
  };

  handleClick = (event, player) => {
    event.preventDefault();
    showInput = true;
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    const punished = player.round.get("punished");

    const cumulativePayoff = parseFloat(player.get("cumulativePayoff"));
    let totalPunishmentCost = 0;
    const punishedKeys = Object.keys(punished);
    let negatives = 0;

    for (const key of punishedKeys) {
      if (parseFloat(punished[key]) < 0) {
        negatives += 1;
      }
      totalPunishmentCost += parseFloat(punished[key]);
    }

    if (totalPunishmentCost > cumulativePayoff) {
      this.setState({
        formError: "Error: punishment cost exceeds your total coins",
      });
    } else if (negatives > 0) {
      this.setState({ formError: "Error: punishment cannot be negative" });
    } else {
      this.setState({ formError: "" });
    }
    if (totalPunishmentCost > cumulativePayoff || negatives > 0) {
    } else {
      this.props.player.stage.submit();
    }
  };

  renderSubmitted() {
    return (
      <div className="waiting-response-container">
        Waiting on other players' punishments...
      </div>
    );
  }

  renderInput(player) {
    const contribution = player.round.get("contribution");

    return (
      <div className="punishment-player-wrapper">
        <img
          src={player.get("avatar")}
          className="player-avatar"
        />
        <div> Contributed: {contribution} Coins </div>
        <input
          type="number"
          id={player._id}
          onChange={(event) => this.handleChange(event, player._id)}
          min="0"
          placeholder="# of punishments"
          className="input-area"
        />
      </div>
    );
  }

  renderPlayer(player) {
    const contribution = player.round.get("contribution");
    let showInput = false;
    return (
      <div>
        <button onClick={(event) => this.handleClick(event, player)}>
          Player: {player._id}
          {<img src={player.get("avatar")} className="player-avatar" />}
          <div>Contribution: {contribution} coins</div>
        </button>
        {showInput ? this.renderInput(player) : null}
      </div>
    );
  }

  render() {
    const { game, player } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const formError = this.state.formError;
    const cumulativePayoff = player.get("cumulativePayoff");
    const punishment = game.treatment.punishment;

    // If the player already submitted, don't show the input or submit button
    if (player.stage.submitted) {
      if (cumulativePayoff < 0) {
        return (
          <div className="center">
            <div>You do not have enough to punish other players</div>
            {this.renderSubmitted()}
          </div>
        );
      }
      return this.renderSubmitted();
    }

    if (cumulativePayoff > 0) {
      return (
        <>
          <div className="instructions-text">
            <p>
              It will cost you 1 coin to impose a punishment of {punishment} coins.
              The costs will be taken directly from your cumulative payoff, so
              you cannot exceed {cumulativePayoff} punishments.
            </p>
            <p>(leaving a punishment input blank is equivalent to zero punishment)</p>
          </div>
            
          <form className="center" onSubmit={this.handleSubmit}>
            <div className="punishment-players-wrapper">
              {otherPlayers.map((player) => this.renderInput(player))}
            </div>
            <button type="submit" className="button">
              Next
            </button>

            <p>{formError}</p>
          </form>
        </>
      );
    } else {
      return <div>{this.props.player.stage.submit()}</div>;
    }
  }
}
