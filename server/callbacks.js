import Empirica from "meteor/empirica:core";

export const AnimalList = [
  "sloth",
  "gorilla",
  "duck",
  "chicken",
  "dog",
  "parrot",
  "moose",
  "rabbit",
  "owl",
  "chick",
  "snake",
  "crocodile",
  "cow",
  "pinguin",
  "monkey",
  "frog",
  "elephant",
  "whale",
  "horse",
  "walrus",
  "rhino",
  "giraffe",
  "pig",
  "buffalo",
  "zebra",
  "narwhal",
  "bear",
  "goat",
  "hippo",
  "panda",
];

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  game.set("justStarted", true);
  game.set("gameStartTimestamp", Date.now());

  _.reject(game.players, (p) => p.get("exited")).forEach((player, i) => {
    /*player.set("avatar", `/avatars/jdenticon/${player._id}`);*/
    player.set("avatar", AnimalList[i]);
    player.set("avatarId", i);
    player.set("cumulativePayoff", game.treatment.endowment);
  });
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  // switch(game.treatment.allOrNothing){
  //   case false:
  //     var contributionProp = game.treatment.defaultContribProp; 
  //   case true:
  //     if(parseInt(game.treatment.defaultContribProp) == 1){
  //       var contributionProp = 1;
  //     }
  //     else{
  //       var contributionProp = 0;
  //     }   
  // }

  round.set("roundStartTimestamp", Date.now());

  var contributionProp = game.treatment.defaultContribProp;
  
  round.set("totalContributions", 0);
  round.set("totalReturns", 0);
  round.set("payoff", 0);
  _.reject(game.players, (p) => p.get("exited")).forEach((player, i) => {
    player.round.set("punishedBy", {});
    player.round.set("punished", {});
    player.round.set("rewardedBy", {});
    player.round.set("rewarded", {});
    player.round.set("contribution", parseInt(game.treatment.endowment * contributionProp));
  });
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  stage.set("stageStartTimestamp", Date.now());

  if(_.reject(game.players, (p) => p.get("exited")).length == 1){
    _.reject(game.players, (p) => p.get("exited"))[0].exit("otherPlayersLeft")
  };
  
  if (stage.index != 0){
    _.reject(game.players, (p) => p.get("exited")).forEach(player => {
      if (Date.now() - player.get("lastTick") > game.treatment.contributionDuration * 1.5 * 1000){
        player.set('exited', true);
        player.exit("offlineTimedOut");
        console.log(`Player ${player._id} removed for being offline.`)
      }
    })
  }
  


});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  stage.set("stageEndTimestamp", Date.now());
  if (stage.name == "contribution") {
    computePayoff(game, round);
  } //player.stage.set values but wait to update until round end
  if (stage.name == "outcome") {
    computePunishmentCosts(game, round);
    computeRewards(game, round);
    computeIndividualPayoff(game, round);
  }
});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  round.set("roundEndTimestamp", Date.now());
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const prevCumulativePayoff = player.get("cumulativePayoff");
    const roundPayoff = player.round.get("roundPayoff");
    const newCumulativePayoff = Math.round(prevCumulativePayoff + roundPayoff);
    player.set("cumulativePayoff", newCumulativePayoff);
  });
});

// onGameEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  game.set("gameEndTimestamp", Date.now());
  computeTotalPayoff(game);
  convertPayoff(game);
});

// compute each players' payoffs
function computePayoff(game, round) {
  const multiplier = game.treatment.multiplier;
  let newTotalContributions = 0;
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const contribution = player.round.get("contribution");
    newTotalContributions += parseFloat(contribution);
  });
  round.set("totalContributions", newTotalContributions);
  const multipliedReturns = Math.round(
    round.get("totalContributions") * multiplier
  );
  round.set("totalReturns", multipliedReturns);
  const totalReturns = round.get("totalReturns");
  const payoff = Math.round(totalReturns / _.reject(game.players, (p) => p.get("exited")).length);
  round.set("payoff", payoff);
}

function computePunishmentCosts(game, round) {
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const punished = player.round.get("punished");
    const punishedKeys = Object.keys(punished);
    let cost = 0;
    for (const key of punishedKeys) {
      if (punished[key] != "0") {
        amount = punished[key];
        cost += parseFloat(amount) * game.treatment.punishmentCost;
      } else {
      }
    }
    let punishedBy = {};
    player.round.set("costs", cost);
    const otherPlayers = _.reject(_.reject(game.players, (p) => p.get("exited")), (p) => p._id === player._id);
    otherPlayers.forEach((otherPlayer) => {
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
    const penalties =
      parseFloat(receivedPunishments) * game.treatment.punishmentMagnitude;
    player.round.set("penalties", penalties);
  });
}

function computeRewards(game, round) {
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const rewarded = player.round.get("rewarded");
    const rewardedKeys = Object.keys(rewarded);
    
    let cost = 0;
    for (const key of rewardedKeys) {
      if (rewarded[key] != "0") {
        amount = rewarded[key];
        cost += parseFloat(amount) * game.treatment.rewardCost;
      } else {
      }
    }

    let rewardedBy = {};

    player.round.set("costs", parseFloat(player.round.get("costs")) + cost);

    const otherPlayers = _.reject(_.reject(game.players, (p) => p.get("exited")), (p) => p._id === player._id);
    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerRewarded = otherPlayer.round.get("rewarded");
      if (Object.keys(otherPlayerRewarded).includes(player._id)) {
        rewardedBy[otherPlayer._id] = otherPlayerRewarded[player._id];
        console.log(rewardedBy);
      }
    });

    player.round.set("rewardedBy", rewardedBy);
    rewardedBy = player.round.get("rewardedBy");
    
    let receivedRewards = 0;
    const rewardedByKeys = Object.keys(rewardedBy);
    for (const key of rewardedByKeys) {
      if (rewardedBy[key] != "0") {
        amount = rewardedBy[key];
        receivedRewards += parseFloat(amount);
      }
    }
    const rewards =
      parseFloat(receivedRewards) * game.treatment.rewardMagnitude;
    player.round.set("rewards", rewards);
  });
}

// computes players' individual payoff (round payoff minus punishment costs and penalties)
function computeIndividualPayoff(game, round) {
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const payoff = round.get("payoff");
    const contribution = player.round.get("contribution");
    const remainingEndowment =
      parseFloat(game.treatment.endowment) - parseFloat(contribution);
    player.round.set("remainingEndowment", remainingEndowment);
    const penalties = player.round.get("penalties");
    const rewards = player.round.get("rewards");
    const costs = player.round.get("costs");
    const roundPayoff =
      parseFloat(payoff) +
      parseFloat(rewards) +
      parseFloat(remainingEndowment) -
      parseFloat(penalties) -
      parseFloat(costs);
    player.round.set("roundPayoff", roundPayoff);
  });
}

// computes the total payoff across all players (measure of cooperation) //
function computeTotalPayoff(game) {
  let totalPayoff = 0;
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const cumulativePayoff = player.get("cumulativePayoff");
    totalPayoff += parseFloat(cumulativePayoff);
    game.set("totalPayoff", totalPayoff);
  });
}

// converts player's payoff to real money
function convertPayoff(game) {
  _.reject(game.players, (p) => p.get("exited")).forEach((player) => {
    const cumulativePayoff = player.get("cumulativePayoff");
    let earnings = 0;
    if (cumulativePayoff > 0) {
      let earnings =
        parseFloat(cumulativePayoff) * game.treatment.conversionRate;
    } else {
    }
    player.set("earnings", earnings);
  });
}

// ===========================================================================
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
