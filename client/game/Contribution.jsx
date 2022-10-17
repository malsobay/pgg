import React from "react";
import { AddCoins } from "../components/AddCoins";
import { Avatar } from "../components/Avatar";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";
import { ChatView } from "./Chat";
import Header from "./Header";

export default function Stage1({ stage, game, player }) {
  const multiplier = game.treatment.multiplier;
  const contribution = player.round.get("contribution") || 0;
  const endowment = game.treatment.endowment;
  const otherPlayers = _.reject(game.players, (p) => p._id === player._id);

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <Header stage={stage} />
      <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
        <div className="h-full relative col-start-1 col-end-4">
          <div className="h-full relative flex items-center justify-center pb-48">
            <You
              submitted={player.stage.submitted}
              animal={player.get("avatar")}
            />
          </div>
          <ChatView game={game} player={player} />
        </div>
        <div className="h-full flex items-center justify-center col-start-4 col-end-9">
          <AddCoins
            header={`You can contribute up to ${endowment} coins this round`}
            footer={`The pot will be multiplied by x${multiplier} and divided equally among the group at the end of the round`}
            submittedText="You have submitted your contribution. Waiting on the other players"
            purse={endowment}
            multiplier={multiplier}
            contributed={contribution}
            submitted={player.stage.submitted}
            onClick={(amount) => {
              player.round.set("contribution", contribution + amount);
            }}
            onSubmit={(amount) => {
              player.stage.submit();
            }}
          />
        </div>
        <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
          <PlayerGrid>
            {otherPlayers.map((player, i) => (
              <div dir="ltr" key={player._id} className="w-16">
                <Avatar
                  animal={player.get("avatar")}
                  submitted={player.stage.submitted}
                />
              </div>
            ))}
          </PlayerGrid>
          <div className="px-4  pb-16 text-center">
            <Label color="gray">
              The other players can also contribute their coins to the pot right
              now
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
