var require = meteorInstall({"server":{"bots.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// server/bots.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
let Empirica;
module.link("meteor/empirica:core", {
  default(v) {
    Empirica = v;
  }

}, 0);
// This is where you add bots, like Bob:
Empirica.bot("bob", {
  // // NOT SUPPORTED Called at the beginning of each stage (after onRoundStart/onStageStart)
  // onStageStart(bot, game, round, stage, players) {},
  // Called during each stage at tick interval (~1s at the moment)
  onStageTick(bot, game, round, stage, secondsRemaining) {} // // NOT SUPPORTED A player has changed a value
  // // This might happen a lot!
  // onStagePlayerChange(bot, game, round, stage, players, player) {}
  // // NOT SUPPORTED Called at the end of the stage (after it finished, before onStageEnd/onRoundEnd is called)
  // onStageEnd(bot, game, round, stage, players) {}


});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"callbacks.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// server/callbacks.js                                                                                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
let ALIGN_LEFT;
module.link("@blueprintjs/core/lib/esm/common/classes", {
  ALIGN_LEFT(v) {
    ALIGN_LEFT = v;
  }

}, 0);
let Empirica;
module.link("meteor/empirica:core", {
  default(v) {
    Empirica = v;
  }

}, 1);
// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart(game => {
  game.set("justStarted", true);
  game.players.forEach((player, i) => {
    /*player.set("avatar", `/avatars/jdenticon/${player._id}`);*/
    player.set("avatar", "/avatars/".concat(i, ".png"));
    player.set("avatarId", i);
    player.set("cumulativePayoff", game.treatment.endowment);
  });
}); // onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.

Empirica.onRoundStart((game, round) => {
  round.set("totalContributions", 0);
  round.set("totalReturns", 0);
  round.set("payoff", 0);
  game.players.forEach((player, i) => {
    player.round.set("endowment", game.treatment.endowment);
    player.round.set("punishedBy", {});
    player.round.set("contribution", 0);
    player.round.set("punished", {});
  });
}); // onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.

Empirica.onStageStart((game, round, stage) => {}); // onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.

Empirica.onStageEnd((game, round, stage) => {
  if (stage.name == "contribution") {
    computePayoff(game, round);
  } //player.stage.set values but wait to update until round end


  if (stage.name == "outcome") {
    computePunishmentCosts(game, round);
    computeIndividualPayoff(game, round);
  }
}); // onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.

Empirica.onRoundEnd((game, round) => {
  game.players.forEach(player => {
    const prevCumulativePayoff = player.get("cumulativePayoff");
    const roundPayoff = player.round.get("roundPayoff");
    const newCumulativePayoff = Math.round(prevCumulativePayoff + roundPayoff);
    player.set("cumulativePayoff", newCumulativePayoff);
  });
}); // onGameEnd is triggered when the game ends.
// It receives the same options as onGameStart.

Empirica.onGameEnd(game => {
  computeTotalPayoff(game);
  convertPayoff(game);
}); // compute each players' payoffs

function computePayoff(game, round) {
  const multiplier = game.treatment.multiplier;
  let newTotalContributions = 0;
  game.players.forEach(player => {
    const contribution = player.round.get("contribution");
    newTotalContributions += parseFloat(contribution);
  });
  round.set("totalContributions", newTotalContributions);
  const multipliedReturns = Math.round(round.get("totalContributions") * multiplier);
  round.set("totalReturns", multipliedReturns);
  const totalReturns = round.get("totalReturns");
  const payoff = Math.round(totalReturns / game.players.length);
  round.set("payoff", payoff);
}

function computePunishmentCosts(game, round) {
  game.players.forEach(player => {
    const punished = player.round.get("punished");
    const punishedKeys = Object.keys(punished);
    let cost = 0;

    for (const key of punishedKeys) {
      if (punished[key] != "0") {
        amount = punished[key];
        cost += parseFloat(amount) * game.treatment.punishmentCost;
      } else {}
    }

    let punishedBy = {};
    player.round.set("costs", cost);

    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    otherPlayers.forEach(otherPlayer => {
      const otherPlayerPunished = otherPlayer.round.get("punished");

      if (Object.keys(otherPlayerPunished).includes(player._id)) {
        punishedBy[otherPlayer._id] = otherPlayerPunished[player._id];
        console.log(punishedBy);
      }
    });
    player.round.set("punishedBy", punishedBy);
    punishedBy = player.round.get("punishedBy");
    let receivedPunishments = 0;
    const punishedByKeys = Object.keys(punishedBy);

    for (const key of punishedByKeys) {
      if (punishedBy[key] != "0") {
        amount = punishedBy[key];
        receivedPunishments += parseFloat(amount);
      }
    }

    const penalties = parseFloat(receivedPunishments) * game.treatment.punishmentMagnitude;
    player.round.set("penalties", penalties);
  });
} // computes players' individual payoff (round payoff minus punishment costs and penalties)


function computeIndividualPayoff(game, round) {
  game.players.forEach(player => {
    const payoff = round.get("payoff");
    const contribution = player.round.get("contribution");
    const remainingEndowment = parseFloat(game.treatment.endowment) - parseFloat(contribution);
    player.round.set("remainingEndowment", remainingEndowment);
    const penalties = player.round.get("penalties");
    const costs = player.round.get("costs");
    const roundPayoff = parseFloat(payoff) + parseFloat(remainingEndowment) - parseFloat(penalties) - parseFloat(costs);
    player.round.set("roundPayoff", roundPayoff);
  });
} // computes the total payoff across all players (measure of cooperation) //


function computeTotalPayoff(game) {
  let totalPayoff = 0;
  game.players.forEach(player => {
    const cumulativePayoff = player.get("cumulativePayoff");
    totalPayoff += parseFloat(cumulativePayoff);
    game.set("totalPayoff", totalPayoff);
  });
} // converts player's payoff to real money


function convertPayoff(game) {
  game.players.forEach(player => {
    const cumulativePayoff = player.get("cumulativePayoff");
    let earnings = 0;

    if (cumulativePayoff > 0) {
      let earnings = parseFloat(cumulativePayoff) * game.treatment.conversionRate;
    } else {}

    player.set("earnings", earnings);
  });
} // ===========================================================================
// => onSet, onAppend and onChange ==========================================
// ===========================================================================
// onSet, onAppend and onChange are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.
// onSet is called when the experiment code call the .set() method
// on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onSet(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue // Previous value
//   ) => {
//     // // Example filtering
//     // if (key !== "value") {
//     //   return;
//     // }
//   }
// );
// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue // Previous value
//   ) => {
//     // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//     //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
//   }
// );
// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange(
//   (
//     game,
//     round,
//     stage,
//     player, // Player who made the change
//     target, // Object on which the change was made (eg. player.set() => player)
//     targetType, // Type of object on which the change was made (eg. player.set() => "player")
//     key, // Key of changed value (e.g. player.set("score", 1) => "score")
//     value, // New value
//     prevValue, // Previous value
//     isAppend // True if the change was an append, false if it was a set
//   ) => {
//     // `onChange` is useful to run server-side logic for any user interaction.
//     // Note the extra isAppend boolean that will allow to differenciate sets and
//     // appends.
//     Game.set("lastChangeAt", new Date().toString());
//   }
// );
// // onSubmit is called when the player submits a stage.
// Empirica.onSubmit(
//   (
//     game,
//     round,
//     stage,
//     player // Player who submitted
//   ) => {}
// );
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// server/main.js                                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
let Empirica;
module.link("meteor/empirica:core", {
  default(v) {
    Empirica = v;
  }

}, 0);
module.link("./bots.js");
module.link("./callbacks.js");
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
Empirica.gameInit(game => {
  _.times(game.treatment.numRounds, i => {
    const round = game.addRound();
    round.addStage({
      name: "contribution",
      displayName: "Contribution",
      durationInSeconds: game.treatment.contributionDuration
    });
    round.addStage({
      name: "outcome",
      displayName: game.treatment.punishmentExists ? "Outcome & Deductions" : "Outcome",
      durationInSeconds: game.treatment.outcomeDuration
    });
    round.addStage({
      name: "summary",
      displayName: "Summary",
      durationInSeconds: game.treatment.summaryDuration
    });
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".mjs"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2JvdHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9jYWxsYmFja3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIkVtcGlyaWNhIiwibW9kdWxlIiwibGluayIsImRlZmF1bHQiLCJ2IiwiYm90Iiwib25TdGFnZVRpY2siLCJnYW1lIiwicm91bmQiLCJzdGFnZSIsInNlY29uZHNSZW1haW5pbmciLCJBTElHTl9MRUZUIiwib25HYW1lU3RhcnQiLCJzZXQiLCJwbGF5ZXJzIiwiZm9yRWFjaCIsInBsYXllciIsImkiLCJ0cmVhdG1lbnQiLCJlbmRvd21lbnQiLCJvblJvdW5kU3RhcnQiLCJvblN0YWdlU3RhcnQiLCJvblN0YWdlRW5kIiwibmFtZSIsImNvbXB1dGVQYXlvZmYiLCJjb21wdXRlUHVuaXNobWVudENvc3RzIiwiY29tcHV0ZUluZGl2aWR1YWxQYXlvZmYiLCJvblJvdW5kRW5kIiwicHJldkN1bXVsYXRpdmVQYXlvZmYiLCJnZXQiLCJyb3VuZFBheW9mZiIsIm5ld0N1bXVsYXRpdmVQYXlvZmYiLCJNYXRoIiwib25HYW1lRW5kIiwiY29tcHV0ZVRvdGFsUGF5b2ZmIiwiY29udmVydFBheW9mZiIsIm11bHRpcGxpZXIiLCJuZXdUb3RhbENvbnRyaWJ1dGlvbnMiLCJjb250cmlidXRpb24iLCJwYXJzZUZsb2F0IiwibXVsdGlwbGllZFJldHVybnMiLCJ0b3RhbFJldHVybnMiLCJwYXlvZmYiLCJsZW5ndGgiLCJwdW5pc2hlZCIsInB1bmlzaGVkS2V5cyIsIk9iamVjdCIsImtleXMiLCJjb3N0Iiwia2V5IiwiYW1vdW50IiwicHVuaXNobWVudENvc3QiLCJwdW5pc2hlZEJ5Iiwib3RoZXJQbGF5ZXJzIiwiXyIsInJlamVjdCIsInAiLCJfaWQiLCJvdGhlclBsYXllciIsIm90aGVyUGxheWVyUHVuaXNoZWQiLCJpbmNsdWRlcyIsImNvbnNvbGUiLCJsb2ciLCJyZWNlaXZlZFB1bmlzaG1lbnRzIiwicHVuaXNoZWRCeUtleXMiLCJwZW5hbHRpZXMiLCJwdW5pc2htZW50TWFnbml0dWRlIiwicmVtYWluaW5nRW5kb3dtZW50IiwiY29zdHMiLCJ0b3RhbFBheW9mZiIsImN1bXVsYXRpdmVQYXlvZmYiLCJlYXJuaW5ncyIsImNvbnZlcnNpb25SYXRlIiwiZ2FtZUluaXQiLCJ0aW1lcyIsIm51bVJvdW5kcyIsImFkZFJvdW5kIiwiYWRkU3RhZ2UiLCJkaXNwbGF5TmFtZSIsImR1cmF0aW9uSW5TZWNvbmRzIiwiY29udHJpYnV0aW9uRHVyYXRpb24iLCJwdW5pc2htZW50RXhpc3RzIiwib3V0Y29tZUR1cmF0aW9uIiwic3VtbWFyeUR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLFFBQUo7QUFBYUMsTUFBTSxDQUFDQyxJQUFQLENBQVksc0JBQVosRUFBbUM7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0osWUFBUSxHQUFDSSxDQUFUO0FBQVc7O0FBQXZCLENBQW5DLEVBQTRELENBQTVEO0FBRWI7QUFFQUosUUFBUSxDQUFDSyxHQUFULENBQWEsS0FBYixFQUFvQjtBQUNsQjtBQUNBO0FBRUE7QUFDQUMsYUFBVyxDQUFDRCxHQUFELEVBQU1FLElBQU4sRUFBWUMsS0FBWixFQUFtQkMsS0FBbkIsRUFBMEJDLGdCQUExQixFQUE0QyxDQUFFLENBTHZDLENBT2xCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7OztBQVprQixDQUFwQixFOzs7Ozs7Ozs7OztBQ0pBLElBQUlDLFVBQUo7QUFBZVYsTUFBTSxDQUFDQyxJQUFQLENBQVksMENBQVosRUFBdUQ7QUFBQ1MsWUFBVSxDQUFDUCxDQUFELEVBQUc7QUFBQ08sY0FBVSxHQUFDUCxDQUFYO0FBQWE7O0FBQTVCLENBQXZELEVBQXFGLENBQXJGO0FBQXdGLElBQUlKLFFBQUo7QUFBYUMsTUFBTSxDQUFDQyxJQUFQLENBQVksc0JBQVosRUFBbUM7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0osWUFBUSxHQUFDSSxDQUFUO0FBQVc7O0FBQXZCLENBQW5DLEVBQTRELENBQTVEO0FBR3BIO0FBQ0E7QUFDQTtBQUNBSixRQUFRLENBQUNZLFdBQVQsQ0FBc0JMLElBQUQsSUFBVTtBQUM3QkEsTUFBSSxDQUFDTSxHQUFMLENBQVMsYUFBVCxFQUF3QixJQUF4QjtBQUNBTixNQUFJLENBQUNPLE9BQUwsQ0FBYUMsT0FBYixDQUFxQixDQUFDQyxNQUFELEVBQVNDLENBQVQsS0FBZTtBQUNsQztBQUNBRCxVQUFNLENBQUNILEdBQVAsQ0FBVyxRQUFYLHFCQUFpQ0ksQ0FBakM7QUFDQUQsVUFBTSxDQUFDSCxHQUFQLENBQVcsVUFBWCxFQUF1QkksQ0FBdkI7QUFDQUQsVUFBTSxDQUFDSCxHQUFQLENBQVcsa0JBQVgsRUFBK0JOLElBQUksQ0FBQ1csU0FBTCxDQUFlQyxTQUE5QztBQUNELEdBTEQ7QUFNRCxDQVJELEUsQ0FVQTtBQUNBOztBQUNBbkIsUUFBUSxDQUFDb0IsWUFBVCxDQUFzQixDQUFDYixJQUFELEVBQU9DLEtBQVAsS0FBaUI7QUFDckNBLE9BQUssQ0FBQ0ssR0FBTixDQUFVLG9CQUFWLEVBQWdDLENBQWhDO0FBQ0FMLE9BQUssQ0FBQ0ssR0FBTixDQUFVLGNBQVYsRUFBMEIsQ0FBMUI7QUFDQUwsT0FBSyxDQUFDSyxHQUFOLENBQVUsUUFBVixFQUFvQixDQUFwQjtBQUNBTixNQUFJLENBQUNPLE9BQUwsQ0FBYUMsT0FBYixDQUFxQixDQUFDQyxNQUFELEVBQVNDLENBQVQsS0FBZTtBQUNsQ0QsVUFBTSxDQUFDUixLQUFQLENBQWFLLEdBQWIsQ0FBaUIsV0FBakIsRUFBOEJOLElBQUksQ0FBQ1csU0FBTCxDQUFlQyxTQUE3QztBQUNBSCxVQUFNLENBQUNSLEtBQVAsQ0FBYUssR0FBYixDQUFpQixZQUFqQixFQUErQixFQUEvQjtBQUNBRyxVQUFNLENBQUNSLEtBQVAsQ0FBYUssR0FBYixDQUFpQixjQUFqQixFQUFpQyxDQUFqQztBQUNBRyxVQUFNLENBQUNSLEtBQVAsQ0FBYUssR0FBYixDQUFpQixVQUFqQixFQUE2QixFQUE3QjtBQUNELEdBTEQ7QUFNRCxDQVZELEUsQ0FZQTtBQUNBOztBQUNBYixRQUFRLENBQUNxQixZQUFULENBQXNCLENBQUNkLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxLQUFkLEtBQXdCLENBQUUsQ0FBaEQsRSxDQUVBO0FBQ0E7O0FBQ0FULFFBQVEsQ0FBQ3NCLFVBQVQsQ0FBb0IsQ0FBQ2YsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEtBQWQsS0FBd0I7QUFDMUMsTUFBSUEsS0FBSyxDQUFDYyxJQUFOLElBQWMsY0FBbEIsRUFBa0M7QUFDaENDLGlCQUFhLENBQUNqQixJQUFELEVBQU9DLEtBQVAsQ0FBYjtBQUNELEdBSHlDLENBR3hDOzs7QUFDRixNQUFJQyxLQUFLLENBQUNjLElBQU4sSUFBYyxTQUFsQixFQUE2QjtBQUMzQkUsMEJBQXNCLENBQUNsQixJQUFELEVBQU9DLEtBQVAsQ0FBdEI7QUFDQWtCLDJCQUF1QixDQUFDbkIsSUFBRCxFQUFPQyxLQUFQLENBQXZCO0FBQ0Q7QUFDRixDQVJELEUsQ0FVQTtBQUNBOztBQUNBUixRQUFRLENBQUMyQixVQUFULENBQW9CLENBQUNwQixJQUFELEVBQU9DLEtBQVAsS0FBaUI7QUFDbkNELE1BQUksQ0FBQ08sT0FBTCxDQUFhQyxPQUFiLENBQXNCQyxNQUFELElBQVk7QUFDL0IsVUFBTVksb0JBQW9CLEdBQUdaLE1BQU0sQ0FBQ2EsR0FBUCxDQUFXLGtCQUFYLENBQTdCO0FBQ0EsVUFBTUMsV0FBVyxHQUFHZCxNQUFNLENBQUNSLEtBQVAsQ0FBYXFCLEdBQWIsQ0FBaUIsYUFBakIsQ0FBcEI7QUFDQSxVQUFNRSxtQkFBbUIsR0FBR0MsSUFBSSxDQUFDeEIsS0FBTCxDQUFXb0Isb0JBQW9CLEdBQUdFLFdBQWxDLENBQTVCO0FBQ0FkLFVBQU0sQ0FBQ0gsR0FBUCxDQUFXLGtCQUFYLEVBQStCa0IsbUJBQS9CO0FBQ0QsR0FMRDtBQU1ELENBUEQsRSxDQVNBO0FBQ0E7O0FBQ0EvQixRQUFRLENBQUNpQyxTQUFULENBQW9CMUIsSUFBRCxJQUFVO0FBQzNCMkIsb0JBQWtCLENBQUMzQixJQUFELENBQWxCO0FBQ0E0QixlQUFhLENBQUM1QixJQUFELENBQWI7QUFDRCxDQUhELEUsQ0FLQTs7QUFDQSxTQUFTaUIsYUFBVCxDQUF1QmpCLElBQXZCLEVBQTZCQyxLQUE3QixFQUFvQztBQUNsQyxRQUFNNEIsVUFBVSxHQUFHN0IsSUFBSSxDQUFDVyxTQUFMLENBQWVrQixVQUFsQztBQUNBLE1BQUlDLHFCQUFxQixHQUFHLENBQTVCO0FBQ0E5QixNQUFJLENBQUNPLE9BQUwsQ0FBYUMsT0FBYixDQUFzQkMsTUFBRCxJQUFZO0FBQy9CLFVBQU1zQixZQUFZLEdBQUd0QixNQUFNLENBQUNSLEtBQVAsQ0FBYXFCLEdBQWIsQ0FBaUIsY0FBakIsQ0FBckI7QUFDQVEseUJBQXFCLElBQUlFLFVBQVUsQ0FBQ0QsWUFBRCxDQUFuQztBQUNELEdBSEQ7QUFJQTlCLE9BQUssQ0FBQ0ssR0FBTixDQUFVLG9CQUFWLEVBQWdDd0IscUJBQWhDO0FBQ0EsUUFBTUcsaUJBQWlCLEdBQUdSLElBQUksQ0FBQ3hCLEtBQUwsQ0FDeEJBLEtBQUssQ0FBQ3FCLEdBQU4sQ0FBVSxvQkFBVixJQUFrQ08sVUFEVixDQUExQjtBQUdBNUIsT0FBSyxDQUFDSyxHQUFOLENBQVUsY0FBVixFQUEwQjJCLGlCQUExQjtBQUNBLFFBQU1DLFlBQVksR0FBR2pDLEtBQUssQ0FBQ3FCLEdBQU4sQ0FBVSxjQUFWLENBQXJCO0FBQ0EsUUFBTWEsTUFBTSxHQUFHVixJQUFJLENBQUN4QixLQUFMLENBQVdpQyxZQUFZLEdBQUdsQyxJQUFJLENBQUNPLE9BQUwsQ0FBYTZCLE1BQXZDLENBQWY7QUFDQW5DLE9BQUssQ0FBQ0ssR0FBTixDQUFVLFFBQVYsRUFBb0I2QixNQUFwQjtBQUNEOztBQUVELFNBQVNqQixzQkFBVCxDQUFnQ2xCLElBQWhDLEVBQXNDQyxLQUF0QyxFQUE2QztBQUMzQ0QsTUFBSSxDQUFDTyxPQUFMLENBQWFDLE9BQWIsQ0FBc0JDLE1BQUQsSUFBWTtBQUMvQixVQUFNNEIsUUFBUSxHQUFHNUIsTUFBTSxDQUFDUixLQUFQLENBQWFxQixHQUFiLENBQWlCLFVBQWpCLENBQWpCO0FBQ0EsVUFBTWdCLFlBQVksR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlILFFBQVosQ0FBckI7QUFDQSxRQUFJSSxJQUFJLEdBQUcsQ0FBWDs7QUFDQSxTQUFLLE1BQU1DLEdBQVgsSUFBa0JKLFlBQWxCLEVBQWdDO0FBQzlCLFVBQUlELFFBQVEsQ0FBQ0ssR0FBRCxDQUFSLElBQWlCLEdBQXJCLEVBQTBCO0FBQ3hCQyxjQUFNLEdBQUdOLFFBQVEsQ0FBQ0ssR0FBRCxDQUFqQjtBQUNBRCxZQUFJLElBQUlULFVBQVUsQ0FBQ1csTUFBRCxDQUFWLEdBQXFCM0MsSUFBSSxDQUFDVyxTQUFMLENBQWVpQyxjQUE1QztBQUNELE9BSEQsTUFHTyxDQUNOO0FBQ0Y7O0FBQ0QsUUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0FwQyxVQUFNLENBQUNSLEtBQVAsQ0FBYUssR0FBYixDQUFpQixPQUFqQixFQUEwQm1DLElBQTFCOztBQUNBLFVBQU1LLFlBQVksR0FBR0MsQ0FBQyxDQUFDQyxNQUFGLENBQVNoRCxJQUFJLENBQUNPLE9BQWQsRUFBd0IwQyxDQUFELElBQU9BLENBQUMsQ0FBQ0MsR0FBRixLQUFVekMsTUFBTSxDQUFDeUMsR0FBL0MsQ0FBckI7O0FBQ0FKLGdCQUFZLENBQUN0QyxPQUFiLENBQXNCMkMsV0FBRCxJQUFpQjtBQUNwQyxZQUFNQyxtQkFBbUIsR0FBR0QsV0FBVyxDQUFDbEQsS0FBWixDQUFrQnFCLEdBQWxCLENBQXNCLFVBQXRCLENBQTVCOztBQUNBLFVBQUlpQixNQUFNLENBQUNDLElBQVAsQ0FBWVksbUJBQVosRUFBaUNDLFFBQWpDLENBQTBDNUMsTUFBTSxDQUFDeUMsR0FBakQsQ0FBSixFQUEyRDtBQUN6REwsa0JBQVUsQ0FBQ00sV0FBVyxDQUFDRCxHQUFiLENBQVYsR0FBOEJFLG1CQUFtQixDQUFDM0MsTUFBTSxDQUFDeUMsR0FBUixDQUFqRDtBQUNBSSxlQUFPLENBQUNDLEdBQVIsQ0FBWVYsVUFBWjtBQUNEO0FBQ0YsS0FORDtBQU9BcEMsVUFBTSxDQUFDUixLQUFQLENBQWFLLEdBQWIsQ0FBaUIsWUFBakIsRUFBK0J1QyxVQUEvQjtBQUNBQSxjQUFVLEdBQUdwQyxNQUFNLENBQUNSLEtBQVAsQ0FBYXFCLEdBQWIsQ0FBaUIsWUFBakIsQ0FBYjtBQUNBLFFBQUlrQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLFVBQU1DLGNBQWMsR0FBR2xCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSyxVQUFaLENBQXZCOztBQUNBLFNBQUssTUFBTUgsR0FBWCxJQUFrQmUsY0FBbEIsRUFBa0M7QUFDaEMsVUFBSVosVUFBVSxDQUFDSCxHQUFELENBQVYsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUJDLGNBQU0sR0FBR0UsVUFBVSxDQUFDSCxHQUFELENBQW5CO0FBQ0FjLDJCQUFtQixJQUFJeEIsVUFBVSxDQUFDVyxNQUFELENBQWpDO0FBQ0Q7QUFDRjs7QUFDRCxVQUFNZSxTQUFTLEdBQ2IxQixVQUFVLENBQUN3QixtQkFBRCxDQUFWLEdBQWtDeEQsSUFBSSxDQUFDVyxTQUFMLENBQWVnRCxtQkFEbkQ7QUFFQWxELFVBQU0sQ0FBQ1IsS0FBUCxDQUFhSyxHQUFiLENBQWlCLFdBQWpCLEVBQThCb0QsU0FBOUI7QUFDRCxHQWxDRDtBQW1DRCxDLENBRUQ7OztBQUNBLFNBQVN2Qyx1QkFBVCxDQUFpQ25CLElBQWpDLEVBQXVDQyxLQUF2QyxFQUE4QztBQUM1Q0QsTUFBSSxDQUFDTyxPQUFMLENBQWFDLE9BQWIsQ0FBc0JDLE1BQUQsSUFBWTtBQUMvQixVQUFNMEIsTUFBTSxHQUFHbEMsS0FBSyxDQUFDcUIsR0FBTixDQUFVLFFBQVYsQ0FBZjtBQUNBLFVBQU1TLFlBQVksR0FBR3RCLE1BQU0sQ0FBQ1IsS0FBUCxDQUFhcUIsR0FBYixDQUFpQixjQUFqQixDQUFyQjtBQUNBLFVBQU1zQyxrQkFBa0IsR0FDdEI1QixVQUFVLENBQUNoQyxJQUFJLENBQUNXLFNBQUwsQ0FBZUMsU0FBaEIsQ0FBVixHQUF1Q29CLFVBQVUsQ0FBQ0QsWUFBRCxDQURuRDtBQUVBdEIsVUFBTSxDQUFDUixLQUFQLENBQWFLLEdBQWIsQ0FBaUIsb0JBQWpCLEVBQXVDc0Qsa0JBQXZDO0FBQ0EsVUFBTUYsU0FBUyxHQUFHakQsTUFBTSxDQUFDUixLQUFQLENBQWFxQixHQUFiLENBQWlCLFdBQWpCLENBQWxCO0FBQ0EsVUFBTXVDLEtBQUssR0FBR3BELE1BQU0sQ0FBQ1IsS0FBUCxDQUFhcUIsR0FBYixDQUFpQixPQUFqQixDQUFkO0FBQ0EsVUFBTUMsV0FBVyxHQUNmUyxVQUFVLENBQUNHLE1BQUQsQ0FBVixHQUNBSCxVQUFVLENBQUM0QixrQkFBRCxDQURWLEdBRUE1QixVQUFVLENBQUMwQixTQUFELENBRlYsR0FHQTFCLFVBQVUsQ0FBQzZCLEtBQUQsQ0FKWjtBQUtBcEQsVUFBTSxDQUFDUixLQUFQLENBQWFLLEdBQWIsQ0FBaUIsYUFBakIsRUFBZ0NpQixXQUFoQztBQUNELEdBZEQ7QUFlRCxDLENBRUQ7OztBQUNBLFNBQVNJLGtCQUFULENBQTRCM0IsSUFBNUIsRUFBa0M7QUFDaEMsTUFBSThELFdBQVcsR0FBRyxDQUFsQjtBQUNBOUQsTUFBSSxDQUFDTyxPQUFMLENBQWFDLE9BQWIsQ0FBc0JDLE1BQUQsSUFBWTtBQUMvQixVQUFNc0QsZ0JBQWdCLEdBQUd0RCxNQUFNLENBQUNhLEdBQVAsQ0FBVyxrQkFBWCxDQUF6QjtBQUNBd0MsZUFBVyxJQUFJOUIsVUFBVSxDQUFDK0IsZ0JBQUQsQ0FBekI7QUFDQS9ELFFBQUksQ0FBQ00sR0FBTCxDQUFTLGFBQVQsRUFBd0J3RCxXQUF4QjtBQUNELEdBSkQ7QUFLRCxDLENBRUQ7OztBQUNBLFNBQVNsQyxhQUFULENBQXVCNUIsSUFBdkIsRUFBNkI7QUFDM0JBLE1BQUksQ0FBQ08sT0FBTCxDQUFhQyxPQUFiLENBQXNCQyxNQUFELElBQVk7QUFDL0IsVUFBTXNELGdCQUFnQixHQUFHdEQsTUFBTSxDQUFDYSxHQUFQLENBQVcsa0JBQVgsQ0FBekI7QUFDQSxRQUFJMEMsUUFBUSxHQUFHLENBQWY7O0FBQ0EsUUFBSUQsZ0JBQWdCLEdBQUcsQ0FBdkIsRUFBMEI7QUFDeEIsVUFBSUMsUUFBUSxHQUNWaEMsVUFBVSxDQUFDK0IsZ0JBQUQsQ0FBVixHQUErQi9ELElBQUksQ0FBQ1csU0FBTCxDQUFlc0QsY0FEaEQ7QUFFRCxLQUhELE1BR08sQ0FDTjs7QUFDRHhELFVBQU0sQ0FBQ0gsR0FBUCxDQUFXLFVBQVgsRUFBdUIwRCxRQUF2QjtBQUNELEdBVEQ7QUFVRCxDLENBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7Ozs7Ozs7Ozs7O0FDN1BBLElBQUl2RSxRQUFKO0FBQWFDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHNCQUFaLEVBQW1DO0FBQUNDLFNBQU8sQ0FBQ0MsQ0FBRCxFQUFHO0FBQUNKLFlBQVEsR0FBQ0ksQ0FBVDtBQUFXOztBQUF2QixDQUFuQyxFQUE0RCxDQUE1RDtBQUErREgsTUFBTSxDQUFDQyxJQUFQLENBQVksV0FBWjtBQUF5QkQsTUFBTSxDQUFDQyxJQUFQLENBQVksZ0JBQVo7QUFJckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQUYsUUFBUSxDQUFDeUUsUUFBVCxDQUFtQmxFLElBQUQsSUFBVTtBQUMxQitDLEdBQUMsQ0FBQ29CLEtBQUYsQ0FBUW5FLElBQUksQ0FBQ1csU0FBTCxDQUFleUQsU0FBdkIsRUFBbUMxRCxDQUFELElBQU87QUFDdkMsVUFBTVQsS0FBSyxHQUFHRCxJQUFJLENBQUNxRSxRQUFMLEVBQWQ7QUFFQXBFLFNBQUssQ0FBQ3FFLFFBQU4sQ0FBZTtBQUNidEQsVUFBSSxFQUFFLGNBRE87QUFFYnVELGlCQUFXLEVBQUUsY0FGQTtBQUdiQyx1QkFBaUIsRUFBRXhFLElBQUksQ0FBQ1csU0FBTCxDQUFlOEQ7QUFIckIsS0FBZjtBQU1BeEUsU0FBSyxDQUFDcUUsUUFBTixDQUFlO0FBQ2J0RCxVQUFJLEVBQUUsU0FETztBQUVidUQsaUJBQVcsRUFBRXZFLElBQUksQ0FBQ1csU0FBTCxDQUFlK0QsZ0JBQWYsR0FBa0Msc0JBQWxDLEdBQTJELFNBRjNEO0FBR2JGLHVCQUFpQixFQUFFeEUsSUFBSSxDQUFDVyxTQUFMLENBQWVnRTtBQUhyQixLQUFmO0FBTUExRSxTQUFLLENBQUNxRSxRQUFOLENBQWU7QUFDYnRELFVBQUksRUFBRSxTQURPO0FBRWJ1RCxpQkFBVyxFQUFFLFNBRkE7QUFHYkMsdUJBQWlCLEVBQUV4RSxJQUFJLENBQUNXLFNBQUwsQ0FBZWlFO0FBSHJCLEtBQWY7QUFLRCxHQXBCRDtBQXFCRCxDQXRCRCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW1waXJpY2EgZnJvbSBcIm1ldGVvci9lbXBpcmljYTpjb3JlXCI7XG5cbi8vIFRoaXMgaXMgd2hlcmUgeW91IGFkZCBib3RzLCBsaWtlIEJvYjpcblxuRW1waXJpY2EuYm90KFwiYm9iXCIsIHtcbiAgLy8gLy8gTk9UIFNVUFBPUlRFRCBDYWxsZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIHN0YWdlIChhZnRlciBvblJvdW5kU3RhcnQvb25TdGFnZVN0YXJ0KVxuICAvLyBvblN0YWdlU3RhcnQoYm90LCBnYW1lLCByb3VuZCwgc3RhZ2UsIHBsYXllcnMpIHt9LFxuXG4gIC8vIENhbGxlZCBkdXJpbmcgZWFjaCBzdGFnZSBhdCB0aWNrIGludGVydmFsICh+MXMgYXQgdGhlIG1vbWVudClcbiAgb25TdGFnZVRpY2soYm90LCBnYW1lLCByb3VuZCwgc3RhZ2UsIHNlY29uZHNSZW1haW5pbmcpIHt9XG5cbiAgLy8gLy8gTk9UIFNVUFBPUlRFRCBBIHBsYXllciBoYXMgY2hhbmdlZCBhIHZhbHVlXG4gIC8vIC8vIFRoaXMgbWlnaHQgaGFwcGVuIGEgbG90IVxuICAvLyBvblN0YWdlUGxheWVyQ2hhbmdlKGJvdCwgZ2FtZSwgcm91bmQsIHN0YWdlLCBwbGF5ZXJzLCBwbGF5ZXIpIHt9XG5cbiAgLy8gLy8gTk9UIFNVUFBPUlRFRCBDYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGUgc3RhZ2UgKGFmdGVyIGl0IGZpbmlzaGVkLCBiZWZvcmUgb25TdGFnZUVuZC9vblJvdW5kRW5kIGlzIGNhbGxlZClcbiAgLy8gb25TdGFnZUVuZChib3QsIGdhbWUsIHJvdW5kLCBzdGFnZSwgcGxheWVycykge31cbn0pO1xuIiwiaW1wb3J0IHsgQUxJR05fTEVGVCB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZS9saWIvZXNtL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgRW1waXJpY2EgZnJvbSBcIm1ldGVvci9lbXBpcmljYTpjb3JlXCI7XG5cbi8vIG9uR2FtZVN0YXJ0IGlzIHRyaWdnZXJlZCBvcG5jZSBwZXIgZ2FtZSBiZWZvcmUgdGhlIGdhbWUgc3RhcnRzLCBhbmQgYmVmb3JlXG4vLyB0aGUgZmlyc3Qgb25Sb3VuZFN0YXJ0LiBJdCByZWNlaXZlcyB0aGUgZ2FtZSBhbmQgbGlzdCBvZiBhbGwgdGhlIHBsYXllcnMgaW5cbi8vIHRoZSBnYW1lLlxuRW1waXJpY2Eub25HYW1lU3RhcnQoKGdhbWUpID0+IHtcbiAgZ2FtZS5zZXQoXCJqdXN0U3RhcnRlZFwiLCB0cnVlKTtcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllciwgaSkgPT4ge1xuICAgIC8qcGxheWVyLnNldChcImF2YXRhclwiLCBgL2F2YXRhcnMvamRlbnRpY29uLyR7cGxheWVyLl9pZH1gKTsqL1xuICAgIHBsYXllci5zZXQoXCJhdmF0YXJcIiwgYC9hdmF0YXJzLyR7aX0ucG5nYCk7XG4gICAgcGxheWVyLnNldChcImF2YXRhcklkXCIsIGkpO1xuICAgIHBsYXllci5zZXQoXCJjdW11bGF0aXZlUGF5b2ZmXCIsIGdhbWUudHJlYXRtZW50LmVuZG93bWVudCk7XG4gIH0pO1xufSk7XG5cbi8vIG9uUm91bmRTdGFydCBpcyB0cmlnZ2VyZWQgYmVmb3JlIGVhY2ggcm91bmQgc3RhcnRzLCBhbmQgYmVmb3JlIG9uU3RhZ2VTdGFydC5cbi8vIEl0IHJlY2VpdmVzIHRoZSBzYW1lIG9wdGlvbnMgYXMgb25HYW1lU3RhcnQsIGFuZCB0aGUgcm91bmQgdGhhdCBpcyBzdGFydGluZy5cbkVtcGlyaWNhLm9uUm91bmRTdGFydCgoZ2FtZSwgcm91bmQpID0+IHtcbiAgcm91bmQuc2V0KFwidG90YWxDb250cmlidXRpb25zXCIsIDApO1xuICByb3VuZC5zZXQoXCJ0b3RhbFJldHVybnNcIiwgMCk7XG4gIHJvdW5kLnNldChcInBheW9mZlwiLCAwKTtcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllciwgaSkgPT4ge1xuICAgIHBsYXllci5yb3VuZC5zZXQoXCJlbmRvd21lbnRcIiwgZ2FtZS50cmVhdG1lbnQuZW5kb3dtZW50KTtcbiAgICBwbGF5ZXIucm91bmQuc2V0KFwicHVuaXNoZWRCeVwiLCB7fSk7XG4gICAgcGxheWVyLnJvdW5kLnNldChcImNvbnRyaWJ1dGlvblwiLCAwKTtcbiAgICBwbGF5ZXIucm91bmQuc2V0KFwicHVuaXNoZWRcIiwge30pO1xuICB9KTtcbn0pO1xuXG4vLyBvblN0YWdlU3RhcnQgaXMgdHJpZ2dlcmVkIGJlZm9yZSBlYWNoIHN0YWdlIHN0YXJ0cy5cbi8vIEl0IHJlY2VpdmVzIHRoZSBzYW1lIG9wdGlvbnMgYXMgb25Sb3VuZFN0YXJ0LCBhbmQgdGhlIHN0YWdlIHRoYXQgaXMgc3RhcnRpbmcuXG5FbXBpcmljYS5vblN0YWdlU3RhcnQoKGdhbWUsIHJvdW5kLCBzdGFnZSkgPT4ge30pO1xuXG4vLyBvblN0YWdlRW5kIGlzIHRyaWdnZXJlZCBhZnRlciBlYWNoIHN0YWdlLlxuLy8gSXQgcmVjZWl2ZXMgdGhlIHNhbWUgb3B0aW9ucyBhcyBvblJvdW5kRW5kLCBhbmQgdGhlIHN0YWdlIHRoYXQganVzdCBlbmRlZC5cbkVtcGlyaWNhLm9uU3RhZ2VFbmQoKGdhbWUsIHJvdW5kLCBzdGFnZSkgPT4ge1xuICBpZiAoc3RhZ2UubmFtZSA9PSBcImNvbnRyaWJ1dGlvblwiKSB7XG4gICAgY29tcHV0ZVBheW9mZihnYW1lLCByb3VuZCk7XG4gIH0gLy9wbGF5ZXIuc3RhZ2Uuc2V0IHZhbHVlcyBidXQgd2FpdCB0byB1cGRhdGUgdW50aWwgcm91bmQgZW5kXG4gIGlmIChzdGFnZS5uYW1lID09IFwib3V0Y29tZVwiKSB7XG4gICAgY29tcHV0ZVB1bmlzaG1lbnRDb3N0cyhnYW1lLCByb3VuZCk7XG4gICAgY29tcHV0ZUluZGl2aWR1YWxQYXlvZmYoZ2FtZSwgcm91bmQpO1xuICB9XG59KTtcblxuLy8gb25Sb3VuZEVuZCBpcyB0cmlnZ2VyZWQgYWZ0ZXIgZWFjaCByb3VuZC5cbi8vIEl0IHJlY2VpdmVzIHRoZSBzYW1lIG9wdGlvbnMgYXMgb25HYW1lRW5kLCBhbmQgdGhlIHJvdW5kIHRoYXQganVzdCBlbmRlZC5cbkVtcGlyaWNhLm9uUm91bmRFbmQoKGdhbWUsIHJvdW5kKSA9PiB7XG4gIGdhbWUucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBwcmV2Q3VtdWxhdGl2ZVBheW9mZiA9IHBsYXllci5nZXQoXCJjdW11bGF0aXZlUGF5b2ZmXCIpO1xuICAgIGNvbnN0IHJvdW5kUGF5b2ZmID0gcGxheWVyLnJvdW5kLmdldChcInJvdW5kUGF5b2ZmXCIpO1xuICAgIGNvbnN0IG5ld0N1bXVsYXRpdmVQYXlvZmYgPSBNYXRoLnJvdW5kKHByZXZDdW11bGF0aXZlUGF5b2ZmICsgcm91bmRQYXlvZmYpO1xuICAgIHBsYXllci5zZXQoXCJjdW11bGF0aXZlUGF5b2ZmXCIsIG5ld0N1bXVsYXRpdmVQYXlvZmYpO1xuICB9KTtcbn0pO1xuXG4vLyBvbkdhbWVFbmQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGdhbWUgZW5kcy5cbi8vIEl0IHJlY2VpdmVzIHRoZSBzYW1lIG9wdGlvbnMgYXMgb25HYW1lU3RhcnQuXG5FbXBpcmljYS5vbkdhbWVFbmQoKGdhbWUpID0+IHtcbiAgY29tcHV0ZVRvdGFsUGF5b2ZmKGdhbWUpO1xuICBjb252ZXJ0UGF5b2ZmKGdhbWUpO1xufSk7XG5cbi8vIGNvbXB1dGUgZWFjaCBwbGF5ZXJzJyBwYXlvZmZzXG5mdW5jdGlvbiBjb21wdXRlUGF5b2ZmKGdhbWUsIHJvdW5kKSB7XG4gIGNvbnN0IG11bHRpcGxpZXIgPSBnYW1lLnRyZWF0bWVudC5tdWx0aXBsaWVyO1xuICBsZXQgbmV3VG90YWxDb250cmlidXRpb25zID0gMDtcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGNvbnRyaWJ1dGlvbiA9IHBsYXllci5yb3VuZC5nZXQoXCJjb250cmlidXRpb25cIik7XG4gICAgbmV3VG90YWxDb250cmlidXRpb25zICs9IHBhcnNlRmxvYXQoY29udHJpYnV0aW9uKTtcbiAgfSk7XG4gIHJvdW5kLnNldChcInRvdGFsQ29udHJpYnV0aW9uc1wiLCBuZXdUb3RhbENvbnRyaWJ1dGlvbnMpO1xuICBjb25zdCBtdWx0aXBsaWVkUmV0dXJucyA9IE1hdGgucm91bmQoXG4gICAgcm91bmQuZ2V0KFwidG90YWxDb250cmlidXRpb25zXCIpICogbXVsdGlwbGllclxuICApO1xuICByb3VuZC5zZXQoXCJ0b3RhbFJldHVybnNcIiwgbXVsdGlwbGllZFJldHVybnMpO1xuICBjb25zdCB0b3RhbFJldHVybnMgPSByb3VuZC5nZXQoXCJ0b3RhbFJldHVybnNcIik7XG4gIGNvbnN0IHBheW9mZiA9IE1hdGgucm91bmQodG90YWxSZXR1cm5zIC8gZ2FtZS5wbGF5ZXJzLmxlbmd0aCk7XG4gIHJvdW5kLnNldChcInBheW9mZlwiLCBwYXlvZmYpO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlUHVuaXNobWVudENvc3RzKGdhbWUsIHJvdW5kKSB7XG4gIGdhbWUucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBwdW5pc2hlZCA9IHBsYXllci5yb3VuZC5nZXQoXCJwdW5pc2hlZFwiKTtcbiAgICBjb25zdCBwdW5pc2hlZEtleXMgPSBPYmplY3Qua2V5cyhwdW5pc2hlZCk7XG4gICAgbGV0IGNvc3QgPSAwO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHB1bmlzaGVkS2V5cykge1xuICAgICAgaWYgKHB1bmlzaGVkW2tleV0gIT0gXCIwXCIpIHtcbiAgICAgICAgYW1vdW50ID0gcHVuaXNoZWRba2V5XTtcbiAgICAgICAgY29zdCArPSBwYXJzZUZsb2F0KGFtb3VudCkgKiBnYW1lLnRyZWF0bWVudC5wdW5pc2htZW50Q29zdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBwdW5pc2hlZEJ5ID0ge307XG4gICAgcGxheWVyLnJvdW5kLnNldChcImNvc3RzXCIsIGNvc3QpO1xuICAgIGNvbnN0IG90aGVyUGxheWVycyA9IF8ucmVqZWN0KGdhbWUucGxheWVycywgKHApID0+IHAuX2lkID09PSBwbGF5ZXIuX2lkKTtcbiAgICBvdGhlclBsYXllcnMuZm9yRWFjaCgob3RoZXJQbGF5ZXIpID0+IHtcbiAgICAgIGNvbnN0IG90aGVyUGxheWVyUHVuaXNoZWQgPSBvdGhlclBsYXllci5yb3VuZC5nZXQoXCJwdW5pc2hlZFwiKTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhvdGhlclBsYXllclB1bmlzaGVkKS5pbmNsdWRlcyhwbGF5ZXIuX2lkKSkge1xuICAgICAgICBwdW5pc2hlZEJ5W290aGVyUGxheWVyLl9pZF0gPSBvdGhlclBsYXllclB1bmlzaGVkW3BsYXllci5faWRdO1xuICAgICAgICBjb25zb2xlLmxvZyhwdW5pc2hlZEJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwbGF5ZXIucm91bmQuc2V0KFwicHVuaXNoZWRCeVwiLCBwdW5pc2hlZEJ5KTtcbiAgICBwdW5pc2hlZEJ5ID0gcGxheWVyLnJvdW5kLmdldChcInB1bmlzaGVkQnlcIik7XG4gICAgbGV0IHJlY2VpdmVkUHVuaXNobWVudHMgPSAwO1xuICAgIGNvbnN0IHB1bmlzaGVkQnlLZXlzID0gT2JqZWN0LmtleXMocHVuaXNoZWRCeSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgcHVuaXNoZWRCeUtleXMpIHtcbiAgICAgIGlmIChwdW5pc2hlZEJ5W2tleV0gIT0gXCIwXCIpIHtcbiAgICAgICAgYW1vdW50ID0gcHVuaXNoZWRCeVtrZXldO1xuICAgICAgICByZWNlaXZlZFB1bmlzaG1lbnRzICs9IHBhcnNlRmxvYXQoYW1vdW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcGVuYWx0aWVzID1cbiAgICAgIHBhcnNlRmxvYXQocmVjZWl2ZWRQdW5pc2htZW50cykgKiBnYW1lLnRyZWF0bWVudC5wdW5pc2htZW50TWFnbml0dWRlO1xuICAgIHBsYXllci5yb3VuZC5zZXQoXCJwZW5hbHRpZXNcIiwgcGVuYWx0aWVzKTtcbiAgfSk7XG59XG5cbi8vIGNvbXB1dGVzIHBsYXllcnMnIGluZGl2aWR1YWwgcGF5b2ZmIChyb3VuZCBwYXlvZmYgbWludXMgcHVuaXNobWVudCBjb3N0cyBhbmQgcGVuYWx0aWVzKVxuZnVuY3Rpb24gY29tcHV0ZUluZGl2aWR1YWxQYXlvZmYoZ2FtZSwgcm91bmQpIHtcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IHBheW9mZiA9IHJvdW5kLmdldChcInBheW9mZlwiKTtcbiAgICBjb25zdCBjb250cmlidXRpb24gPSBwbGF5ZXIucm91bmQuZ2V0KFwiY29udHJpYnV0aW9uXCIpO1xuICAgIGNvbnN0IHJlbWFpbmluZ0VuZG93bWVudCA9XG4gICAgICBwYXJzZUZsb2F0KGdhbWUudHJlYXRtZW50LmVuZG93bWVudCkgLSBwYXJzZUZsb2F0KGNvbnRyaWJ1dGlvbik7XG4gICAgcGxheWVyLnJvdW5kLnNldChcInJlbWFpbmluZ0VuZG93bWVudFwiLCByZW1haW5pbmdFbmRvd21lbnQpO1xuICAgIGNvbnN0IHBlbmFsdGllcyA9IHBsYXllci5yb3VuZC5nZXQoXCJwZW5hbHRpZXNcIik7XG4gICAgY29uc3QgY29zdHMgPSBwbGF5ZXIucm91bmQuZ2V0KFwiY29zdHNcIik7XG4gICAgY29uc3Qgcm91bmRQYXlvZmYgPVxuICAgICAgcGFyc2VGbG9hdChwYXlvZmYpICtcbiAgICAgIHBhcnNlRmxvYXQocmVtYWluaW5nRW5kb3dtZW50KSAtXG4gICAgICBwYXJzZUZsb2F0KHBlbmFsdGllcykgLVxuICAgICAgcGFyc2VGbG9hdChjb3N0cyk7XG4gICAgcGxheWVyLnJvdW5kLnNldChcInJvdW5kUGF5b2ZmXCIsIHJvdW5kUGF5b2ZmKTtcbiAgfSk7XG59XG5cbi8vIGNvbXB1dGVzIHRoZSB0b3RhbCBwYXlvZmYgYWNyb3NzIGFsbCBwbGF5ZXJzIChtZWFzdXJlIG9mIGNvb3BlcmF0aW9uKSAvL1xuZnVuY3Rpb24gY29tcHV0ZVRvdGFsUGF5b2ZmKGdhbWUpIHtcbiAgbGV0IHRvdGFsUGF5b2ZmID0gMDtcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGN1bXVsYXRpdmVQYXlvZmYgPSBwbGF5ZXIuZ2V0KFwiY3VtdWxhdGl2ZVBheW9mZlwiKTtcbiAgICB0b3RhbFBheW9mZiArPSBwYXJzZUZsb2F0KGN1bXVsYXRpdmVQYXlvZmYpO1xuICAgIGdhbWUuc2V0KFwidG90YWxQYXlvZmZcIiwgdG90YWxQYXlvZmYpO1xuICB9KTtcbn1cblxuLy8gY29udmVydHMgcGxheWVyJ3MgcGF5b2ZmIHRvIHJlYWwgbW9uZXlcbmZ1bmN0aW9uIGNvbnZlcnRQYXlvZmYoZ2FtZSkge1xuICBnYW1lLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKSA9PiB7XG4gICAgY29uc3QgY3VtdWxhdGl2ZVBheW9mZiA9IHBsYXllci5nZXQoXCJjdW11bGF0aXZlUGF5b2ZmXCIpO1xuICAgIGxldCBlYXJuaW5ncyA9IDA7XG4gICAgaWYgKGN1bXVsYXRpdmVQYXlvZmYgPiAwKSB7XG4gICAgICBsZXQgZWFybmluZ3MgPVxuICAgICAgICBwYXJzZUZsb2F0KGN1bXVsYXRpdmVQYXlvZmYpICogZ2FtZS50cmVhdG1lbnQuY29udmVyc2lvblJhdGU7XG4gICAgfSBlbHNlIHtcbiAgICB9XG4gICAgcGxheWVyLnNldChcImVhcm5pbmdzXCIsIGVhcm5pbmdzKTtcbiAgfSk7XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gPT4gb25TZXQsIG9uQXBwZW5kIGFuZCBvbkNoYW5nZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBvblNldCwgb25BcHBlbmQgYW5kIG9uQ2hhbmdlIGFyZSBjYWxsZWQgb24gZXZlcnkgc2luZ2xlIHVwZGF0ZSBtYWRlIGJ5IGFsbFxuLy8gcGxheWVycyBpbiBlYWNoIGdhbWUsIHNvIHRoZXkgY2FuIHJhcGlkbHkgYmVjb21lIHF1aXRlIGV4cGVuc2l2ZSBhbmQgaGF2ZVxuLy8gdGhlIHBvdGVudGlhbCB0byBzbG93IGRvd24gdGhlIGFwcC4gVXNlIHdpc2VseS5cblxuLy8gSXQgaXMgdmVyeSB1c2VmdWwgdG8gYmUgYWJsZSB0byByZWFjdCB0byBlYWNoIHVwZGF0ZSBhIHVzZXIgbWFrZXMuIFRyeVxuLy8gbm9udGhlbGVzcyB0byBsaW1pdCB0aGUgYW1vdW50IG9mIGNvbXB1dGF0aW9ucyBhbmQgZGF0YWJhc2Ugc2F2ZXMgKC5zZXQpXG4vLyBkb25lIGluIHRoZXNlIGNhbGxiYWNrcy4gWW91IGNhbiBhbHNvIHRyeSB0byBsaW1pdCB0aGUgYW1vdW50IG9mIGNhbGxzIHRvXG4vLyBzZXQoKSBhbmQgYXBwZW5kKCkgeW91IG1ha2UgKGF2b2lkIGNhbGxpbmcgdGhlbSBvbiBhIGNvbnRpbnVvdXMgZHJhZyBvZiBhXG4vLyBzbGlkZXIgZm9yIGV4YW1wbGUpIGFuZCBpbnNpZGUgdGhlc2UgY2FsbGJhY2tzIHVzZSB0aGUgYGtleWAgYXJndW1lbnQgYXQgdGhlXG4vLyB2ZXJ5IGJlZ2lubmluZyBvZiB0aGUgY2FsbGJhY2sgdG8gZmlsdGVyIG91dCB3aGljaCBrZXlzIHlvdXIgbmVlZCB0byBydW5cbi8vIGxvZ2ljIGFnYWluc3QuXG5cbi8vIElmIHlvdSBhcmUgbm90IHVzaW5nIHRoZXNlIGNhbGxiYWNrcywgY29tbWVudCB0aGVtIG91dCBzbyB0aGUgc3lzdGVtIGRvZXNcbi8vIG5vdCBjYWxsIHRoZW0gZm9yIG5vdGhpbmcuXG5cbi8vIG9uU2V0IGlzIGNhbGxlZCB3aGVuIHRoZSBleHBlcmltZW50IGNvZGUgY2FsbCB0aGUgLnNldCgpIG1ldGhvZFxuLy8gb24gZ2FtZXMsIHJvdW5kcywgc3RhZ2VzLCBwbGF5ZXJzLCBwbGF5ZXJSb3VuZHMgb3IgcGxheWVyU3RhZ2VzLlxuLy8gRW1waXJpY2Eub25TZXQoXG4vLyAgIChcbi8vICAgICBnYW1lLFxuLy8gICAgIHJvdW5kLFxuLy8gICAgIHN0YWdlLFxuLy8gICAgIHBsYXllciwgLy8gUGxheWVyIHdobyBtYWRlIHRoZSBjaGFuZ2Vcbi8vICAgICB0YXJnZXQsIC8vIE9iamVjdCBvbiB3aGljaCB0aGUgY2hhbmdlIHdhcyBtYWRlIChlZy4gcGxheWVyLnNldCgpID0+IHBsYXllcilcbi8vICAgICB0YXJnZXRUeXBlLCAvLyBUeXBlIG9mIG9iamVjdCBvbiB3aGljaCB0aGUgY2hhbmdlIHdhcyBtYWRlIChlZy4gcGxheWVyLnNldCgpID0+IFwicGxheWVyXCIpXG4vLyAgICAga2V5LCAvLyBLZXkgb2YgY2hhbmdlZCB2YWx1ZSAoZS5nLiBwbGF5ZXIuc2V0KFwic2NvcmVcIiwgMSkgPT4gXCJzY29yZVwiKVxuLy8gICAgIHZhbHVlLCAvLyBOZXcgdmFsdWVcbi8vICAgICBwcmV2VmFsdWUgLy8gUHJldmlvdXMgdmFsdWVcbi8vICAgKSA9PiB7XG4vLyAgICAgLy8gLy8gRXhhbXBsZSBmaWx0ZXJpbmdcbi8vICAgICAvLyBpZiAoa2V5ICE9PSBcInZhbHVlXCIpIHtcbi8vICAgICAvLyAgIHJldHVybjtcbi8vICAgICAvLyB9XG4vLyAgIH1cbi8vICk7XG5cbi8vIC8vIG9uQXBwZW5kIGlzIGNhbGxlZCB3aGVuIHRoZSBleHBlcmltZW50IGNvZGUgY2FsbCB0aGUgYC5hcHBlbmQoKWAgbWV0aG9kXG4vLyAvLyBvbiBnYW1lcywgcm91bmRzLCBzdGFnZXMsIHBsYXllcnMsIHBsYXllclJvdW5kcyBvciBwbGF5ZXJTdGFnZXMuXG4vLyBFbXBpcmljYS5vbkFwcGVuZChcbi8vICAgKFxuLy8gICAgIGdhbWUsXG4vLyAgICAgcm91bmQsXG4vLyAgICAgc3RhZ2UsXG4vLyAgICAgcGxheWVyLCAvLyBQbGF5ZXIgd2hvIG1hZGUgdGhlIGNoYW5nZVxuLy8gICAgIHRhcmdldCwgLy8gT2JqZWN0IG9uIHdoaWNoIHRoZSBjaGFuZ2Ugd2FzIG1hZGUgKGVnLiBwbGF5ZXIuc2V0KCkgPT4gcGxheWVyKVxuLy8gICAgIHRhcmdldFR5cGUsIC8vIFR5cGUgb2Ygb2JqZWN0IG9uIHdoaWNoIHRoZSBjaGFuZ2Ugd2FzIG1hZGUgKGVnLiBwbGF5ZXIuc2V0KCkgPT4gXCJwbGF5ZXJcIilcbi8vICAgICBrZXksIC8vIEtleSBvZiBjaGFuZ2VkIHZhbHVlIChlLmcuIHBsYXllci5zZXQoXCJzY29yZVwiLCAxKSA9PiBcInNjb3JlXCIpXG4vLyAgICAgdmFsdWUsIC8vIE5ldyB2YWx1ZVxuLy8gICAgIHByZXZWYWx1ZSAvLyBQcmV2aW91cyB2YWx1ZVxuLy8gICApID0+IHtcbi8vICAgICAvLyBOb3RlOiBgdmFsdWVgIGlzIHRoZSBzaW5nbGUgbGFzdCB2YWx1ZSAoZS5nIDAuMiksIHdoaWxlIGBwcmV2VmFsdWVgIHdpbGxcbi8vICAgICAvLyAgICAgICBiZSBhbiBhcnJheSBvZiB0aGUgcHJldmlzb3VzIHZhbHVlZCAoZS5nLiBbMC4zLCAwLjQsIDAuNjVdKS5cbi8vICAgfVxuLy8gKTtcblxuLy8gLy8gb25DaGFuZ2UgaXMgY2FsbGVkIHdoZW4gdGhlIGV4cGVyaW1lbnQgY29kZSBjYWxsIHRoZSBgLnNldCgpYCBvciB0aGVcbi8vIC8vIGAuYXBwZW5kKClgIG1ldGhvZCBvbiBnYW1lcywgcm91bmRzLCBzdGFnZXMsIHBsYXllcnMsIHBsYXllclJvdW5kcyBvclxuLy8gLy8gcGxheWVyU3RhZ2VzLlxuLy8gRW1waXJpY2Eub25DaGFuZ2UoXG4vLyAgIChcbi8vICAgICBnYW1lLFxuLy8gICAgIHJvdW5kLFxuLy8gICAgIHN0YWdlLFxuLy8gICAgIHBsYXllciwgLy8gUGxheWVyIHdobyBtYWRlIHRoZSBjaGFuZ2Vcbi8vICAgICB0YXJnZXQsIC8vIE9iamVjdCBvbiB3aGljaCB0aGUgY2hhbmdlIHdhcyBtYWRlIChlZy4gcGxheWVyLnNldCgpID0+IHBsYXllcilcbi8vICAgICB0YXJnZXRUeXBlLCAvLyBUeXBlIG9mIG9iamVjdCBvbiB3aGljaCB0aGUgY2hhbmdlIHdhcyBtYWRlIChlZy4gcGxheWVyLnNldCgpID0+IFwicGxheWVyXCIpXG4vLyAgICAga2V5LCAvLyBLZXkgb2YgY2hhbmdlZCB2YWx1ZSAoZS5nLiBwbGF5ZXIuc2V0KFwic2NvcmVcIiwgMSkgPT4gXCJzY29yZVwiKVxuLy8gICAgIHZhbHVlLCAvLyBOZXcgdmFsdWVcbi8vICAgICBwcmV2VmFsdWUsIC8vIFByZXZpb3VzIHZhbHVlXG4vLyAgICAgaXNBcHBlbmQgLy8gVHJ1ZSBpZiB0aGUgY2hhbmdlIHdhcyBhbiBhcHBlbmQsIGZhbHNlIGlmIGl0IHdhcyBhIHNldFxuLy8gICApID0+IHtcbi8vICAgICAvLyBgb25DaGFuZ2VgIGlzIHVzZWZ1bCB0byBydW4gc2VydmVyLXNpZGUgbG9naWMgZm9yIGFueSB1c2VyIGludGVyYWN0aW9uLlxuLy8gICAgIC8vIE5vdGUgdGhlIGV4dHJhIGlzQXBwZW5kIGJvb2xlYW4gdGhhdCB3aWxsIGFsbG93IHRvIGRpZmZlcmVuY2lhdGUgc2V0cyBhbmRcbi8vICAgICAvLyBhcHBlbmRzLlxuLy8gICAgIEdhbWUuc2V0KFwibGFzdENoYW5nZUF0XCIsIG5ldyBEYXRlKCkudG9TdHJpbmcoKSk7XG4vLyAgIH1cbi8vICk7XG5cbi8vIC8vIG9uU3VibWl0IGlzIGNhbGxlZCB3aGVuIHRoZSBwbGF5ZXIgc3VibWl0cyBhIHN0YWdlLlxuLy8gRW1waXJpY2Eub25TdWJtaXQoXG4vLyAgIChcbi8vICAgICBnYW1lLFxuLy8gICAgIHJvdW5kLFxuLy8gICAgIHN0YWdlLFxuLy8gICAgIHBsYXllciAvLyBQbGF5ZXIgd2hvIHN1Ym1pdHRlZFxuLy8gICApID0+IHt9XG4vLyApO1xuIiwiaW1wb3J0IEVtcGlyaWNhIGZyb20gXCJtZXRlb3IvZW1waXJpY2E6Y29yZVwiO1xuaW1wb3J0IFwiLi9ib3RzLmpzXCI7XG5pbXBvcnQgXCIuL2NhbGxiYWNrcy5qc1wiO1xuXG4vLyBnYW1lSW5pdCBpcyB3aGVyZSB0aGUgc3RydWN0dXJlIG9mIGEgZ2FtZSBpcyBkZWZpbmVkLlxuLy8gSnVzdCBiZWZvcmUgZXZlcnkgZ2FtZSBzdGFydHMsIG9uY2UgYWxsIHRoZSBwbGF5ZXJzIG5lZWRlZCBhcmUgcmVhZHksIHRoaXNcbi8vIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSB0cmVhdG1lbnQgYW5kIHRoZSBsaXN0IG9mIHBsYXllcnMuXG4vLyBZb3UgbXVzdCB0aGVuIGFkZCByb3VuZHMgYW5kIHN0YWdlcyB0byB0aGUgZ2FtZSwgZGVwZW5kaW5nIG9uIHRoZSB0cmVhdG1lbnRcbi8vIGFuZCB0aGUgcGxheWVycy4gWW91IGNhbiBhbHNvIGdldC9zZXQgaW5pdGlhbCB2YWx1ZXMgb24geW91ciBnYW1lLCBwbGF5ZXJzLFxuLy8gcm91bmRzIGFuZCBzdGFnZXMgKHdpdGggZ2V0L3NldCBtZXRob2RzKSwgdGhhdCB3aWxsIGJlIGFibGUgdG8gdXNlIGxhdGVyIGluXG4vLyB0aGUgZ2FtZS5cblxuLypFbXBpcmljYS5nYW1lSW5pdChnYW1lID0+IHtcbiAgY29uc3Qge1xuICAgIHRyZWF0bWVudDoge1xuICAgICAgcGxheWVyQ291bnQsXG4gICAgICBuZXR3b3JrU3RydWN0dXJlLFxuICAgICAgbnVtVGFza1JvdW5kcyxcbiAgICAgIG51bVN1cnZleVJvdW5kcyxcbiAgICAgIHNldFNpemVCYXNlZE9uUGxheWVyQ291bnQsXG4gICAgICB1c2VySW5hY3Rpdml0eUR1cmF0aW9uLFxuICAgICAgdGFza0R1cmF0aW9uLFxuICAgICAgZGVmYXVsdFNldFNpemUsXG4gICAgICBzdXJ2ZXlEdXJhdGlvbixcbiAgICAgIHJlc3VsdHNEdXJhdGlvbixcbiAgICAgIG1heE51bU92ZXJsYXAsXG4gICAgfSxcbiAgfSA9IGdhbWU7XG5cbiovXG5FbXBpcmljYS5nYW1lSW5pdCgoZ2FtZSkgPT4ge1xuICBfLnRpbWVzKGdhbWUudHJlYXRtZW50Lm51bVJvdW5kcywgKGkpID0+IHtcbiAgICBjb25zdCByb3VuZCA9IGdhbWUuYWRkUm91bmQoKTtcblxuICAgIHJvdW5kLmFkZFN0YWdlKHtcbiAgICAgIG5hbWU6IFwiY29udHJpYnV0aW9uXCIsXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb250cmlidXRpb25cIixcbiAgICAgIGR1cmF0aW9uSW5TZWNvbmRzOiBnYW1lLnRyZWF0bWVudC5jb250cmlidXRpb25EdXJhdGlvbixcbiAgICB9KTtcblxuICAgIHJvdW5kLmFkZFN0YWdlKHtcbiAgICAgIG5hbWU6IFwib3V0Y29tZVwiLFxuICAgICAgZGlzcGxheU5hbWU6IGdhbWUudHJlYXRtZW50LnB1bmlzaG1lbnRFeGlzdHMgPyBcIk91dGNvbWUgJiBEZWR1Y3Rpb25zXCIgOiBcIk91dGNvbWVcIixcbiAgICAgIGR1cmF0aW9uSW5TZWNvbmRzOiBnYW1lLnRyZWF0bWVudC5vdXRjb21lRHVyYXRpb24sXG4gICAgfSlcblxuICAgIHJvdW5kLmFkZFN0YWdlKHtcbiAgICAgIG5hbWU6IFwic3VtbWFyeVwiLFxuICAgICAgZGlzcGxheU5hbWU6IFwiU3VtbWFyeVwiLFxuICAgICAgZHVyYXRpb25JblNlY29uZHM6IGdhbWUudHJlYXRtZW50LnN1bW1hcnlEdXJhdGlvbixcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==
