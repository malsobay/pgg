import React from "react";
import { Avatar } from "./Avatar";
import { Label } from "./Label";

export function DeductionDetails({
  animal,
  submitted = false,
  contributed,
  gains,
  punishmentExists,
  deductionsSpent,
  deductionsReceived,
  rewardExists,
  rewardsSpent,
  rewardsReceived,
  isSelf,
  showPunishmentId,
  showRewardId
}) {
  const totalDeductionsSpent = deductionsSpent.reduce(
    (sum, deduction) => sum + deduction.amount,
    0
  );
  const totalDeductionsReceived = deductionsReceived.reduce(
    (sum, deduction) => sum + deduction.amount,
    0
  );

  const totalRewardsSpent = rewardsSpent.reduce(
    (sum, reward) => sum + reward.amount,
    0
  );
  const totalRewardsReceived = rewardsReceived.reduce(
    (sum, reward) => sum + reward.amount,
    0
  );

  return (
    <div className="font-mono w-96 p-4 border-2 border-gray-300 bg-white rounded-xl shadow-lg">
      <Label color="gray" size="sm">
        <div className="capitalize font-sans">{animal}</div>
      </Label>

      <div className="mt-4 grid grid-cols-12 grid-rows-1 w-full items-center">
        <div className="col-span-3">
          <div className="w-16">
            <Avatar animal={animal} submitted={submitted} />
          </div>
        </div>
        <div className="col-span-9">
          <table className="w-full">
            <tbody>
              <tr className="text-purple-600">
                <td className="">Coins Contributed</td>
                <td className="font-bold text-right">{contributed}</td>
              </tr>
              <tr className={gains >= 0 ? "text-green-600" : "text-red-600"}>
                <td className="">Round Gains/Losses</td>
                <td className="font-bold text-right">{gains}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {punishmentExists && (
        <>
          <div className="mt-8 flex justify-between text-orange-600 border-b border-orange-600">
            <div className="">Coins spent on deductions</div>
            <div className="font-bold text-right">{totalDeductionsSpent}</div>
          </div>

          {(isSelf || showPunishmentId) && (
            <IndividualDeductions deductions={deductionsSpent} />
          )}

          <div className="mt-6 flex justify-between text-orange-600 border-b border-orange-600">
            <div className="">Coins deducted by other players</div>
            <div className="font-bold text-right">
              {totalDeductionsReceived}
            </div>
          </div>

          {showPunishmentId && (
            <IndividualDeductions deductions={deductionsReceived} />
          )}
        </>
      )}

      {rewardExists && (
        <>
          <div className="mt-8 flex justify-between text-orange-600 border-b border-orange-600">
            <div className="">Coins spent on rewards</div>
            <div className="font-bold text-right">{totalRewardsSpent}</div>
          </div>

          {(isSelf || showRewardId) && (
            <IndividualDeductions deductions={rewardsSpent} />
          )}

          <div className="mt-6 flex justify-between text-orange-600 border-b border-orange-600">
            <div className="">Coins rewarded by other players</div>
            <div className="font-bold text-right">{totalRewardsReceived}</div>
          </div>

          {showRewardId && (
            <IndividualDeductions deductions={rewardsReceived} />
          )}
        </>
      )}
    </div>
  );
}

function IndividualDeductions({ deductions }) {
  if (deductions.length === 0) {
    return <div className="mt-4 text-gray-400">None</div>;
  }

  return (
    <div className="mt-4">
      {deductions.map((deduction) => (
        <div key={deduction.animal} className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-5 mr-3">
              <Avatar animal={deduction.animal} />
            </div>
            <div className="capitalize">{deduction.animal}</div>
          </div>
          <div className="font-bold text-right">{deduction.amount}</div>
        </div>
      ))}
    </div>
  );
}
