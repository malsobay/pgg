import React from "react";

import PlayerSidebar from "./PlayerSidebar.jsx";
import GroupSidebar from "./GroupSidebar.jsx";
import Contribution from "./pages/contributions/Contribution.jsx";
import PunishmentStage from "./pages/punishment/PunishmentStage.jsx";
import OutcomeStage from "./pages/outcome/OutcomeStage.jsx";


export default class Round extends React.Component {

  render() {
    const { stage } = this.props;
    return (
      <div className="round">
        <PlayerSidebar {...this.props}/>
        <div className="body-wrapper">
          {stage.name === "contribution" && <Contribution {...this.props}/>}
          {stage.name === "punishment" && <PunishmentStage {...this.props}/>}
          {stage.name === "outcome" && <OutcomeStage {...this.props}/>}
        </div>
        <GroupSidebar {...this.props} />
      </div>
    );
  }
}
