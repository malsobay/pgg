import React from "react";
import { AvatarScores } from "./AvatarComplications";
import { DeductionDetails } from "./DeductionDetails";
import { Button } from "./FunButton";
import { Highlighter } from "./Highlighter";
import { MockChatView } from "./MockChat";
import { MockHeader } from "./MockHeader";
import { PlayerGrid } from "./PlayerGrid";

export class MockSummary extends React.Component {
  state = { hovered: null, self: null };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      treatment,
      player,
      paused,
      highlight,
      messages,
      onMessage,
      roundPayoff,
      otherPlayers,
    } = this.props;
    const { hovered, self } = this.state;

    const {
      endowment,
      punishmentMagnitude,
      punishmentCost,
      punishmentExists,
      showPunishmentId,
    } = treatment;

    const allPlayers = [player, ...otherPlayers];

    return (
      <div className="h-full grid grid-rows-[min-content_1fr]">
        <Highlighter name="header" highlight={highlight}>
          <MockHeader endowment={endowment} paused={paused} />
        </Highlighter>
        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full relative flex flex-col items-center justify-center pb-48">
              <div
                onMouseEnter={() => this.setState({ self: player._id })}
                onMouseLeave={() => this.setState({ self: null })}
              >
                <Highlighter name="you" pad highlight={highlight}>
                  <AvatarScores
                    hints
                    submitted={false}
                    animal={player.avatar}
                    enableDeductions={punishmentExists}
                    given={
                      Object.values(player.punished).reduce(
                        (a, b) => a + b,
                        0
                      ) * punishmentCost
                    }
                    received={
                      Object.values(player.punishedBy).reduce(
                        (a, b) => a + b,
                        0
                      ) * punishmentMagnitude
                    }
                    contributed={player.contribution}
                    gains={player.roundPayoff}
                  />
                </Highlighter>
              </div>
              <div className="w-full px-24 pt-20">
                <Highlighter name="never" highlight={highlight}>
                  <Button onClick={() => player.stage.submit()}>
                    I'm done
                  </Button>
                </Highlighter>
              </div>
            </div>

            {false && self === null && hovered !== null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  punishmentExists={punishmentExists}
                  selectedPlayerID={hovered}
                  players={allPlayers}
                  cost={punishmentCost}
                  magnitude={punishmentMagnitude}
                  isSelf={false}
                  showPunishmentId={showPunishmentId}
                />
              </div>
            ) : (
              ""
            )}

            <MockChatView
              name="chat"
              highlight={highlight}
              messages={messages}
              player={player}
              onMessage={onMessage}
            />
          </div>
          <div className="h-full relative col-start-4 col-end-13 pl-32">
            <Highlighter name="players" highlight={highlight}>
              <PlayerGrid key={15}>
                {otherPlayers.map((player, i) => {
                  const punished = player.punished;
                  const punishedBy = player.punishedBy;
                  const contribution = player.contribution;
                  const roundPayoff = player.roundPayoff;

                  return (
                    <div
                      dir="ltr"
                      key={player._id}
                      className="w-full h-full flex justify-center items-center"
                      onMouseEnter={() =>
                        this.setState({ hovered: player._id })
                      }
                      onMouseLeave={() => this.setState({ hovered: null })}
                    >
                      <AvatarScores
                        submitted={false}
                        animal={player.avatar}
                        enableDeductions={punishmentExists}
                        given={
                          Object.values(punished).reduce((a, b) => a + b, 0) *
                          punishmentCost
                        }
                        received={
                          Object.values(punishedBy).reduce((a, b) => a + b, 0) *
                          punishmentMagnitude
                        }
                        contributed={contribution}
                        gains={roundPayoff}
                      />
                    </div>
                  );
                })}
              </PlayerGrid>
            </Highlighter>

            {false && self !== null && hovered === null ? (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center pb-48 bg-white/70">
                <Details
                  punishmentExists={punishmentExists}
                  selectedPlayerID={self}
                  players={allPlayers}
                  cost={punishmentCost}
                  magnitude={punishmentMagnitude}
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
  selectedPlayerID,
  players,
  cost,
  magnitude,
  isSelf,
  showPunishmentId,
}) {
  console.log(selectedPlayerID, players);
  const player = players.find((p) => p._id === selectedPlayerID);
  const punished = player.punished;
  const punishedBy = player.punishedBy;
  const contribution = player.contribution;
  const roundPayoff = player.roundPayoff;

  const deductionsSpent = [];
  for (const playerID in punished) {
    const amount = punished[playerID] * cost || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id.toString() === playerID);
    deductionsSpent.push({ animal: otherPlayer.avatar, amount });
  }

  const deductionsReceived = [];
  for (const playerID in punishedBy) {
    const amount = punishedBy[playerID] * magnitude || 0;
    if (amount === 0) continue;
    const otherPlayer = players.find((p) => p._id.toString() === playerID);
    deductionsReceived.push({ animal: otherPlayer.avatar, amount });
  }

  return (
    <DeductionDetails
      animal={player.avatar}
      submitted={false}
      contributed={contribution}
      gains={roundPayoff}
      enableDeductions={punishmentExists}
      deductionsSpent={deductionsSpent}
      deductionsReceived={deductionsReceived}
      isSelf={isSelf}
      showPunishmentId={showPunishmentId}
    />
  );
}
