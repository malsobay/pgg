import React from "react";
import Timer from "./common/Timer.jsx";
import "./Sidebar.css";


export default class GroupView extends React.Component {
  
  render() {
    const { stage, game } = this.props;
    return (
      <div className="sidebar-wrapper">
        <h4>Your Round Coins</h4>
        <span>{game.treatment.endowment}</span>
        <Timer stage={stage} />
      </div>
    );
  }
}
