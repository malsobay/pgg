import { createPortal } from "react-dom";

import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";
import { Header } from "../components/Header";

export class HeaderWithTimer extends React.Component {
  state = { help: false };

  render() {
    const { remainingSeconds, game, round, stage, player } = this.props;
    var min = Math.floor(remainingSeconds / 60);
    var sec = remainingSeconds % 60;

    let roundNum = `Round ${round.index + 1}`;

    if (game.treatment.showNRounds) {
      roundNum += ` of ${game.treatment.numRounds}`;
    }

    // roundNum += ` (${stage.displayName})`

    return (
      <div className="h-full w-full">
        <Header
          left={roundNum}
          showPiggyBank
          piggyBankAmount={player.get("cumulativePayoff")}
          timerMinutes={`${min < 10 ? "0" : ""}${min}`}
          timerSeconds={`${sec < 10 ? "0" : ""}${sec}`}
          right="Help"
          rightOnClick={() => this.setState({ help: true })}
        />
        {this.state.help ? (
          <HelpModal done={() => this.setState({ help: false })} />
        ) : null}
      </div>
    );
  }
}

function HelpModal({ done }) {
  return createPortal(
    <div
      className="h-screen w-screen fixed top-0 left-0 bg-white/70 p-20"
      onClick={done}
    >
      <div className="relative bg-white rounded-lg shadow-lg border-2 border-gray-200 h-full w-full flex p-2 overflow-auto">
        <button
          onClick={done}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-300 text-white text-2xl flex justify-center items-center leading-none"
        >
          &times;
        </button>
        <h1>Stages of the game</h1>
        Each round of the game has three stages:
        <ul>
          <li><strong>Contribution:</strong> Each player decides how much of their grant money (20 coins each round) to contribute to the public fund. The public fund is then multiplied and divided equally among players.</li>
          <li><strong>Outcome:</strong> The contributions and payoffs of each player are revealed.</li>
          <li><strong>Summary:</strong> A summary of the round is presented, where you can mouse over an avatar to see details of that player's outcome.</li>
        </ul>
        <h1>Calculating payoffs from contributions:</h1>
        <p>The amount each player receives from the public fund contributions is equal to (Total coins contributed) * (Multiplier) / (Number of players)</p>
        <h1>Deducting from other players:</h1>
        <p>During the outcome stage, you will have the option to deduct coins from other players. To do so, you must pay N coins per deduction, and each deduction will take away N coins from the targeted player.</p>
        <h1>Calculating your total payoff for a single round:</h1>
        <p>The total coins you gain for the round are calculated as (Number of coins remaining from the grant for the round) + (Your share from the public fund) - (Cost of any deductions you placed on others) - (Any deductions other players placed on you)</p>
        <p>Your payoff for a single round is then added to the total coins in your piggy bank.</p>
      </div>
    </div>,
    document.querySelector("#modal-root")
  );
}

const HeaderHeader = StageTimeWrapper(HeaderWithTimer);
export default HeaderHeader;
