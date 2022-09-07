import React from "react";
import Table from "../common/Table.jsx";

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
      <>
        {/* <h4>Round Outcome</h4> */}
        <Table 
          players={game.players}
          game={game}
          me={player}
          punishment={game.treatment.punishment !== 0}
        />
        <div className="center">
          {player.stage.submitted ? (
            this.renderSubmitted()
          ) : (
            <button type="button" onClick={this.onNext} className="button">
              Next Round
            </button>
          )}
        </div>
      </>
    );
  }
}
