import React from "react";
import Timer from "./common/Timer.jsx";
import "./Sidebar.css";


export default class GroupView extends React.Component {
  

  renderRoundNumber() {
    const { round } = this.props;
    return (
      <div>
        <h4>Round Number</h4>
        <span>
          {round.index + 1}/{numRounds}
        </span>
      </div>
    );
  }


  renderPlayer(game, otherPlayer) {
    const cumulativePayoff = otherPlayer.get("cumulativePayoff");
    const transparency = game.treatment.groupTransparency;
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar-other" />
        {transparency ? <div> Total coins: {cumulativePayoff}</div> : null}
      </div>
    );
  }
      

  renderRoundStage() {
    const { stage } = this.props;
    return (
      <div>
        <h4>Round Stage</h4>
        <span>{stage.name}</span>
      </div>
    );
  }

  renderRoundMU() {
    const { game } = this.props;
    return (
      <div>
        <h4>Your Round Coins</h4>
        <span>{game.treatment.endowment}</span>
      </div>
    );
  }

  
  render() {
    const { stage, game } = this.props;

    const showNRounds = game.treatment.showNRounds;
    return (
      <div className="sidebar-wrapper">
        {this.renderRoundMU()}
        <Timer stage={stage} />
      </div>
    );
  }
}
