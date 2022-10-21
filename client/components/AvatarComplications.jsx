import React from "react";
import { Deduct, DeductCancel } from "./assets/Assets";
import { Avatar } from "./Avatar";
import { Label } from "./Label";

export function AvatarScores({
  animal,
  gains,
  given = "",
  received = "",
  contributed = "",
  hints = false,
  submitted = false,
}) {
  let gainsColor = "gray";
  let gainsColorBorder = "border-gray-600";
  if (gains > 0) {
    gainsColor = "green";
    gainsColorBorder = "border-green-600";
  } else if (gains < 0) {
    gainsColor = "red";
    gainsColorBorder = "border-red-600";
  }

  const avatar = (
    <div className="w-42 flex items-center justify-baseline space-x-2">
      <div className="pt-5 pb-8 px-5 relative">
        <div className="w-16">
          <Avatar submitted={submitted} animal={animal} />
        </div>
        <div className="absolute top-0 right-full -mr-3.5 text-right">
          <Label color="purple" size="md" stroke shadow>
            {given}
          </Label>
        </div>
        <div className="absolute top-0 left-full -ml-[1.25rem]">
          <Label color="pink" size="md" stroke shadow>
            {received}
          </Label>
        </div>
        <div className="absolute bottom-0 left-0 w-full text-center">
          <Label color="yellow" size="md" stroke shadow>
            {contributed}
          </Label>
        </div>
      </div>
      <Label color={gainsColor} size="xl" stroke shadow>
        <div className="min-w-[3rem] text-right">{gains}</div>
      </Label>
    </div>
  );

  if (!hints) {
    return avatar;
  }

  return (
    <div className="pt-20 pb-20 px-24 relative">
      <div className="absolute w-28 text-right top-0 left-0">
        <Label color="purple" size="xs">
          Deductions Given
        </Label>
        <div className="absolute right-2 top-0 mt-14 h-6 w-0 border border-purple-600"></div>
      </div>
      <div className="absolute w-32 top-0 left-0 ml-44">
        <Label color="pink" size="xs">
          Deductions Received
        </Label>
        <div className="absolute left-2.5 top-0 mt-14 h-6 w-0 border border-pink-600"></div>
      </div>
      <div className="absolute w-32 bottom-0 ml-20 left-0 text-center">
        <Label color="orange" size="xs">
          Coins Contributed
        </Label>
        <div className="absolute left-1/2 bottom-0 mb-14 ml-0.5 h-6 w-0 border border-orange-600"></div>
      </div>

      <div className="absolute w-32 bottom-0 left-0 ml-56 text-left">
        <Label color={gainsColor} size="xs">
          Total round Gains/Losses
        </Label>
        <div
          className={`absolute left-4 ml-0.5  bottom-0 mb-14 h-12 w-0 border ${gainsColorBorder}`}
        ></div>
      </div>
      {avatar}
    </div>
  );
}

export function AvatarDeduction({
  animal,
  contributed = "",
  deducted = 0,
  active = false,
  submitted = false,
  onDeduct = () => {},
  onCancel = () => {},
}) {
  const avatar = (
    <div className="w-42">
      <div className="pt-5 pb-8 px-5 relative">
        <div className="w-16">
          <Avatar
            disabled={active && deducted > 0}
            submitted={submitted}
            animal={animal}
          />
        </div>
        {active && deducted > 0 && (
          <div className="absolute top-0 left-0 pb-2 w-full h-full flex justify-center items-center text-center">
            <Label color="purple" size="2xl" shadow>
              {deducted}
            </Label>
          </div>
        )}
        {active && (
          <button
            onClick={onDeduct}
            className="absolute w-6 top-0 left-full -ml-6 hover:-top-0.5 active:top-0.5 active:shadow-none"
          >
            <Deduct />
          </button>
        )}
        {active && deducted > 0 && (
          <button
            onClick={onCancel}
            className="absolute w-6 top-0 right-full -mr-6 text-right hover:-top-0.5 active:top-0.5 active:shadow-none"
          >
            <DeductCancel />
          </button>
        )}
        <div className="absolute -bottom-1 left-0 w-full text-center">
          <Label color="yellow" size="md" stroke shadow>
            {contributed}
          </Label>
        </div>
      </div>
    </div>
  );

  return avatar;
}
