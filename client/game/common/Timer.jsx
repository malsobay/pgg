import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";


class timer extends React.Component {
  render() {
    const { remainingSeconds } = this.props;
    var a = Math.floor(remainingSeconds / 60);
    var b = remainingSeconds % 60;

    return (
      <div>
        <h4>Timer</h4>
          {a}:{b < 10 && 0}
          {b}
      </div>
    );
  }
}

export default Timer = StageTimeWrapper(timer);
