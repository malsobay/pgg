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
        <p>Some text in the Modal..</p>
      </div>
    </div>,
    document.querySelector("#modal-root")
  );
}

const HeaderHeader = StageTimeWrapper(HeaderWithTimer);
export default HeaderHeader;
