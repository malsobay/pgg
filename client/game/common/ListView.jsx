import React from "react";
import "./ListView.css";

export default class ListView extends React.Component {
  renderPlayer(game, playerId, punishments) {
    console.log(game.players);
    const player = game.players.find((player) => player._id === playerId);
    console.log(player);
    return (
      <div style={{textAlign:"center"}}>
        <img src={player.get("avatar")} className="player-avatar-listview" />
        <p>x{punishments[playerId]}</p>
      </div>
    );
  }

  render() {
    const { game, punishments } = this.props;
    console.log(punishments);
    let nonzeroPunishments = {};
    for (const key of Object.keys(punishments)) {
      if (punishments[key] != "0") {
        nonzeroPunishments[key] = punishments[key];
      } else {
      }
    }

    if (Object.keys(nonzeroPunishments).length == 0) {
      return <div className="none"> / </div>
    }

    return (
      <div className="punishment-social-view">
        {Object.keys(nonzeroPunishments).map((p) =>
          this.renderPlayer(game, p, nonzeroPunishments)
        )}
      </div>
    );
  }
}
