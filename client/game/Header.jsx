import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";
import { Header } from "../components/Header";

export function HeaderWithTimer({ remainingSeconds }) {
  var min = Math.floor(remainingSeconds / 60);
  var sec = remainingSeconds % 60;

  return (
    <Header
      left="Round 1"
      showPiggyBank
      piggyBankAmount={20}
      timerMinutes={`${min < 10 ? "0" : ""}${min}`}
      timerSeconds={`${sec < 10 ? "0" : ""}${sec}`}
      right="Help"
      rightOnClick={() => alert("click")}
    />
  );
}

const HeaderHeader = StageTimeWrapper(HeaderWithTimer);
export default HeaderHeader;
