import React from "react";
import "./Sidebar.css";


export default class PlayerSidebar extends React.Component {

  render() {
    const { game, player } = this.props;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

    return (
      <div className="sidebar-wrapper">
        <img
          src={player.get("avatar")}
          className="profile-avatar"
        />
        <h4>Your Total Coins</h4>
        <span>{player.get("cumulativePayoff")}</span>
        <h4>Other players: <span>{game.treatment.playerCount - 1}</span></h4>
        <div className="players-wrapper">
          {otherPlayers.map((p) => <img key={p._id} src={p.get("avatar")} className="player-avatar" />)}
        </div>
      </div>
    );
  }
}
