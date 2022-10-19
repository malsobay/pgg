import React from "react";
import { Button } from "./Button";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { players: "", punishment: "", payoff: "", kept: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit =
    (players, punishmentMagnitude, punishmentExists) => (event) => {
      event.preventDefault();

      if (
        this.state.players !== String(players - 1) ||
        (this.state.punishment !== String(2 * punishmentMagnitude) &&
          punishmentExists) ||
        this.state.payoff != "10" ||
        this.state.kept != "6"
      ) {
        alert(
          "You have an incorrect answer; please read the instructions and try again."
        );
      } else {
        this.props.onNext();
      }
    };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    const { players, punishment, payoff, kept } = this.state;
    const playerCount = game.treatment.playerCount;
    const punishmentExists = game.treatment.punishmentExists;
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form
            onSubmit={this.handleSubmit(
              playerCount,
              punishmentMagnitude,
              punishmentExists
            )}
          >
            <p>
              <label htmlFor="sum">
                {" "}
                In this game there will be a total of {playerCount} players. How
                many players are there other than yourself?{" "}
              </label>
              <input
                type="text"
                dir="auto"
                id="sum"
                name="players"
                placeholder="e.g. 1"
                value={players}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="horse">
                {" "}
                Imagine that in a given round, you have a starting fund of 10
                coins. If you contribute 4 coins, how much of your starting
                funds do you keep?
              </label>
              <input
                type="text"
                dir="auto"
                id="kept"
                name="kept"
                placeholder="e.g. 10"
                value={kept}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="horse">
                Imagine that in a given round, the money multiplier is 2, there
                are only 3 players, and players contributed the following
                amounts:
                <div> Player 1: 10 Coins </div> <div> Player 2: 4 Coins </div>
                <div> Player 3: 1 Coins </div>
                <br></br>What is the round payoff? (round payoff = sum of
                contributions x multiplier / the number of players){" "}
              </label>
              <input
                type="text"
                dir="auto"
                id="payoff"
                name="payoff"
                placeholder="e.g. 20"
                value={payoff}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            {punishmentExists && (
              <>
                <p>
                  <label htmlFor="horse">
                    Each deduction you impose on another player deducts{" "}
                    {punishmentMagnitude} coins from them, and costs you{" "}
                    {punishmentCost} coins. If you spend {2 * punishmentCost}{" "}
                    coins to deduct from another player, how many coins will be
                    deducted from them?
                  </label>
                  <input
                    type="text"
                    dir="auto"
                    id="punishment"
                    name="punishment"
                    placeholder="e.g. 2"
                    value={punishment}
                    onChange={this.handleChange}
                    autoComplete="off"
                    required
                  />
                </p>
              </>
            )}
            <p className="space-x-4">
              <Button onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </Button>
              <Button type="submit">Next</Button>
            </p>{" "}
          </form>
        </div>
      </Centered>
    );
  }
}
