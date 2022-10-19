import React from "react";
import { Button } from "./Button";
import "./Instructions.css";
import { Centered } from "meteor/empirica:core";

export default class InstructionStepTwo extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    const punishmentMagnitude = game.treatment.punishmentMagnitude;
    const punishmentCost = game.treatment.punishmentCost;
    return (
      <Centered>
        <div className="instructions">
          <h1> Viewing the group's contributions: </h1>
          <p>
            After each round of contributions, you will be able to see how much
            each member contributed, as shown below:
          </p>
          <img
            src="/experiment/images/InstructionsPunishment.png"
            className="instructions-img-punishment"
          ></img>
          <h1> Deductions: </h1>
          <p>
            You have the ability to deduct coins from other players, but doing
            so comes at a cost. Each deduction you impose will deduct{" "}
            {punishmentMagnitude} coins from the intended player and{" "}
            {punishmentCost} coins from your total coins. You can deduct coins
            from other players as long as you have a positive number of total
            coins.
          </p>
          <p className="space-x-4">
            <Button onClick={onPrev} disabled={!hasPrev}>
              Previous
            </Button>
            <Button onClick={onNext} disabled={!hasNext}>
              Next
            </Button>
          </p>{" "}
        </div>
      </Centered>
    );
  }
}
