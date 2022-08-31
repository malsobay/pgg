import React, { Component } from "react";
import "./Contribution.css";

export default class ContributionResponse extends React.Component {
  handleChange = (event) => {
    const { player, game } = this.props;
    let value = parseFloat(event.target.value);
    if(value > game.treatment.endowment){
      value = game.treatment.endowment;
    }
    if(!value){
      value = 0;
    }
    player.round.set("contribution", value);
  };

  handleSubmit = (event) => {
    const { player } = this.props;
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="waiting-response-container">
        Waiting on other players' contributions...
      </div>
    );
  }

  renderInput() {
    const { game, player } = this.props;
    const endowment = game.treatment.endowment;
    return (
      <div>
        <label>
          <input
            type="number"
            onChange={this.handleChange}
            min="0"
            value={player.round.get("contribution")}
            max={endowment}
            placeholder="0 if left blank"
            className="text-area"
          />
        </label>
        <br></br>
        {/*
        <label>
          <input
            type="radio"
            value="Contribute"
            checked={value == "Contribute"}
            onChange={this.handleChange}
          />
          Contribute
        </label>
    */}
      </div>
    );
  }

  render() {
    const { player, game } = this.props;
    const contribution = player.round.get("contribution");
    const endowment = game.treatment.endowment;
    const keep = endowment - parseFloat(contribution);
    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput()}
        {0 <= parseFloat(contribution) && contribution <= endowment ? (
          <div  className="contribute-you-keep"> You keep: {keep} </div>
        ) : null}
        <button type="submit" className="button">
          Contribute
        </button>
      </form>
    );
  }
}
