import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import Countdown from 'react-countdown';
import { experimentDate } from "../../constants";

export default class NoBatchesAvailable extends React.Component {
  render() {
    // Not sure what icon works best:
    // - SMALL_CROSS
    // - BAN_CIRCLE
    // - ERROR
    // - DISABLE
    // - WARNING_SIGN
    return (
      <div style={{marginTop:"5em"}}>
      <NonIdealState
        icon={IconNames.ISSUE}
        title="No experiments available"
        description={
          <div style={{width:"100%"}}>
            <p>
              Today's games have all been completed. <strong>Please return the task,</strong> and keep an eye out for notifications about future sessions. 
            </p>
          </div>
        }
      />
      </div>
    );
  }
}

