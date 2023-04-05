import React from "react";
import { TimeSync } from "meteor/mizzao:timesync";


import Contribution from "./Contribution.jsx";
import Outcome from "./Outcome.jsx";
import Summary from "./Summary.jsx";
import IdleToast from "../components/Idle.jsx";
let timerID = ""

const roundSound = new Audio("sounds/round-sound.mp3");
const gameSound = new Audio("sounds/bell.mp3");
  
export default class Round extends React.Component {
  componentDidMount() {
    const { game, player } = this.props;
    
    // Audio alerts
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }

    timerID = setInterval(() => player.set("lastTick", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf()), 3000);
  }

  componentWillUnmount() {
    clearInterval(timerID)
  }
  
  render() {
    const { stage, game, player} = this.props;
    
    return (
      <div className="w-full h-full font-sans">
        {<IdleToast {...this.props}/>}
        {stage.name === "contribution" && <Contribution {...this.props} />}
        {stage.name === "outcome" && <Outcome {...this.props} />}
        {stage.name === "summary" && <Summary {...this.props} />}
      </div>
    );
  }
}
