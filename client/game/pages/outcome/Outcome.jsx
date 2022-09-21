import React from "react";
import Table from "../../common/Table.jsx";

export default class Outcome extends React.Component {
  
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
    const { game, player, round} = this.props;

    return (
      <>
        <Table 
          players={game.players}
          game={game}
          round={round}
          me={player}
          punishment={game.treatment.punishmentExists}
        />
        <div className="center">
          {player.stage.submitted ? (
            this.renderSubmitted()
          ) : (
            <button type="button" onClick={this.onNext}>
              Next Round
            </button>
          )}
        </div>
      </>
    );
  }
}