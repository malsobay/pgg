import React from "react";

import { createPortal } from "react-dom";

export function HelpModal({ done }) {
  return createPortal(
    <HelpContent done={done} />,
    document.querySelector("#modal-root")
  );
}

export function HelpContent({ done }) {
  return (
    <div
      className="z-50 h-screen w-screen fixed top-0 left-0 bg-white/70 p-20 flex justify-center"
      onClick={done}
    >
      <div className="relative bg-white rounded-lg shadow-lg border-8 border-orange-200 p-12 h-auto max-w-prose overflow-auto">
        <button
          onClick={done}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-300 text-white text-2xl flex justify-center items-center leading-none"
        >
          &times;
        </button>

        <div className="prose prose-slate prose-p:text-gray-500 prose-p:font-['Inter'] prose-headings:text-orange-600">
          <h1>Stages of the game</h1>
          Each round of the game has three stages:
          <ul>
            <li>
              <strong>Contribution:</strong> Each player decides how much of
              their grant money (20 coins each round) to contribute to the
              public fund. The public fund is then multiplied and divided
              equally among players.
            </li>
            <li>
              <strong>Outcome:</strong> The contributions and payoffs of each
              player are revealed.
            </li>
            <li>
              <strong>Summary:</strong> A summary of the round is presented,
              where you can mouse over an avatar to see details of that player's
              outcome.
            </li>
          </ul>
          <h1>Calculating payoffs from contributions:</h1>
          <p>
            The amount each player receives from the public fund contributions
            is equal to (Total coins contributed) * (Multiplier) / (Number of
            players)
          </p>
          <h1>Deducting from other players:</h1>
          <p>
            During the outcome stage, you will have the option to deduct coins
            from other players. To do so, you must pay N coins per deduction,
            and each deduction will take away N coins from the targeted player.
          </p>
          <h1>Calculating your total payoff for a single round:</h1>
          <p>
            The total coins you gain for the round are calculated as (Number of
            coins remaining from the grant for the round) + (Your share from the
            public fund) - (Cost of any deductions you placed on others) - (Any
            deductions other players placed on you)
          </p>
          <p>
            Your payoff for a single round is then added to the total coins in
            your piggy bank.
          </p>
        </div>
      </div>
    </div>
  );
}
