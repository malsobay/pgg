import React from "react";
import { StageTimeWrapper } from "meteor/empirica:core";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpContent";

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

const HeaderHeader = StageTimeWrapper(HeaderWithTimer);
export default HeaderHeader;
