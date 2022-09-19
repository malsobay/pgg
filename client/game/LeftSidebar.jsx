import React from "react";
import Timer from "./common/Timer.jsx";
import "./Sidebar.css";


export default class GroupView extends React.Component {
  
  render() {
    const { stage, game, player} = this.props;
    if(stage.name == "contribution"){
      return (
        <div className="sidebar-wrapper">
          <h4>Your Round Coins</h4>
          <span>{game.treatment.endowment}</span>
          <Timer stage={stage} />
        </div>
      );
    }
    else{
      return (
        <div className="sidebar-wrapper">
          <h4>Your Round Coins</h4>
          <span>{game.treatment.endowment - player.round.get("contribution")}</span>
          <Timer stage={stage} />
        </div>
      );
    }

  }
}
