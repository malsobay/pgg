import React from "react";

import "./Contribution.css";

export default class Contribution extends React.Component {
  
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
      </div>
    );
  }

  render() {
    const { player, game } = this.props;
    const multiplier = game.treatment.multiplier;
    const contribution = player.round.get("contribution");
    const endowment = game.treatment.endowment;
    const keep = endowment - parseFloat(contribution);
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <>
        <div className="contribution-container">
          <h2 className="contribution-heading">
            Contributions
          </h2>
          <h4> Multiplier: {multiplier}x</h4>
          <div className="contribution-image"/>
        </div>
        <div className="instructions-text">
          You can contribute any of your {endowment} money units towards the public fund, which will be multiplied then divided equally among the group.
        </div>
        <form className="form-container" onSubmit={this.handleSubmit}>
          {this.renderInput()}
          {0 <= parseFloat(contribution) && contribution <= endowment ? (
            <div className="contribute-you-keep"> You keep: {keep} </div>
          ) : null}
          <button type="submit" className="button">
            Contribute
          </button>
        </form>
      </>       
    );
  }
}
