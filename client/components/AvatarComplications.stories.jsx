import React from "react";
import { AvatarDeduction, AvatarScores } from "./AvatarComplications";

export function AvatarWithScore() {
  return (
    <div className="flex flex-col justify-center items-center space-y-24">
      <div className="grid grid-flow-row grid-cols-3 gap-8">
        <AvatarScores animal={"sloth"} gains={8} />
        <AvatarScores animal={"elephant"} gains={0} />
        <AvatarScores animal={"moose"} gains={-32} />

        <AvatarScores
          animal={"crocodile"}
          given="20"
          received="118"
          contributed="0"
          gains={8}
        />
        <AvatarScores
          animal={"snake"}
          given="5"
          received="20"
          contributed="0"
          gains={0}
        />
        <AvatarScores
          animal={"moose"}
          given="0"
          received="78"
          contributed="245"
          gains={-320}
        />

        <AvatarScores submitted animal={"sloth"} gains={8} />
        <AvatarScores submitted animal={"elephant"} gains={0} />
        <AvatarScores submitted animal={"moose"} gains={-32} />

        <AvatarScores
          submitted
          animal={"crocodile"}
          given="20"
          received="118"
          contributed="0"
          gains={8}
        />
        <AvatarScores
          submitted
          animal={"snake"}
          given="5"
          received="20"
          contributed="0"
          gains={0}
        />
        <AvatarScores
          submitted
          animal={"moose"}
          given="0"
          received="78"
          contributed="245"
          gains={-320}
        />
      </div>

      <AvatarScores
        hints
        animal={"parrot"}
        given="0"
        received="78"
        contributed="0"
        gains={-320}
      />

      <AvatarScores
        hints
        animal={"parrot"}
        given="1480"
        received="780"
        contributed="2450"
        gains={4}
        submitted
      />

      <AvatarScores
        hints
        animal={"parrot"}
        given="111"
        received="11"
        contributed="11"
        gains={11}
        submitted
      />
    </div>
  );
}

export function AvatarWithDeduction() {
  return (
    <div className="flex flex-col justify-center items-center space-y-24">
      <div className="grid grid-flow-row grid-cols-3 gap-8">
        <AvatarDeduction animal={"bear"} contributed="8" />
        <AvatarDeduction animal={"zebra"} contributed="0" />
        <AvatarDeduction animal={"rabbit"} contributed="-32" />

        <AvatarDeduction submitted animal={"bear"} contributed="8" />
        <AvatarDeduction submitted animal={"zebra"} contributed="0" />
        <AvatarDeduction submitted animal={"rabbit"} contributed="-32" />

        {/* Reward exists */}

        <AvatarDeduction
          animal={"walrus"}
          contributed="20"
          rewardExists
          added={0}
        />
        <AvatarDeduction
          animal={"whale"}
          contributed="5"
          rewardExists
          added={8}
        />
        <AvatarDeduction
          animal={"moose"}
          contributed="0"
          rewardExists
          added={240}
        />

        {/* Punishment exists */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          deducted={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          added={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          deducted={240}
        />

        {/* Reward and Punishment exists - ONLY ADDED */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          rewardExists
          added={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          rewardExists
          added={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          rewardExists
          added={240}
        />

        {/* Reward and Punishment exists - ONLY DEDUCTED */}

        <AvatarDeduction
          submitted
          animal={"walrus"}
          contributed="20"
          punishmentExists
          rewardExists
          deducted={0}
        />
        <AvatarDeduction
          submitted
          animal={"whale"}
          contributed="5"
          punishmentExists
          rewardExists
          deducted={8}
        />
        <AvatarDeduction
          submitted
          animal={"moose"}
          contributed="0"
          punishmentExists
          rewardExists
          deducted={240}
        />
      </div>
    </div>
  );
}
