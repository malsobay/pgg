import React from "react";
import { AvatarScores } from "../components/AvatarComplications";
import { DeductionDetails } from "../components/DeductionDetails";
import { Button } from "../components/FunButton";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { ChatView } from "./Chat";
import Header from "./Header";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

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
      showRewardId,
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
        <div className="h-full grid grid-cols-[500px_1fr] grid-flow-row justify-center">
          <div className="h-full relative">
            <div className="h-full relative flex flex-col items-center justify-center pb-48">
              <div
                onMouseEnter={() => {
                  this.setState({ self: player._id });
                  game.append("log",{
                    verb:"viewOwnSummary", 
                    playerId:player._id, 
                    roundIndex:round.index, 
                    stage:stage.name, 
                    timestamp:moment(TimeSync.serverTime(null, 1000))});
                }}
                onMouseLeave={() => {
                  this.setState({ self: null });
                  game.append("log",{
                    verb:"exitOwnSummary", 
                    playerId:player._id, 
                    roundIndex:round.index, 
                    stage:stage.name, 
                    timestamp:moment(TimeSync.serverTime(null, 1000))});
                }}
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
                  rewardsGiven={(
                    Object.values(rewarded).reduce((a, b) => a + b, 0) *
                      rewardCost
                  ).toString()}
                  rewardsReceived={(
                    Object.values(rewardedBy).reduce((a, b) => a + b, 0) *
                      rewardMagnitude
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
                  <Button onClick={() => {
                    game.append("log",{
                      verb:"submit", 
                      playerId:player._id, 
                      roundIndex:round.index, 
                      stage:stage.name, 
                      timestamp:moment(TimeSync.serverTime(null, 1000))});
                    player.stage.submit();}}>
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
                  showRewardId={showRewardId}
                />
              </div>
            ) : (
              ""
            )}

            <ChatView game={game} player={player} stage={stage} round={round} />
          </div>
          <div className="h-full relative pl-16">
            <div className="p-2 text-center rounded bg-pink-100 text-pink-600">
              Payoff received by all players from the pool: {round.get("payoff")} coins
            </div>
            <PlayerGrid>
              {otherPlayers.map((otherPlayer, i) => {
                const punished = otherPlayer.round.get("punished");
                const punishedBy = otherPlayer.round.get("punishedBy");
                const contribution = otherPlayer.round.get("contribution");
                const roundPayoff = otherPlayer.round.get("roundPayoff");
                const rewarded = otherPlayer.round.get("rewarded");
                const rewardedBy = otherPlayer.round.get("rewardedBy");

                return (
                  <div
                    dir="ltr"
                    key={otherPlayer._id}
                    className="w-full h-full flex justify-center items-center"
                    onMouseEnter={() => {
                      this.setState({ hovered: otherPlayer._id });
                      game.append("log",{
                        verb:"viewOtherSummary", 
                        playerId:player._id, 
                        targetPlayerId:otherPlayer._id, 
                        roundIndex:round.index, 
                        stage:stage.name, 
                        timestamp:moment(TimeSync.serverTime(null, 1000))});
                    }}
                    onMouseLeave={() => {
                      this.setState({ hovered: null });
                      game.append("log",{
                        verb:"exitOtherSummary", 
                        playerId:player._id, 
                        targetPlayerId:otherPlayer._id, 
                        roundIndex:round.index, 
                        stage:stage.name, 
                        timestamp:moment(TimeSync.serverTime(null, 1000))});
                    }}
                  >
                    <AvatarScores
                      submitted={otherPlayer.stage.submitted}
                      animal={otherPlayer.get("avatar")}
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
                  showRewardId={showRewardId}
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
  showRewardId,
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
      showRewardId={showRewardId}
    />
  );
}
