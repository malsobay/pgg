import React from "react";
import ReactModal from "react-modal";

function playerLeft(player) {
    player.set("exited", true)
    player.exit("idleTimedOut");
}

const warningTime = 15;
const idleTimeDifferentTab = 25;

export default class IdleToast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime : warningTime, 
            idle : false, 
            delayStarted : false, 
            delayID: "", 
            clockID: "",
            lastActive: ""
        }
    }

    beginCountDown(stage) {
        const lastActivity = this.state.lastActive;

        if( (lastActivity + (warningTime + idleTimeDifferentTab)*1000) < (Date.parse(stage.startTimeAt) + stage.durationInSeconds * 1000) ){
            return(
                <ReactModal 
                        isOpen={true}
                        style={{
                            overlay: {
                            top: 55,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(93, 93, 93, 0.75)'
                            },
                            content: {
                            top: '270px',
                            left: '300px',
                            right: '300px',
                            bottom: '300px',
                            padding: '20px'
                            }
                        }}> 
                        <p style={{fontSize: '15px'}}>
                            You are idle. Please indicate your presence by returning to this screen, clicking the button, and 
                            maintaining mouse and keyboard activity. You will be logged out in {this.state.remainingTime} seconds.
                        </p> 
                        <button onClick={this.changeIdleFalse}> I'm Active </button>
                    </ReactModal>

            )
        }
        else {
            return null; 
        }
    };

    decrTime = () => {
        const { player } = this.props;
        if (!(this.state.remainingTime <= 0)) {
            this.setState({remainingTime : this.state.remainingTime - 1})
        } else {
            playerLeft(player);
        }
    }

    changeIdleTrueDelay = () => {
        if (!this.state.delayStarted && !this.state.idle) {
            this.setState({
                delayStarted : true, 
                delayID : setTimeout(
                    () => {
                        this.setState({ 
                            idle : true,
                            clockID: setInterval(this.decrTime, 1000),
                        })
                        this.stopDelay()
                    },
                    idleTimeDifferentTab * 1000),
                lastActive: new Date().getTime()
            })
        } 
    }

    stopDelay = () => {
        if (this.state.delayStarted) {
            clearTimeout(this.state.delayID);
            this.setState({ 
                delayStarted : false, 
                delayID: "", 
            })
        }
    }

    changeIdleFalse = () => {
        clearTimeout(this.state.clockID);
        this.setState({
            idle : false, 
            remainingTime : warningTime,
            lastActive: new Date().getTime()
        })
    }

    render() {
        const { player, stage } = this.props;
        if (player !== undefined) {
            (player.idle) ? 
                this.changeIdleTrueDelay() : this.stopDelay()
        } 
        return (
            <div> 
                {this.state.idle ?  
                    this.beginCountDown(stage)
                    : null }
            </div> 
        )
    }
}