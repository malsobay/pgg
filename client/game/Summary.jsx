import React from "react";
import { AvatarScores } from "../components/AvatarComplications";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { ChatView } from "./Chat";
import Header from "./Header";

export default function Stage1({ stage, round, game, player }) {
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
      <Header stage={stage} />
      <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
        <div className="h-full relative col-start-1 col-end-4">
          <div className="h-full relative flex flex-col items-center justify-center pb-48">
            <AvatarScores
              hints
              submitted={player.stage.submitted}
              animal={player.get("avatar")}
              given={Object.values(punished).reduce((a, b) => a + b, 0)}
              received={Object.values(punishedBy).reduce((a, b) => a + b, 0)}
              contributed={contribution}
              gains={roundPayoff}
            />
            <div className="w-full px-24 pt-20">
              {player.stage.submitted ? (
                <Label color="gray">
                  You have submitted. Waiting on the other players
                </Label>
              ) : (
                <Button onClick={() => player.stage.submit()}>I'm done</Button>
              )}
            </div>
          </div>
          <ChatView game={game} player={player} />
        </div>
        <div className="h-full col-start-4 col-end-13 pl-32">
          <PlayerGrid key={15}>
            {otherPlayers.map((player, i) => {
              const punished = player.round.get("punished");
              const punishedBy = player.round.get("punishedBy");
              const contribution = player.round.get("contribution");
              const roundPayoff = player.round.get("roundPayoff");

              return (
                <div dir="ltr" key={player._id} className="">
                  <AvatarScores
                    submitted={player.stage.submitted}
                    animal={player.get("avatar")}
                    given={Object.values(punished).reduce((a, b) => a + b, 0)}
                    received={Object.values(punishedBy).reduce(
                      (a, b) => a + b,
                      0
                    )}
                    contributed={contribution}
                    gains={roundPayoff}
                  />
                </div>
              );
            })}
          </PlayerGrid>
        </div>
      </div>
    </div>
  );
}
