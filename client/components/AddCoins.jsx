import React from "react";
import { Arrow, Coin } from "./assets/Assets";
import { Bowl } from "./Bowl";
import { Button } from "./FunButton";
import { Label } from "./Label";

export function AddCoins({
  header,
  submittedText,
  footer,
  purse,
  contributed,
  multiplier,
  onClick,
  allOrNothing = false,
  allOrNothingAmount = 0,
  onSubmit = () => console.log("I'm done"),
  submitted = false,
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-sm">
      {!submitted && (
        <Label color="orange" size="md" snug>
          {header}
        </Label>
      )}
      {!submitted && <AddCoinsPurse amount={purse - contributed} />}
      {!submitted &&
        (allOrNothing ? (
          <AddCoinsAllOrNothingArrows
            amount={allOrNothingAmount}
            canAdd={purse - contributed > 0}
            canRemove={contributed > 0}
            onClick={onClick}
          />
        ) : (
          <AddCoinsArrows
            canAdd1={purse - contributed > 0}
            canAdd10={purse - contributed > 9}
            canRemove1={contributed > 0}
            canRemove10={contributed > 9}
            onClick={onClick}
          />
        ))}
      <div className="xl:w-44 2xl:w-52 pt-8">
        <Bowl money={contributed} multiplier={multiplier} />
      </div>
      {!submitted && <Button onClick={onSubmit}>I'm done</Button>}
      {submitted && (
        <div className="pt-8">
          <Label color="gray" size="md" snug>
            {submittedText}
          </Label>
        </div>
      )}
      {!submitted && (
        <div className="pt-8">
          <Label color="orange" size="md" snug>
            {footer}
          </Label>
        </div>
      )}
    </div>
  );
}

export function AddCoinsPurse({ amount }) {
  return (
    <div className="flex h-24 overflow-hidden items-center">
      <div className="w-24 relative top-5">
        <Coin />
      </div>
      <Label color="yellow" size="2xl" stroke>
        {amount}
      </Label>
    </div>
  );
}

export function AddCoinsArrows({
  canAdd1 = false,
  canAdd10 = false,
  canRemove1 = false,
  canRemove10 = false,
  onClick,
}) {
  return (
    <div className="h-24 2xl:h-48 flex items-center space-x-4">
      <AddButton
        amount={10}
        disabled={!canRemove10}
        onClick={() => onClick(-10)}
        dark
      />
      <AddButton
        amount={1}
        disabled={!canRemove1}
        onClick={() => onClick(-1)}
      />
      <div className="w-4 relative flex justify-center pointer-events-none">
        <div className="absolute -top-16 2xl:-top-24 w-32 2xl:w-44 shrink-0 rotate-180">
          <Arrow></Arrow>
        </div>
      </div>
      <AddButton
        amount={1}
        disabled={!canAdd1}
        onClick={() => onClick(1)}
        down
      />
      <AddButton
        amount={10}
        disabled={!canAdd10}
        onClick={() => onClick(10)}
        down
        dark
      />
    </div>
  );
}

export function AddCoinsAllOrNothingArrows({
  amount,
  canAdd,
  canRemove,
  onClick,
}) {
  console.log(amount);
  return (
    <div className="h-24 2xl:h-48 flex items-center space-x-4">
      <AddButton
        amount={amount}
        disabled={!canRemove}
        onClick={() => onClick(-amount)}
        dark
        freeWidth
      />
      <div className="w-4 relative flex justify-center pointer-events-none">
        <div className="absolute -top-16 2xl:-top-20 w-32 2xl:w-44 shrink-0 rotate-180">
          <Arrow></Arrow>
        </div>
      </div>
      <AddButton
        amount={amount}
        disabled={!canAdd}
        onClick={() => onClick(amount)}
        down
        dark
        freeWidth
      />
    </div>
  );
}

function AddButton({
  amount,
  down = false,
  dark = false,
  freeWidth = false,
  disabled,
  onClick,
}) {
  let className =
    "h-14 relative flex items-center justify-center rounded-md outline outline-4 shadow-none";

  if (!freeWidth) {
    className += " w-14";
  } else {
    className += " px-4 space-x-2";
  }

  if (!disabled) {
    className = `${className} hover:-top-0.5 hover:shadow-[0_8px_0px_0px_rgba(0,0,0,.25)] active:top-0.5 active:shadow-none`;
  }

  if (dark) {
    if (disabled) {
      className = `${className} bg-gray-200 outline-gray-300`;
    } else {
      className = `${className} bg-yellow-600 outline-orange-700`;
    }
  } else {
    if (disabled) {
      className = `${className} bg-gray-200/70 outline-gray-300/70`;
    } else {
      className = `${className} bg-yellow-500 outline-orange-600`;
    }
  }

  let arrowClass = "w-8 h-8 shrink-0";
  if (down) {
    arrowClass = `${arrowClass} transform rotate-180`;
  }

  if (!freeWidth) {
    arrowClass += " -ml-2";
  } else {
    arrowClass += " -ml-4";
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <div className={arrowClass}>
        <Arrow color="white" full />
      </div>
      <div className="w-8 flex justify-center shrink-0 -ml-2">
        <Label color="white" size="lg" tight>
          {amount}
        </Label>
      </div>
    </button>
  );
}
