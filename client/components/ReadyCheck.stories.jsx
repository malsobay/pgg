import React from "react";
import { ReadyCheck } from "./ReadyCheck";

export class ReadyCheckLayout extends React.PureComponent {
  render() {
    return (
      <div className="h-[600px]">
        <ReadyCheckComposer
          playerCount={2}
          renderNum={1}
          renderAllDebug
        />
      </div>
    );
  }
}

export class ReadyCheckBehavior extends React.PureComponent {
  render() {
    return (
      <div className="h-[400px] grid grid-cols-4 grid-rows-1">
        <ReadyCheckComposer
          playerCount={3}
          renderNum={4}
        />
      </div>
    );
  }
}

class ReadyCheckComposer extends React.Component {
  state = { gameLobbyState: {} }

  constructor(props) {
    super(props);

    this.game = {
      treatment: {
        playerCount: props.playerCount,
      }
    }

    const playerIds = [];

    for (let i = 0; i < props.renderNum; i++) {
      playerIds.push(i);
    }

    this.gameLobby = {
        get: (key) => this.state.gameLobbyState[key],
        set: (key, val) => {
          const { gameLobbyState } = this.state;
          gameLobbyState[key] = val;
          console.log(key, val);
          this.setState({ gameLobbyState });
        },
        queuedPlayerIds: playerIds,
        queuedPlayers: playerIds.map((id) => ({
          _id: id,
          exit(reason) {
            console.log("exit", id, reason);
          }
        })),
    }
  }

  render() {
    const { renderAllDebug } = this.props;
    const { gameLobbyState } = this.state;

    console.log(gameLobbyState);

    const els = [];
    for (let i = 0; i < this.props.renderNum; i++) {
      els.push(
        <ReadyCheck
          key={i}
          debug
          player={{ _id: i }}
          gameLobby={this.gameLobby}
          game={this.game}
          renderAllDebug={renderAllDebug}
          onNext={() => {
            console.log("should go to next");
          }}
        />
      );
    }

    return els;
  }
};