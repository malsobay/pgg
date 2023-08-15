import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { Label } from "./Label";
import { StageTimeWrapper } from "meteor/empirica:core";

// Enable forceDebug to manually mark players as pre-ready
// and avoid triggering onNext()

export class ReadyCheck extends React.Component {

  setPlayerReady(player){
    player.set("readyCheck", true);
    player.stage.submit();
  }

  render() {
    const { game, stage, player, remainingSeconds} = this.props;
    const validPlayers = _.reject(game.players, (p) => p.get("exited")); 
    const numPlayers = validPlayers.length; 
    const numReady = validPlayers.map(x => x.stage.submitted).reduce((a, b) => a + b, 0); 
    
    
    

    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-[400px] center flex flex-col space-y-4 items-center justify-center">
        <div className="text-yellow-300">
            <Icon icon={IconNames.TIME} size={64} intent="primary" />
          </div>
          <Label className="text-center" color="gray">
            The game will begin in <strong>{remainingSeconds}</strong> seconds. Please do not navigate away from the page
            while other players join.
          </Label>
          <Label className="text-center" color="orange">
            {numReady} / {numPlayers} players ready
          </Label>
      {player.stage.submitted ? 
      <>
      <br/>
      <Label className="text-center" color="green">
      You have confirmed that you're ready to start! Waiting on {numPlayers - numReady} other players to confirm...
      </Label>
      </> : 
      <>
        <br/>
        <Label className="text-center" color="gray">
        Please click the button to confirm that you are ready to begin, otherwise you will be considered idle and removed from the game.
        </Label>
        <button
        className="text-2xl px-8 py-5 font-bold text-white border-green-700 border-4 rounded bg-green-500"
        onClick={() => this.setPlayerReady(player)}> I'm ready to start!
        </button>
        </>
      }
    </div></div>
    )
  }
}

const WrappedReadyCheck = StageTimeWrapper(ReadyCheck);
export default WrappedReadyCheck;



