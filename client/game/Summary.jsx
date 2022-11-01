import React from "react";
import { AvatarScores } from "../components/AvatarComplications";
import { DeductionDetails } from "../components/DeductionDetails";
import { Button } from "../components/FunButton";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { ChatView } from "./Chat";
import Header from "./Header";

export default class Summary extends React.Component {
  state = { hovered: null, self: null };

  constructor(props) {
    super(props);
  }

  render() {
    const { stage, round, game, player } = this.props;
    const { hovered, self } = this.state;

    // const multiplier = game.treatment.multiplier;
    // const contribution = player.round.get("contribution") || 0;
    // const endowment = game.treatment.endowment;
    const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const contribution = player.round.get("contribution");
    const roundPayoff = player.round.get("roundPayoff");

    return (
      <div className="h-full grid grid-rows-[min-content_1fr]">
        <Header player={player} game={game} round={round} stage={stage} />
        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full relative flex flex-col items-center justify-center pb-48">
              <div
                onMouseEnter={() => this.setState({ self: player._id })}
                onMouseLeave={() => this.setState({ self: null })}
              >
                <AvatarScores
                  hints
                  submitted={player.stage.submitted}
                  animal={player.get("avatar")}
                  given={Object.values(punished).reduce((a, b) => a + b, 0) * game.treatment.punishmentCost}
                  received={Object.values(punishedBy).reduce((a, b) => a + b, 0) * game.treatment.punishmentMagnitude}
                  contributed={contribution}
                  gains={roundPayoff}
                />
              </div>
              <div className="w-full px-24 pt-20">
                {player.stage.submitted ? (
                  <Label color="gray">
                    You have submitted. Waiting on the other players
                  </Label>
                ) : (
                  <Button onClick={() => player.stage.submit()}>
                    I'm done
                  </Button>
                )}
              </div>
            </div>

            {self === null && hovered !== null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details selectedPlayerID={hovered} players={game.players} cost={game.treatment.punishmentCost} magnitude={game.treatment.punishmentMagnitude}/>
              </div>
            ) : (
              ""
            )}

            <ChatView game={game} player={player} />
          </div>
          <div className="h-full relative col-start-4 col-end-13 pl-32">
            <PlayerGrid key={15}>
              {otherPlayers.map((player, i) => {
                const punished = player.round.get("punished");
                const punishedBy = player.round.get("punishedBy");
                const contribution = player.round.get("contribution");
                const roundPayoff = player.round.get("roundPayoff");

                return (
                  <div
                    dir="ltr"
                    key={player._id}
                    className="w-full h-full flex justify-center items-center"
                    onMouseEnter={() => this.setState({ hovered: player._id })}
                    onMouseLeave={() => this.setState({ hovered: null })}
                  >
                    <AvatarScores
                      submitted={player.stage.submitted}
                      animal={player.get("avatar")}
                      given={Object.values(punished).reduce((a, b) => a + b, 0) * game.treatment.punishmentCost}
                      received={Object.values(punishedBy).reduce((a, b) => a + b, 0) * game.treatment.punishmentMagnitude}
                      contributed={contribution}
                      gains={roundPayoff}
                    />
                  </div>
                );
              })}
            </PlayerGrid>

            {self !== null && hovered === null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details selectedPlayerID={self} players={game.players} cost={game.treatment.punishmentCost} magnitude={game.treatment.punishmentMagnitude}/>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

function Details({ selectedPlayerID, players, cost, magnitude}) {
  const player = players.find((p) => p._id === selectedPlayerID);
  const punished = player.round.get("punished");
  const punishedBy = player.round.get("punishedBy");
  const contribution = player.round.get("contribution");
  const roundPayoff = player.round.get("roundPayoff");

  const deductionsSpent = [];
  for (const playerID in punished) {
    const amount = punished[playerID] * cost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsSpent.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const deductionsReceived = [];
  for (const playerID in punishedBy) {
    const amount = punishedBy[playerID] * magnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsReceived.push({ animal: otherPlayer.get("avatar"), amount });
  }

  return (
    <DeductionDetails
      animal={player.get("avatar")}
      submitted={player.stage.submitted}
      contributed={contribution}
      gains={roundPayoff}
      deductionsSpent={deductionsSpent}
      deductionsReceived={deductionsReceived}
    />
  );
}
