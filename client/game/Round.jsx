import React from "react";

import PlayerSidebar from "./PlayerSidebar.jsx";
import GroupSidebar from "./GroupSidebar.jsx";
import Contribution from "./Contribution.jsx";
import PunishmentStage from "./PunishmentStage.jsx";
import OutcomeStage from "./OutcomeStage.jsx";
import "./PlayerSidebar.css";
import "./GroupSidebar.css";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;
    const social = game.treatment.social;
    return (
      <div className="round">
        <div className="round-content">
          <div className="sidebar-container">
            <PlayerSidebar
              player={player}
              stage={stage}
              game={game}
              round={round}
            />
          </div>

          <div>
            {stage.name == "contribution" ? (
              <Contribution
                game={game}
                round={round}
                stage={stage}
                player={player}
              />
            ) : null}
          </div>
          {stage.name == "outcome" ? (
            <PunishmentStage
              game={game}
              round={round}
              stage={stage}
              player={player}
            />
          ) : null}
          {stage.name == "summary" ? (
            <OutcomeStage
              stage={stage}
              player={player}
              game={game}
              round={round}
            />
          ) : null}
          <GroupSidebar player={player} stage={stage} game={game} round={round} />
        </div>
      </div>
    );
  }
}
