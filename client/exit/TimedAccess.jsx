import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import Countdown from 'react-countdown';


export default class TimedAccess extends React.Component {
  render() {
    // Not sure what icon works best:
    // - SMALL_CROSS
    // - BAN_CIRCLE
    // - ERROR
    // - DISABLE
    // - WARNING_SIGN
    return (
      <NonIdealState
        icon={IconNames.ISSUE}
        title="No experiments available"
        description={
          <div>
            <p>
              There are currently no available experiments. The next batch of experiments will be available in:
            </p>
            <h1><Countdown date={1681300347000} /></h1>
            <h2>at 1:00 PM ET on Friday, April 9th 2023</h2>
          </div>
        }
      />
    );
  }
}

