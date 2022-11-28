import React from "react";
import { AnimalList } from "../components/assets/AnimalsAvatar";
import { Button } from "../components/NormalButton";
import { pickRandom } from "../utils";
import { Input } from "./Input";
import { MockOutcome } from "./MockOutcome";

export class InstructionsStepTwo extends React.Component {
  state = { current: 0, messages: [] };

  constructor(props) {
    super(props);

    const { playerCount, punishmentExists } = props.treatment;
    const playerAvatar = props.player.avatar;
    const exclude = [playerAvatar];

    this.steps = [
      {
        component: "contributions",
        content: (
          <div className="prose">
            <p>
              In the outcome stage, you can see how much you contributed (left)
              and how much your group contributed (right, shown as total and
              per-person average).
            </p>
          </div>
        ),
        nextText: "Ok",
      },
      {
        component: "outcome",
        content: (
          <div className="prose">
            <p>
              The coins contributed to the public fund are multiplied, then
              divided equally among players.
            </p>
          </div>
        ),
        nextText: "Great",
      },
      {
        component: "players",
        content: (
          <div className="prose">
            <p>
              Below each player's avatar is the number of coins they contributed
              to the public fund.
            </p>
            {punishmentExists && (
              <p>
                You can click + on any player's avatar to add a deduction, and -
                to remove deductions. The total coins deducted from a player are
                shown below. Try it out.
              </p>
            )}
          </div>
        ),
        nextText: "Sweet",
      },
      {
        modal: "quizz",
      },
    ];

    const otherPlayers = [];
    for (let i = 0; i < playerCount - 1; i++) {
      const avatar = pickRandom(AnimalList, exclude);
      exclude.push(avatar);

      otherPlayers.push({
        _id: i,
        avatar,
        submitted: false,
        contribution: 10,
        punishment: 0,
        punish: (id, amount) => {
          console.log("amount", amount);
          this.setState({
            otherPlayers: this.state.otherPlayers.map((p) => {
              if (p._id === id) {
                return {
                  ...p,
                  punishment: amount,
                };
              }

              return p;
            }),
          });
        },
      });
    }

    this.state = { ...this.state, otherPlayers };
  }

  render() {
    const { onNext, treatment, player, paused } = this.props;
    const { current, messages, otherPlayers } = this.state;

    let step = this.steps[current];

    return (
      <div className="relative h-full">
        <MockOutcome
          highlight={{
            step: step?.component ? step : null,
            next: () => this.setState({ current: this.state.current + 1 }),
          }}
          treatment={treatment}
          player={player}
          otherPlayers={otherPlayers}
          paused={paused}
          messages={messages}
          onMessage={(message) => {
            this.setState({
              messages: [...messages, message],
            });
          }}
          totalContributions={10}
          totalReturns={10}
          payoff={10}
          cumulativePayoff={10}
        />
        {step?.modal ? (
          <div className="z-50 h-screen w-screen fixed top-0 left-0 bg-white/80 p-20 flex justify-center">
            <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto max-w-prose overflow-auto">
              <div className="prose prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-ul:font-['Inter'] prose-headings:text-orange-600">
                {step.modal === "quizz" ? (
                  <Quizz treatment={treatment} next={() => onNext()} />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

class Quizz extends React.Component {
  state = { coins: "", incorrect: [] };

  handleSubmit = (event) => {
    event.preventDefault();
    const incorrect = [];
    if (this.state.coins !== "10") {
      incorrect.push("coins");
    }

    if (incorrect.length > 0) {
      this.setState({ incorrect });
      return;
    }

    this.props.next();
  };

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value, incorrect: [] });
  };

  render() {
    const { treatment } = this.props;
    const { coins, incorrect } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Questions</h1>

        <p>
          Imagine that in a given round, the money multiplier is 2, there are
          only 3 players, and players contributed the following amounts:
        </p>

        <ul>
          <li>Player 1: 10 Coins</li>
          <li>Player 2: 4 Coins</li>
          <li>Player 3: 1 Coins</li>
        </ul>

        <p>
          What is the round payoff? (round payoff = sum of contributions x
          multiplier / the number of players)
        </p>

        <Input
          name="coins"
          value={coins}
          handleUpdate={this.handleUpdate}
          required
          error={incorrect.includes("coins")}
        />

        {incorrect.length > 0 ? (
          <div className="text-red-500">
            Some answers were incorrect. Try again.
          </div>
        ) : null}
        <p className="space-x-4 pt-8 pb-16">
          <Button fullWidth type="submit">
            Got it
          </Button>
        </p>
      </form>
    );
  }
}
