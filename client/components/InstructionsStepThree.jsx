import React from "react";
import { AnimalList } from "../components/assets/AnimalsAvatar";
import { Button } from "../components/NormalButton";
import { pickRandom } from "../utils";
import { Input } from "./Input";
import { MockSummary } from "./MockSummary";

function genPunishments(player, players) {
  const punished = {};
  const punishedBy = {};
  for (const player2 of players) {
    if (player2 === player) {
      continue;
    }

    if (Math.random() < 0.3) {
      punished[player2._id] = pickRandom([2, 4, 6, 8, 10, 12]);
    } else {
      punished[player2._id] = 0;
    }

    if (Math.random() < 0.3) {
      punishedBy[player2._id] = pickRandom([2, 4, 6, 8, 10, 12]);
    } else {
      punishedBy[player2._id] = 0;
    }
  }

  player.punished = punished;
  player.punishedBy = punishedBy;
}

export class InstructionsStepThree extends React.Component {
  state = { current: 0, messages: [] };

  constructor(props) {
    super(props);

    const { playerCount, punishmentExists } = props.treatment;
    const playerAvatar = props.player.avatar;
    const exclude = [playerAvatar];

    const otherPlayers = [];
    for (let i = 0; i < playerCount - 1; i++) {
      const avatar = pickRandom(AnimalList, exclude);
      exclude.push(avatar);

      const contribution = pickRandom([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      otherPlayers.push({
        _id: i,
        avatar,
        submitted: false,
        punished: {},
        punishedBy: {},
        contribution,
        roundPayoff: props.roundPayoff - contribution,
      });
    }

    const allPlayers = [props.player, ...otherPlayers];

    if (punishmentExists) {
      for (const player of otherPlayers) {
        genPunishments(player, allPlayers);
      }

      genPunishments(props.player, allPlayers);
    }

    this.state = { ...this.state, otherPlayers };

    this.steps = [
      {
        component: "you",
        content: (
          <div className="prose">
            <p>
              Here, you can view a summary of your outcome for the round,
              including contributions
              {punishmentExists && " and deductions (given/received)"}.
            </p>
          </div>
        ),
        nextText: "Ok",
      },
      {
        component: "players",
        content: (
          <div className="prose">
            <p>The same summary is also shown for other players.</p>
          </div>
        ),
        nextText: "Great",
      },
      {
        modal: "quizz",
      },
    ];
  }

  render() {
    const { onNext, treatment, player, paused } = this.props;
    const { current, messages, otherPlayers } = this.state;

    let step = this.steps[current];

    return (
      <div className="relative h-full">
        <MockSummary
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
          <div className="z-40 h-screen w-screen fixed top-0 left-0 bg-white/80 p-20 flex justify-center">
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
    const { treatment } = this.props;
    const incorrect = [];

    if(treatment.punishmentExists){
      var val = 2 * treatment.punishmentMagnitude;
    }
    else{
      var val = 2 * treatment.rewardMagnitude;
    }
    
    if (this.state.coins !== val.toString()) {
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
    const punishmentExists = treatment.punishmentExists; 
    const rewardExists = treatment.rewardExists; 
    if (!punishmentExists & !rewardExists) {
      this.props.next();
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Questions</h1>

        <p>
          Each {punishmentExists?"deduction":"reward"} you put on another player {punishmentExists?"deducts ":"gives "}
          {punishmentExists?treatment.punishmentMagnitude:treatment.rewardMagnitude} coins {punishmentExists?"from":"to"} them, and costs you{" "}
          {punishmentExists?treatment.punishmentCost:treatment.rewardCost} coins. If you spend{" "}
          {punishmentExists?2 * treatment.punishmentCost:2 * treatment.rewardCost} coins to {punishmentExists?"deduct from":"reward"} another player,
          how many coins will be {punishmentExists?"deducted from":"given to"} them?
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
            Submit
          </Button>
        </p>
      </form>
    );
  }
}
