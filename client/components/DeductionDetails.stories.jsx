import React from "react";
import { DeductionDetails } from "./DeductionDetails";

export function MyDeductionDetails() {
  return (
    <div className="flex space-x-4">
      <DeductionDetails
        animal="sloth"
        submitted
        contributed={12}
        gains={-8}
        deductionsSpent={[
          { animal: "whale", amount: 8 },
          { animal: "parrot", amount: 2 },
        ]}
        deductionsReceived={[
          { animal: "whale", amount: 8 },
          { animal: "dog", amount: 88 },
          { animal: "moose", amount: 18 },
        ]}
      />
      <DeductionDetails
        animal="giraffe"
        contributed={12}
        gains={8}
        deductionsSpent={[]}
        deductionsReceived={[]}
      />
    </div>
  );
}
