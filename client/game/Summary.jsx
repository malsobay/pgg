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

    const {
      showOtherSummaries,
      punishmentExists,
      punishmentCost,
      punishmentMagnitude,
      rewardExists,
      rewardCost,
      rewardMagnitude,
      showPunishmentId,
    } = game.treatment;

    const otherPlayers = game.players.filter((p) => p._id !== player._id);
    const punished = player.round.get("punished");
    const punishedBy = player.round.get("punishedBy");
    const rewarded = player.round.get("rewarded");
    const rewardedBy = player.round.get("rewardedBy");
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
                  punishmentExists={punishmentExists}
                  punishmentsGiven={(
                    Object.values(punished).reduce((a, b) => a + b, 0) *
                    punishmentCost
                  ).toString()}
                  punishmentsReceived={(
                    Object.values(punishedBy).reduce((a, b) => a + b, 0) *
                    punishmentMagnitude
                  ).toString()}
                  rewardExists={rewardExists}
                  rewardsGiven={(showOtherSummaries
                    ? Object.values(rewarded).reduce((a, b) => a + b, 0) *
                      rewardCost
                    : ""
                  ).toString()}
                  rewardsReceived={(showOtherSummaries
                    ? Object.values(rewardedBy).reduce((a, b) => a + b, 0) *
                      rewardMagnitude
                    : ""
                  ).toString()}
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

            {self === null && hovered !== null && showOtherSummaries ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  punishmentExists={punishmentExists}
                  rewardExists={rewardExists}
                  selectedPlayerID={hovered}
                  players={game.players}
                  punishmentCost={punishmentCost}
                  punishmentMagnitude={punishmentMagnitude}
                  rewardCost={rewardCost}
                  rewardMagnitude={rewardMagnitude}
                  isSelf={false}
                  showPunishmentId={showPunishmentId}
                />
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
                const rewarded = player.round.get("rewarded");
                const rewardedBy = player.round.get("rewardedBy");

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
                      punishmentExists={punishmentExists}
                      punishmentsGiven={(showOtherSummaries
                        ? Object.values(punished).reduce((a, b) => a + b, 0) *
                          punishmentCost
                        : ""
                      ).toString()}
                      punishmentsReceived={(showOtherSummaries
                        ? Object.values(punishedBy).reduce((a, b) => a + b, 0) *
                          punishmentMagnitude
                        : ""
                      ).toString()}
                      rewardExists={rewardExists}
                      rewardsGiven={(showOtherSummaries
                        ? Object.values(rewarded).reduce((a, b) => a + b, 0) *
                          rewardCost
                        : ""
                      ).toString()}
                      rewardsReceived={(showOtherSummaries
                        ? Object.values(rewardedBy).reduce((a, b) => a + b, 0) *
                          rewardMagnitude
                        : ""
                      ).toString()}
                      contributed={showOtherSummaries ? contribution : null}
                      gains={showOtherSummaries ? roundPayoff : null}
                    />
                  </div>
                );
              })}
            </PlayerGrid>

            {self !== null && hovered === null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  punishmentExists={punishmentExists}
                  rewardExists={rewardExists}
                  selectedPlayerID={self}
                  players={game.players}
                  punishmentCost={punishmentCost}
                  punishmentMagnitude={punishmentMagnitude}
                  rewardCost={rewardCost}
                  rewardMagnitude={rewardMagnitude}
                  isSelf={true}
                  showPunishmentId={showPunishmentId}
                />
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

function Details({
  punishmentExists,
  rewardExists,
  selectedPlayerID,
  players,
  punishmentCost,
  punishmentMagnitude,
  rewardCost,
  rewardMagnitude,
  isSelf,
  showPunishmentId,
}) {
  const player = players.find((p) => p._id === selectedPlayerID);
  const punished = player.round.get("punished");
  const punishedBy = player.round.get("punishedBy");
  const rewarded = player.round.get("rewarded");
  const rewardedBy = player.round.get("rewardedBy");
  const contribution = player.round.get("contribution");
  const roundPayoff = player.round.get("roundPayoff");

  const deductionsSpent = [];
  for (const playerID in punished) {
    const amount = punished[playerID] * punishmentCost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsSpent.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const deductionsReceived = [];
  for (const playerID in punishedBy) {
    const amount = punishedBy[playerID] * punishmentMagnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    deductionsReceived.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const rewardsSpent = [];
  for (const playerID in rewarded) {
    const amount = rewarded[playerID] * rewardCost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    rewardsSpent.push({ animal: otherPlayer.get("avatar"), amount });
  }

  const rewardsReceived = [];
  for (const playerID in rewardedBy) {
    const amount = rewardedBy[playerID] * rewardMagnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id === playerID);
    rewardsReceived.push({ animal: otherPlayer.get("avatar"), amount });
  }

  return (
    <DeductionDetails
      animal={player.get("avatar")}
      submitted={player.stage.submitted}
      contributed={contribution}
      gains={roundPayoff}
      punishmentExists={punishmentExists}
      deductionsSpent={deductionsSpent}
      deductionsReceived={deductionsReceived}
      rewardExists={rewardExists}
      rewardsSpent={rewardsSpent}
      rewardsReceived={rewardsReceived}
      isSelf={isSelf}
      showPunishmentId={showPunishmentId}
    />
  );
}
