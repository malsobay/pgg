import React from "react";
import {  AlertToaster } from "meteor/empirica:core";


import Contribution from "./Contribution.jsx";
import Outcome from "./Outcome.jsx";
import Summary from "./Summary.jsx";
import IdleToast from "../components/Idle.jsx";

const roundSound = new Audio("sounds/round-sound.mp3");
const gameSound = new Audio("sounds/bell.mp3");

const setTimeout = function(player) {
  if(!player.get('exitTimeoutId')) {
    player.set('exitTimeoutId', Meteor.setTimeout(() => {
      
      AlertToaster.show({message: "Oops, one of the other players disconnected! The game will continue without them."}); 
      player.set('exited', true);
      player.exit("Oops, it looks like there was a connection problem, and you couldn't finish the experiment!")
      
    }, 10000)) //TODO longer
  }
}

const cancelTimeout = function(player) {
  const id = player.get('exitTimeoutId')
  if(id) {
    Meteor.clearTimeout(id)
    player.set('exitTimeoutId', null)
  }
}

export default class Round extends React.Component {
  componentDidMount() {
    const { game } = this.props;
    
    // Audio alerts
    if (game.get("justStarted")) {
      //play the bell sound only once when the game starts
      gameSound.play();
      game.set("justStarted", false);
    } else {
      roundSound.play();
    }




  }

  render() {
    const { stage, game } = this.props;

    // Player disconnection checks, https://github.com/vboyce/FYP/blob/main/experiments/tangram_continue/client/game/Round.jsx
    _.reject(game.players, (p) => p.get("exited")).forEach(player => {
      if (!player.online)
      { setTimeout(player)
      //console.log("warning")
    }
      else {
        cancelTimeout(player)
        //console.log("good")
      }
    })

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
