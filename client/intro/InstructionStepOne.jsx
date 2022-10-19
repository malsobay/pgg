import React from "react";
import { Button } from "./Button";
import "./Instructions.css";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1> How the game works: </h1>
          <p>
            In this multi-player game, you will be in a group. Each person is
            given a set amount of coins at the start of each round. You will
            also be shown a money multiplier. There will be a public fund that
            you can choose to contribute to—you will not be able to see others'
            contributions before making your own. After everyone has
            contributed, the amount in the public fund will be multiplied by the
            money multiplier.
          </p>
          <br></br>
          <p>
            This amount is then evenly divided among the group as the "payoff".
            You get to keep the payoff and whatever you have left of your
            private funds. The diagram below shows an example:
          </p>
          <br></br>
          <br></br>
          <img
            className="public-fund-img"
            src="/experiment/images/explanation.png"
          ></img>
          <br></br>
          <br></br>
          <p>
            In this example, three players chose to contribute all 20 coins they
            were granted for the round, while one player contributed 0 coins.
            The total contribution, 60 coins, is then multiplied by a factor of
            2, making the total size of the public fund then 120 coins, which is
            equally distributed among the four players.
          </p>
          <br></br>
          <h1> Total coins and cash earnings: </h1>
          <p>
            You will have a total balance of coins throughout the game, with
            each round's earnings being added to this amount. Try to maximize
            your total coins! When the game concludes, the coins will be
            converted to a cash bonus towards your final payment.
          </p>
          <p>
            <strong>
              You will receive a base payment of ${game.treatment.basePay} for
              your participation in the game, in addition to $1 per{" "}
              {game.treatment.conversionRate} coins earned. To receive the bonus
              payment, please be sure to stay for all rounds of the game; the
              exit survey marks the end of the game and contains the code for
              submission. If you are detected to be idle, you forfeit the bonus
              amount.
            </strong>
          </p>

          <p className="space-x-4">
            <Button onClick={onPrev} disabled={!hasPrev}>
              Previous
            </Button>
            <Button onClick={onNext} disabled={!hasNext}>
              Next
            </Button>
          </p>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </Centered>
    );
  }
}
