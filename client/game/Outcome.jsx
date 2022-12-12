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
    rewardCost,
    rewardExists,
    rewardMagnitude,
  } = game.treatment;

  const otherPlayers = game.players.filter((p) => p._id !== player._id);

  const totalContributions = round.get("totalContributions");
  const contribution = player.round.get("contribution");
  const totalReturns = round.get("totalReturns");
  const payoff = round.get("payoff");
  const cumulativePayoff = player.get("cumulativePayoff");
  const punishments = player.round.get("punished");
  const rewards = player.round.get("rewarded");

  let totalCost = 0;
  for (const key in punishments) {
    totalCost += parseFloat(punishments[key]) * punishmentCost;
  }

  for (const key in rewards) {
    totalCost += parseFloat(rewards[key]) * rewardCost;
  }

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <Header player={player} game={game} round={round} stage={stage} />
      <div className="h-full grid grid-cols-[280px_600px_1fr] grid-flow-row justify-center">
        <div className="h-full relative">
          <div className="h-full relative flex items-center justify-center pb-48">
            <You
              submitted={player.stage.submitted}
              animal={player.get("avatar")}
            />
          </div>
          <ChatView game={game} player={player} />
        </div>
        <div className="flex flex-col h-full items-center justify-center">
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
        <div className="h-full grid grid-rows-1">
          <PlayerGrid>
            {otherPlayers.map((otherPlayer, i) => {
              const punished = punishments[otherPlayer._id] || 0;
              const added = rewards[otherPlayer._id] || 0;

              const punish = (increase) => {
                if (increase) {
                  if (totalCost + punishmentCost > cumulativePayoff) {
                    alert(
                      "You don't have enough coins to make this deduction!"
                    );

                    return;
                  }

                  punishments[otherPlayer._id] = punished + 1;
                } else {
                  punishments[otherPlayer._id] = punished - 1;
                }

                player.round.set("punished", punishments);
              };

              const reward = (increase) => {
                if (increase) {
                  if (totalCost + rewardCost > cumulativePayoff) {
                    alert("You don't have enough coins to make this reward!");

                    return;
                  }
                  rewards[otherPlayer._id] = added + 1;
                } else {
                  rewards[otherPlayer._id] = added - 1;
                }

                player.round.set("rewarded", rewards);
              };

              const add = () => {
                if (punished > 0) {
                  punish(false);
                } else {
                  reward(true);
                }
              };

              const deduct = () => {
                if (added > 0) {
                  reward(false);
                } else {
                  punish(true);
                }
              };

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
                      disabled={player.stage.submitted}
                      punishmentExists={punishmentExists}
                      deducted={punished * punishmentMagnitude}
                      rewardExists={rewardExists}
                      added={added * rewardMagnitude}
                      onDeduct={deduct}
                      onAdd={add}
                    />
                  </div>
                </div>
              );
            })}
          </PlayerGrid>
          <div className="px-4 pb-16">
            {rewardExists && (
              <Label color="yellow">
                Rewards: It will cost you {rewardCost} coins to
                <br /> give a reward of {rewardMagnitude} coins.
              </Label>
            )}
            {rewardExists && punishmentExists && <div className="mt-4" />}
            {punishmentExists && (
              <Label color="purple">
                Deductions: It will cost you {punishmentCost} coins
                <br /> to impose a deduction of {punishmentMagnitude} coins.
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
