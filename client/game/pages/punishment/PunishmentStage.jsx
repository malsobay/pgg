import React from "react";
import PunishmentResponse from "./PunishmentResponse.jsx";
import ContributionsDisplay from "./ContributionsDisplay.jsx";


export default class PunishmentStage extends React.Component {
  render() {

    return (
      <>
        <ContributionsDisplay {...this.props}/>
        <PunishmentResponse {...this.props}/>
      </>
    );
  }
}
