import React from "react";
import { AvatarDeduction } from "../components/AvatarComplications";
import { CoinResults } from "../components/CoinResults";
import { Button } from "../components/FunButton";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";
import { ChatView } from "./Chat";
import Header from "./Header";

export default function Outcome({ stage, round, game, player }) {
  const {
    multiplier,
    playerCount,
    punishmentCost,
    punishmentExists,
    punishmentMagnitude,
  } = game.treatment;

  const otherPlayers = game.players.filter((p) => p._id !== player._id);

  const totalContributions = round.get("totalContributions");
  const contribution = player.round.get("contribution");
  const totalReturns = round.get("totalReturns");
  const payoff = round.get("payoff");
  const cumulativePayoff = player.get("cumulativePayoff");

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <Header player={player} game={game} round={round} stage={stage} />
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
        <div className="flex flex-col h-full items-center justify-center col-start-4 col-end-9">
          <CoinResults
            contributedYou={contribution}
            contributedOthers={totalContributions - contribution}
            contributedTotal={totalContributions}
            contributedMultiplied={totalReturns}
            multiplier={multiplier}
            received={payoff}
            playerCount={playerCount}
          />
          {player.stage.submitted ? (
            <Label color="gray">
              You have submitted your deductions. Waiting on the other players
            </Label>
          ) : (
            <div className="w-full px-32">
              <Button onClick={() => player.stage.submit()}>I'm done</Button>
            </div>
          )}
        </div>
        <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
          <PlayerGrid>
            {otherPlayers.map((otherPlayer, i) => {
              const punishments = player.round.get("punished");
              const punished = punishments[otherPlayer._id] || 0;

              return (
                <div
                  key={player._id}
                  className="flex justify-center items-center"
                >
                  <div dir="ltr" className="w-[6.5rem]">
                    <AvatarDeduction
                      animal={otherPlayer.get("avatar")}
                      submitted={otherPlayer.stage.submitted}
                      contributed={otherPlayer.round.get("contribution")}
                      active={punishmentExists}
                      disabled={player.stage.submitted}
                      deducted={punished * punishmentMagnitude}
                      onCancel={() => {
                        punishments[otherPlayer._id] = 0;
                        player.round.set("punished", punishments);
                      }}
                      onDeduct={() => {
                        let totalPunishmentCost = 0;
                        for (const key in punishments) {
                          totalPunishmentCost +=
                            parseFloat(punishments[key]) * punishmentMagnitude;
                        }

                        if (
                          totalPunishmentCost + punishmentMagnitude >
                          cumulativePayoff
                        ) {
                          alert(
                            "You don't have enough coins to make this deduction!"
                          );

                          return;
                        }

                        punishments[otherPlayer._id] = punished + 1;
                        player.round.set("punished", punishments);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </PlayerGrid>
          <div className="px-4 pb-16 text-center">
            {punishmentExists && (
              <Label color="purple">
                Deductions: It will cost you {punishmentCost} coins to impose a
                deduction of {punishmentMagnitude} coins.
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
