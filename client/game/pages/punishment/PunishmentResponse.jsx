import React from "react";
import "./punishment.css";

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
    const { player, game } = this.props;
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
      totalPunishmentCost += parseFloat(punished[key]) * game.treatment.punishmentCost;
    }

    if (totalPunishmentCost > cumulativePayoff) {
      this.setState({
        formError: "Error: deduction cost exceeds your total coins",
      });
    } else if (negatives > 0) {
      this.setState({ formError: "Error: deduction cannot be negative" });
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
         Waiting on other players... Please wait until all players are ready
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
          placeholder="# of deductions"
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
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    const punishmentExists = game.treatment.punishmentExists;


    if(!punishmentExists) {
      if (player.stage.submitted) {
        return this.renderSubmitted();
      } else{
      return (
        <form onSubmit={this.handleSubmit}>
              <div className="center">
                <button type="submit">
                Next
                </button>
              </div>

              <p className="center">{formError}</p>
            </form>
      )}
    }

    // If the player already submitted, don't show the input or submit button
    if (player.stage.submitted) {
      if (cumulativePayoff < 0) {
        return (
          <div className="center">
            <div>You do not have enough coins to deduct from other players</div>
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
                It will cost you {punishmentCost} coins to impose a deduction of {punishmentMagnitude} coins.
                The costs will be taken directly from your total coins, so
                you cannot exceed {Math.floor(cumulativePayoff/punishmentCost)} deductions.
              </p>
              <p>(leaving a deduction input blank is equivalent to no deduction)</p>
          </div>
            
          <form className="center" onSubmit={this.handleSubmit}>
            <div className="punishment-players-wrapper">
              {otherPlayers.map((player) => this.renderInput(player))}
            </div>
            <button type="submit">
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
