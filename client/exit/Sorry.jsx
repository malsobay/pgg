import { Meteor } from "meteor/meteor";
import React, { Component } from "react";

export default class Sorry extends Component {
  static stepName = "Sorry";

  render() {
    const { player, game } = this.props;
    const basePay = game.treatment.basePay;
    let msg;
    switch (player.exitStatus) {
      case "gameFull":
        msg = `Unfortunately, all games are full. Please submit the task with the code C5LWTCFM, and you will be compensated for your time via partial payment.`;
        break;
      case "gameLobbyTimedOut":
        msg = `Unfortunately, not enough players joined to begin the game. Please submit the task with the code C5LWTCFM, and you will be compensated for your time via partial payment.`;
        break;
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait. Please return the task.";
        break;
      default:
        msg =
          "Unfortunately, the game is unable to launch. Please submit the task with the code C5LWTCFM";
        break;
    }
    if (player.exitReason === "failedQuestion") {
      msg =
        "Unfortunately, you did not meet the conditions required to play the game. Please submit the task with the code CGUQ2ZQU, and you will be compensated for your time via partial payment. ";
    }
    // Only for dev
    if (!game && Meteor.isDevelopment) {
      msg =
        "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs).";
    }
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="w-1/2 prose">
          <h4>Sorry!</h4>
          <p>Sorry, you were not able to play today! {msg}</p>
          <p>
            <strong>
              Please contact the researcher to see if there are more games
              available.
            </strong>
          </p>
        </div>
      </div>
    );
  }
}
