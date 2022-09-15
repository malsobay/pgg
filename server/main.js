import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

/*Empirica.gameInit(game => {
  const {
    treatment: {
      playerCount,
      networkStructure,
      numTaskRounds,
      numSurveyRounds,
      setSizeBasedOnPlayerCount,
      userInactivityDuration,
      taskDuration,
      defaultSetSize,
      surveyDuration,
      resultsDuration,
      maxNumOverlap,
    },
  } = game;

*/
Empirica.gameInit((game) => {
  _.times(game.treatment.numRounds, (i) => {
    const round = game.addRound();

    round.addStage({
      name: "contribution",
      displayName: "Contribution",
      durationInSeconds: game.treatment.contributionDuration,
    });

    round.addStage({
      name: "outcome",
      displayName: game.treatment.punishment > 0 ? "Outcome & Deductions" : "Outcome",
      durationInSeconds: game.treatment.punishmentDuration,
    })

    round.addStage({
      name: "summary",
      displayName: "Summary",
      durationInSeconds: game.treatment.outcomeDuration,
    });
  });
});
