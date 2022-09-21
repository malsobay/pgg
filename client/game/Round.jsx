import React from "react";

import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import Contribution from "./pages/contribution/Contribution.jsx";
import Punishment from "./pages/punishment/Punishment.jsx";
import Outcome from "./pages/outcome/Outcome.jsx";
import "./Sidebar.css";

const roundSound = new Audio("sounds/round-sound.mp3");
const gameSound = new Audio("sounds/bell.mp3");

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }
  }

  render() {
    const { stage } = this.props;
    return (
      <div className="round">
        <RightSidebar {...this.props}/>
        <div className="body-wrapper">
          {stage.name === "contribution" && <Contribution {...this.props}/>}
          {stage.name === "outcome" && <Punishment {...this.props}/>}
          {stage.name === "summary" && <Outcome {...this.props}/>}
        </div>
        <LeftSidebar {...this.props} />
      </div>
    );
  }
}
