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
    event.preventDefault();
    this.props.player.stage.submit();
  };

  handleSubmitAll = (event) => {
    const {game, player} = this.props; 
    player.round.set("contribution", game.treatment.endowment);
    this.props.player.stage.submit();
  }

  handleSubmitNone = (event) => {
    const {player} = this.props; 
    player.round.set("contribution", 0);
    this.props.player.stage.submit();
  }

  render() {
    const { player, game } = this.props;
    const multiplier = game.treatment.multiplier;
    const contribution = player.round.get("contribution");
    const endowment = game.treatment.endowment;
    const keep = endowment - parseFloat(contribution);


    if (game.treatment.allOrNothing) {
      return (
        <>
          <div className="contribution-container">
            <h2>
              Contributions
            </h2>
            <h4> Multiplier: {multiplier}x</h4>
            <div className="contribution-image"/>
          </div>
          <div className="instructions-text">
            You can contribute any of your {endowment} coins for this round towards the public fund, which will be multiplied then divided equally among the group.
          </div>
          {player.stage.submitted ?
            <div className="waiting-response-container">
              Waiting on other players' contributions...
            </div>
            :
            <div className="center">
              <button type="submit" onClick={this.handleSubmitAll}>
                Contribute
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit" onClick={this.handleSubmitNone}>
              Do not contribute
              </button>
           </div>
          }
        </>       
      );
    }
    else{
      return (
        <>
          <div className="contribution-container">
            <h2>
              Contributions
            </h2>
            <h4> Multiplier: {multiplier}x</h4>
            <div className="contribution-image"/>
          </div>
          <div className="instructions-text">
            You can contribute any of your {endowment} coins for this round towards the public fund, which will be multiplied then divided equally among the group.
          </div>
          {player.stage.submitted ?
            <div className="waiting-response-container">
              Waiting on other players' contributions...
            </div>
            :
            <form className="center" onSubmit={this.handleSubmit}>
              <input
                type="number"
                onChange={this.handleChange}
                min="0"
                value={player.round.get("contribution")}
                max={endowment}
                placeholder="0 if left blank"
                className="text-area"
              />
              {0 <= parseFloat(contribution) && contribution <= endowment ? (
                <p> You keep: {keep} </p>
              ) : null}
              <button type="submit">
                Contribute
              </button>
            </form>
          }
        </>       
      );
      }
  }
}
