import React from "react";

import Contribution from "./Contribution.jsx";
import Outcome from "./Outcome.jsx";
import Summary from "./Summary.jsx";
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
      <div className="w-full h-full font-sans">
        {stage.name === "contribution" && <Contribution {...this.props} />}
        {stage.name === "outcome" && <Outcome {...this.props} />}
        {stage.name === "summary" && <Summary {...this.props} />}
      </div>
    );
  }
}
