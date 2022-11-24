import React from "react";
import { pickRandom } from "../utils";
import { InstructionsStepOne } from "./InstructionsStepOne";
import { InstructionsStepThree } from "./InstructionsStepThree";
import { InstructionsStepTwo } from "./InstructionsStepTwo";

export function StepOne() {
  return (
    <InstructionsStepOne
      onNext={() => alert("next")}
      treatment={{
        playerCount: 2,
        conversionRate: 2,
        basePay: 1,
        multiplier: 12,
        endowment: 20,
        allOrNothing: false,
      }}
      player={{
        _id: 10000,
        avatar: "dog",
      }}
    />
  );
}

export function StepTwo() {
  return (
    <InstructionsStepTwo
      onNext={() => alert("next")}
      treatment={{
        playerCount: 2,
        conversionRate: 2,
        basePay: 1,
        multiplier: 12,
        endowment: 20,
        punishmentMagnitude: 2,
        punishmentCost: 2,
        allOrNothing: false,
        punishmentExists: false,
      }}
      player={{
        _id: 10000,
        avatar: "dog",
        punished: {},
      }}
    />
  );
}

export function StepThree() {
  const roundPayoff = 7;
  const contribution = pickRandom([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <InstructionsStepThree
      onNext={() => alert("next")}
      treatment={{
        playerCount: 2,
        conversionRate: 2,
        basePay: 1,
        multiplier: 12,
        endowment: 20,
        punishmentMagnitude: 2,
        punishmentCost: 2,
        allOrNothing: false,
      }}
      roundPayoff={roundPayoff}
      player={{
        _id: 10000,
        avatar: "dog",
        punished: {},
        punishedBy: {},
        contribution: contribution,
        roundPayoff: roundPayoff - contribution,
      }}
    />
  );
}
