import React, { Component } from 'react';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import Timer from './Timer.js';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            phase: Constants.POMODORO,
            duration: Helper.minutesToSeconds(Constants.POMODORO_VALUE),
            numPomodoros: 0
        }
        this.updatePhaseToPomodoro = this.updatePhaseToPomodoro.bind(this);
        this.updatePhaseToBreak = this.updatePhaseToBreak.bind(this);
        this.updateNumPomodoros = this.updateNumPomodoros.bind(this);
    }

    updatePhaseToPomodoro() {
        this.setState({
            phase: Constants.POMODORO,
            duration: Helper.minutesToSeconds(Constants.POMODORO_VALUE)
        });
    }

    updatePhaseToBreak() {
        this.updateNumPomodoros();
        let numPomodoros = this.state.numPomodoros;
        if (numPomodoros % Constants.NUM_POMODOROS_BEFORE_LONGBREAK === 0 && numPomodoros > 0) {
            this.setState({
                phase: Constants.LONGBREAK,
                duration: Helper.minutesToSeconds(Constants.LONGBREAK_VALUE)
            });
        }
        else {
            this.setState({
                phase: Constants.SHORTBREAK,
                duration: Helper.minutesToSeconds(Constants.SHORTBREAK_VALUE)
            });
        }
    }

    updateNumPomodoros() {
        this.setState({
            numPomodoros: this.state.numPomodoros + 1
        });
    }
    
    render() {
        return (
            <div className="timer-container">
                <header>
                    <h1>Puamodoro Timer</h1>
                    <Timer 
                        phase={this.state.phase}
                        duration={this.state.duration}
                        updatePhaseToPomodoro={this.updatePhaseToPomodoro}
                        updatePhaseToBreak={this.updatePhaseToBreak}
                    />
                </header>
            </div>
        );
    }
}

