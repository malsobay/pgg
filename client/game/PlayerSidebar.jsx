import React from "react";
import "./Sidebar.css";


export default class PlayerSidebar extends React.Component {
  
  renderProfile() {
    const { player } = this.props;
    return (
      <img
        src={player.get("avatar")}
        className="profile-avatar"
      />
    );
  }

  renderScore() {
    const { player } = this.props;
    return (
      <div>
        <h4>Your Total Coins</h4>
        <span>{player.get("cumulativePayoff")}</span>
      </div>
    );
  }
  
  renderSocialInteraction(otherPlayer) {
    const cumulativePayoff = otherPlayer.get("cumulativePayoff");
    return (
      <div className="player" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
      </div>
    );
  }


  render() {
    const { game, player } = this.props;

    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const showNRounds = game.treatment.showNRounds;

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-stats">
          {this.renderProfile()}
          {this.renderScore()}
          <h4>Other players: <span>{game.treatment.playerCount - 1}</span></h4>
          <div className="players-wrapper">
            {otherPlayers.map((p) => this.renderSocialInteraction(p))}
          </div>
        </div>
      </div>
    );
  }
}
