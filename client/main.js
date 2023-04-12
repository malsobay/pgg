import Empirica from "meteor/empirica:core";
import React from "react";
import { render } from "react-dom";
import { dev } from "../dev";
import Consent from "./components/Consent";
import DevHelp from "./components/DevHelp";
import { InstructionsStepOne } from "./components/InstructionsStepOne";
import { InstructionsStepThree } from "./components/InstructionsStepThree";
import { InstructionsStepTwo } from "./components/InstructionsStepTwo";
import NewPlayer from "./components/NewPlayer";
import ExitSurvey from "./exit/ExitSurvey";
import Sorry from "./exit/Sorry";
import Thanks from "./exit/Thanks";
import About from "./game/About";
import Round from "./game/Round";
import { pickRandomNum } from "./utils";
import TimedAccess from "./exit/TimedAccess.jsx"

Empirica.header(DevHelp);
Empirica.breadcrumb(() => null);
Empirica.noBatch(TimedAccess);

// Set the About Component you want to use for the About dialog (optional).
Empirica.about(About);

// Set the Consent Component you want to present players (optional).
Empirica.consent(Consent);

// Set the component for getting the player id (optional)
Empirica.newPlayer(NewPlayer);

// Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.

class StepOne extends React.Component {
  render() {
    const { onNext, game } = this.props;

    return (
      <InstructionsStepOne
        onNext={onNext}
        treatment={game.treatment}
        player={{
          _id: 10000,
          avatar: "elephant",
        }}
      />
    );
  }
}

class StepTwo extends React.Component {
  render() {
    const { onNext, game } = this.props;

    return (
      <InstructionsStepTwo
        onNext={onNext}
        treatment={game.treatment}
        player={{
          _id: 10000,
          avatar: "elephant",
          punished: {},
        }}
      />
    );
  }
}

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.contribution = pickRandomNum(0, props.game.treatment.endowment);
  }

  render() {
    const { onNext, game } = this.props;
    return (
      <InstructionsStepThree
        onNext={onNext}
        treatment={game.treatment}
        player={{
          _id: 10000,
          avatar: "elephant",
          punished: {},
          punishedBy: {},
          rewarded: {},
          rewardedBy: {},
          contribution: this.contribution,
        }}
      />
    );
  }
}

Empirica.introSteps((game, treatment) => {
  if (dev) {
    return [];
  }

  const steps = [StepOne, StepTwo, StepThree];

  return steps;
});

// The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.
Empirica.round(Round);

// End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.
Empirica.exitSteps((game, player) => {
  if (
    !game ||
    (player.exitStatus &&
      player.exitStatus !== "finished" &&
      player.exitReason !== "playerQuit")
  ) {
    return [Sorry];
  }
  return [ExitSurvey, Thanks];
});

// const Breadcrumb = ({ round, stage, game }) => (
//   <ul className="bp3-breadcrumbs round-nav">
//     <li>
//       <a className="bp3-breadcrumb" tabIndex="0">
//         Round {round.index + 1}
//         {game.treatment.showNRounds ? "/" + game.treatment.numRounds : ""}
//       </a>
//     </li>
//     {round.stages.map((s) => (
//       <li
//         key={s.name}
//         className={
//           s.name === stage.name ? "bp3-breadcrumb-current" : "bp3-breadcrumb"
//         }
//       >
//         {s.displayName}
//       </li>
//     ))}
//   </ul>
// );
// Empirica.breadcrumb(Breadcrumb);

// Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.
Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
