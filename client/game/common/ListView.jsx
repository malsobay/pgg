import React from "react";
import "./ListView.css";

export default class ListView extends React.Component {
  renderPlayer(game, playerId, punishments) {
    const player = game.players.find((player) => player._id === playerId);
    return (
      <div className="center">
        <img src={player.get("avatar")} className="player-avatar-listview" />
        <div className="player-avatar-listview-text">x{punishments[playerId]}</div>
      </div>
    );
  }

  render() {
    const { game, punishments } = this.props;
    let nonzeroPunishments = {};
    for (const key of Object.keys(punishments)) {
      if (punishments[key] != "0") {
        nonzeroPunishments[key] = punishments[key];
      }
    }

    if (Object.keys(nonzeroPunishments).length == 0) {
      return <p> / </p>
    }

    return (
      <div className="listview-avatar-wrapper">
        {Object.keys(nonzeroPunishments).map((p) =>
          this.renderPlayer(game, p, nonzeroPunishments)
        )}
      </div>
    );
  }
}
