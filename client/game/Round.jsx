import React from "react";

import RightSidebar from "./RightSidebar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import Contribution from "./pages/contribution/Contribution.jsx";
import Punishment from "./pages/punishment/Punishment.jsx";
import Outcome from "./pages/outcome/Outcome.jsx";
import "./Sidebar.css";


export default class Round extends React.Component {

  render() {
    const { stage } = this.props;
    return (
      <div className="round">
        <RightSidebar {...this.props}/>
        <div className="body-wrapper">
          {stage.name === "contribution" && <Contribution {...this.props}/>}
          {stage.name === "outcome" && <Punishment {...this.props}/>}
          {stage.name === "summary" && <Outcome {...this.props}/>}
        </div>
        <LeftSidebar {...this.props} />
      </div>
    );
  }
}
