import React from "react";
import PunishmentResponse from "./PunishmentResponse.jsx";
import ContributionsTableResults from "./ContributionsTableResults.jsx";


export default class Punishment extends React.Component {
  render() {

    return (
      <>
        <ContributionsTableResults {...this.props}/>
        <PunishmentResponse {...this.props}/>
      </>
    );
  }
}
