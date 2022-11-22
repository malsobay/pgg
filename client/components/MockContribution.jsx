import React from "react";
import { AddCoins } from "../components/AddCoins";
import { Avatar } from "../components/Avatar";
import { Label } from "../components/Label";
import { PlayerGrid } from "../components/PlayerGrid";
import { You } from "../components/You";
import { Highlighter } from "./Highlighter";
import { MockChatView } from "./MockChat";
import { MockHeader } from "./MockHeader";

export class MockContribution extends React.Component {
  state = { contribution: 0 };

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
      otherPlayers,
    } = this.props;
    const { contribution } = this.state;

    const { multiplier, endowment, allOrNothing } = treatment;

    return (
      <div className="h-full grid grid-rows-[min-content_1fr]">
        <Highlighter name="header" highlight={highlight}>
          <MockHeader endowment={endowment} paused={paused} />
        </Highlighter>

        <div className="h-full grid grid-cols-12 grid-flow-row justify-center">
          <div className="h-full relative col-start-1 col-end-4">
            <div className="h-full  relative flex items-center justify-center pb-48">
              <Highlighter name="you" pad highlight={highlight}>
                <You submitted={false} animal={player.avatar} />
              </Highlighter>
            </div>

            <MockChatView
              name="chat"
              highlight={highlight}
              messages={messages}
              player={player}
              onMessage={onMessage}
            />
          </div>

          <div className="h-full flex items-center justify-center col-start-4 col-end-9">
            <Highlighter pad name="center" highlight={highlight}>
              <AddCoins
                header={`You can contribute ${
                  allOrNothing ? "" : "up to"
                } ${endowment} coins this round`}
                footer={`The pot will be multiplied by x${multiplier} and divided equally among the group at the end of the round`}
                submittedText="You have submitted your contribution. Waiting on the other players"
                purse={endowment}
                multiplier={multiplier}
                contributed={contribution}
                submitted={false}
                allOrNothing={allOrNothing}
                allOrNothingAmount={endowment}
                onClick={(amount) => {
                  this.setState({ contribution: contribution + amount });
                }}
                onSubmit={(amount) => {
                  highlight.next();
                }}
              />
            </Highlighter>
          </div>
          <div className="h-full grid grid-rows-1 col-start-9 col-end-13">
            <Highlighter name="players" highlight={highlight}>
              <PlayerGrid>
                {otherPlayers.map((player, i) => (
                  <div
                    key={player._id}
                    className="flex justify-center items-center"
                  >
                    <div dir="ltr" className="w-16">
                      <Avatar
                        animal={player.avatar}
                        submitted={player.submitted}
                      />
                    </div>
                  </div>
                ))}
              </PlayerGrid>
            </Highlighter>
            <Highlighter name="never" highlight={highlight}>
              <div className="px-4  pb-16 text-center">
                <Label color="gray">
                  The other players can also contribute their coins to the pot
                  right now
                </Label>
              </div>
            </Highlighter>
          </div>
        </div>
      </div>
    );
  }
}
