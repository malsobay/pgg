import React from "react";
import Table from "./Table.jsx";
import "./OutcomeStage.css";

export default class OutcomeStage extends React.Component {
  
  onNext = (event) => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="waiting-response-container">
          Waiting on other players...
          Please wait until all players are ready
      </div>
    );
  }

  render() {
    const { game, player } = this.props;

    return (
      <body className="outcome-body">
          <h4 className="outcome-heading">Round Outcome</h4>
          <Table 
            players={game.players}
            game={game}
            me={player}
            punishment={true}
          />
        <div className="next-round center">
          {player.stage.submitted ? (
            this.renderSubmitted()
          ) : (
            <button type="button" onClick={this.onNext} className="button">
              Next Round
            </button>
          )}
        </div>
      </body>
    );
  }
}
