import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { Label } from "./Label";
// import LobbyIdle from "../components/LobbyIdle.jsx";

const attentionCheckDuration = 30 * 1000;
const delayTimeoutDuration = 10 * 1000;

// Enable forceDebug to manually mark players as pre-ready
// and avoid triggering onNext()
const forceDebug = false;

const preReadyKey = (id) => `player-pre-ready-${id}`;
const realReadyKey = (id) => `player-ready-${id}`;
const failedKey = (id) => `player-failed-${id}`;

export class ReadyCheck extends React.Component {
  state = { 
    preReadyCount: 0,
    realReadyCount: 0,
    attentionCheck: null,
    timeLeft: null,
    failedAttentionCheck: false,
  }

  constructor(props) {
    super(props);

    this.debug = forceDebug || props.debug;
    this.preReadyKey = preReadyKey(props.player._id);
    this.realReadyKey = realReadyKey(props.player._id);
    this.failedReadyKey = failedKey(props.player._id);
  }

  componentDidMount() {
    if (!this.debug) {
      const { gameLobby } = this.props;
      gameLobby.set(this.preReadyKey, true);
    }

    this.checkReadyness()
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkReadyness()
    this.checkAttentionTimer(prevState)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkAttentionTimer(prevState) {
    const { attentionCheck, timeLeft, failedAttentionCheck } = this.state;

    if (failedAttentionCheck) {
      return;
    }
    
    if (attentionCheck && !prevState.attentionCheck) {
      this.startAttentionTimer(attentionCheck);
  
      return;
    }

    if (!attentionCheck && prevState.attentionCheck) {
      clearInterval(this.interval);

      return;
    }

    if (timeLeft === 0) {
      this.timerRanOut();
    }
  }
      
  startAttentionTimer(attentionCheck) {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const secs = (attentionCheckDuration - (now - attentionCheck)) / 1000;
      const timeLeft = Math.max(0, Math.ceil(secs));
      if (this.debug) {
        console.log("tick", timeLeft);
      }
      this.setState({ timeLeft });
    }, 1000);
  }

  timerRanOut() {
    clearInterval(this.interval);

    this.setState({
      failedAttentionCheck: true,
      attentionCheck: null,
      timeLeft: null,
    });

    if (this.debug) {
      console.log("Y'all not ready!");
    }

    setTimeout(() => {
      this.kickPlayersOut();
    }, delayTimeoutDuration);
  }

  kickPlayersOut() {
    const { gameLobby } = this.props;

    for (const player of this.props.gameLobby.queuedPlayers) {
      if (gameLobby.get(preReadyKey(player._id)) && !gameLobby.get(realReadyKey(player._id))) {
        gameLobby.set(failedKey(player._id), true);
        player.exit("failed attention check");
      }
    }

    setTimeout(() => {
      this.clearRemainingPlayers();
    }, delayTimeoutDuration);
  }

  clearRemainingPlayers() {
    const { gameLobby } = this.props;

    for (const player of this.props.gameLobby.queuedPlayers) {
      if (gameLobby.get(realReadyKey(player._id))) {
        // Reset players' real-ready status
        gameLobby.set(realReadyKey(player._id), false);
      }
    }

    this.setState({
      failedAttentionCheck: null,
    });
  }

  readyCount(key, keyFunc) {
    const { gameLobby, game } = this.props;
    const val = this.state[key];
    const readyPlayerIDs = gameLobby.queuedPlayerIds.filter((playerID) => {
      return gameLobby.get(keyFunc(playerID)) && !gameLobby.get(failedKey(playerID));
    });
  
    if (readyPlayerIDs.length !== val) {
      this.setState({
        [key]: readyPlayerIDs.length, 
      });
    }
  
    return readyPlayerIDs.length === game.treatment.playerCount;
  }

  checkReadyness() {
    const { attentionCheck, failedAttentionCheck } = this.state;

    if (failedAttentionCheck) {
      return;
    }

    const isRealReady = this.readyCount("realReadyCount", realReadyKey);  

    if (isRealReady) {
      if (!this.debug) {
        this.props.onNext();
      } else {
        console.log("Y'all really ready! Should go to next page");
        clearInterval(this.interval);
      }
      
      return;
    }

    const isPreReady = this.readyCount("preReadyCount", preReadyKey);
    
    if (isPreReady && !attentionCheck) {
      this.setState({
        attentionCheck: new Date().getTime(),
        timeLeft: attentionCheckDuration / 1000,
      });
    } else if (!isPreReady && attentionCheck) {
      this.setState({ attentionCheck: null });
    }
  }

  render() {
    const { gameLobby, game, renderAllDebug } = this.props;
    const { 
      preReadyCount,
      realReadyCount,
      attentionCheck,
      timeLeft,
      failedAttentionCheck,
    } = this.state;
    
    const playerPreReady = gameLobby.get(this.preReadyKey);
    const failedReady = gameLobby.get(this.failedReadyKey);

    if (failedReady) {
      return <div> Failed </div>
    }

    if (failedAttentionCheck) {
      return <FailedAttentionCheck />;
    }

    return <div className="h-full font-default">
      {
        attentionCheck ? (
          <AttentionCheck
            playersReadyCount={realReadyCount}
            ready={gameLobby.get(this.realReadyKey)}
            total={game.treatment.playerCount}
            timeLeft={timeLeft}
            onAccept={() => {
              gameLobby.set(this.realReadyKey, true);
            }}
            {...this.props}
          />
        ) : (
          <ReadyLobby
            playersReadyCount={preReadyCount}
            ready={playerPreReady}
            total={game.treatment.playerCount}
            {...this.props}
          />
        )
      }
      
      {this.debug ? (
        <ReadyDebug
          attentionCheck={attentionCheck}
          renderAllDebug={renderAllDebug}
          {...this.props}
        />
      ) : ""}
    </div>;
  }
}

class ReadyLobby extends React.PureComponent {
  render() {
    const { playersReadyCount, ready, total } = this.props;

    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-[400px] center flex flex-col space-y-4 items-center justify-center">
          <div className="text-yellow-300">
            <Icon icon={IconNames.TIME} size={64} intent="primary" />
          </div>
          <Label className="text-center" color="gray">
            The game will begin soon. Please do not navigate away from the page
            while other players join.
          </Label>
          <Label className="text-center" color="orange">
            {playersReadyCount} / {total} players ready
          </Label>
        </div>
      </div>
    );
  }
}

class AttentionCheck extends React.PureComponent {
  render() {
    const { playersReadyCount, ready, total, timeLeft } = this.props;


    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-[400px] center flex flex-col space-y-4 items-center justify-center">
          <div className="text-yellow-300">
            <Icon icon={IconNames.ENDORSED} size={64} intent="warning" />
          </div>
          <Label className="text-center" color="green" size="2xl">
            Your game is Ready!
          </Label>

          {
            ready ? (
              <Label className="text-center" color="orange">
                {playersReadyCount} / {total} players ready.
              </Label>
            ) : (
              <>
                <Label className="max-w-[250px] text-center" color="gold">Click Accept before the timer runs out.</Label>

                <button
                  className="text-3xl px-8 py-5 font-bold text-white border-green-700 border-4 rounded bg-green-500"
                  onClick={() => this.props.onAccept()}
                >
                  Accept
                </button>

                <Label className="text-center tabular-nums" color="red" size="2xl">
                  00:{timeLeft < 10 ? "0" : ""}{timeLeft}
                </Label>
              </>
            )
          }
        </div>
      </div>
    );
  }
}

class FailedAttentionCheck extends React.PureComponent {
  render() {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-[400px] center flex flex-col space-y-4 items-center justify-center">
          <div className="text-yellow-300">
            <Icon icon={IconNames.TIME} size={64} intent="danger" />
          </div>
          <Label className="text-center" color="orange">
            Not all players have accepted the game. Please wait for all players
            to accept the game.
          </Label>
        </div>
      </div>
    );
  }
}

class ReadyDebug extends React.PureComponent {
  markPreReady = () => {
    const { gameLobby, player } = this.props;
    gameLobby.set(preReadyKey(player._id), !gameLobby.get(preReadyKey(player._id)));
  }

  markAllPreReady = () => {
    const { gameLobby, player } = this.props;
    
    const prev = gameLobby.get(preReadyKey(player._id));

    gameLobby.queuedPlayerIds.
      filter((playerID) => {
        gameLobby.set(preReadyKey(playerID), !prev);
      });
  }

  markRealReady = () => {
    const { gameLobby, player } = this.props;
    gameLobby.set(realReadyKey(player._id), !gameLobby.get(realReadyKey(player._id)));
  }

  markAllRealReady = () => {
    const { gameLobby, player } = this.props;
    
    const prev = gameLobby.get(realReadyKey(player._id));

    gameLobby.queuedPlayerIds.
      filter((playerID) => {
        gameLobby.set(realReadyKey(playerID), !prev);
      });
  }

  render() {
    const { gameLobby, player, attentionCheck, renderAllDebug } = this.props;
    const playerPreReady = gameLobby.get(preReadyKey(player._id))
    const playerRealReady = gameLobby.get(realReadyKey(player._id))

    return (
      <div className="mt-6 flex gap-2">
        <button className="px-4 py-3 bg-slate-100 border rounded" onClick={this.markPreReady}>
          Mark {playerPreReady ? "Not Pre ready" : "Pre Ready"}
        </button>

        {
          renderAllDebug ? (
            <button className="px-4 py-3 bg-slate-100 border rounded" onClick={this.markAllPreReady}>
              Mark all {playerPreReady ? "Not Pre ready" : "Pre Ready"}
            </button>
          ) : ""
        }
        {
          attentionCheck ? (
            <>
              <button className="px-4 py-3 bg-slate-100 border rounded" onClick={this.markRealReady}>
                Mark {playerRealReady ? "Not Really ready" : "Really Ready"}
              </button>
              {
                renderAllDebug ? (
                  <button className="px-4 py-3 bg-slate-100 border rounded" onClick={this.markAllRealReady}>
                    Mark all {playerRealReady ? "Not Really Ready" : "Really Ready"}
                  </button>
                ) : ""
              }
            </>
          ) : ""
        }
      </div>
    );
  }
}