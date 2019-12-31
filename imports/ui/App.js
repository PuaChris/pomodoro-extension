import React, { Component } from 'react';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import Timer from './Timer';
import TimerConfig from './TimerConfig';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            phase: Constants.FOCUS,
            numPomodoros: 0,
            focusDuration: localStorage.getItem('focusDurationInStorage') ? localStorage.getItem('focusDurationInStorage') : Constants.FOCUS_LENGTH,
            shortBreakDuration: localStorage.getItem('shortBreakDurationInStorage') ? localStorage.getItem('shortBreakDurationInStorage') : Constants.SHORTBREAK_LENGTH,
            longBreakDuration: localStorage.getItem('longBreakDurationInStorage') ? localStorage.getItem('longBreakDurationInStorage') : Constants.LONGBREAK_LENGTH,
            duration: Helper.minutesToSeconds(localStorage.getItem('focusDurationInStorage') ? localStorage.getItem('focusDurationInStorage') : Constants.FOCUS_LENGTH)   
        }

        this.updatePhaseToFocus = this.updatePhaseToFocus.bind(this);
        this.updatePhaseToBreak = this.updatePhaseToBreak.bind(this);
        this.updateNumPomodoros = this.updateNumPomodoros.bind(this);
        this.updateTimerConfig = this.updateTimerConfig.bind(this);
    }

    updatePhaseToFocus() {
        this.setState({
            phase: Constants.FOCUS,
            duration: Helper.minutesToSeconds(this.state.focusDuration)
        });
    }

    updatePhaseToBreak() {
        this.updateNumPomodoros();
        let numPomodoros = this.state.numPomodoros;
        if (numPomodoros % Constants.NUM_POMODOROS_BEFORE_LONGBREAK === 0 && numPomodoros > 0) {
            this.setState({
                phase: Constants.LONGBREAK,
                duration: Helper.minutesToSeconds(this.state.longBreakDuration)
            });
        }
        else {
            this.setState({
                phase: Constants.SHORTBREAK,
                duration: Helper.minutesToSeconds(this.state.shortBreakDuration)
            });
        }
    }

    updateNumPomodoros() {
        this.setState({
            numPomodoros: this.state.numPomodoros + 1
        });
    }
    
    updateTimerConfig(event) {
        let durationValues = [...(event.target)];
        let _focusDuration, _shortBreakDuration, _longBreakDuration
        durationValues.forEach(function(element) {
            if (element.type != "submit") {
                switch (element.id) {
                    case "focus_duration":
                        _focusDuration = element.value;
                        localStorage.setItem('focusDurationInStorage', element.value);
                        break;
                    case "short_break_duration":
                        _shortBreakDuration = element.value;
                        localStorage.setItem('shortBreakDurationInStorage', element.value);
                        break;
                    case "long_break_duration":
                        _longBreakDuration = element.value;
                        localStorage.setItem('longBreakDurationInStorage', element.value);
                        break;
                }
            }
        });
        this.setState({
            focusDuration: _focusDuration ? _focusDuration : this.state.focusDuration,
            shortBreakDuration: _shortBreakDuration ? _shortBreakDuration : this.state.shortBreakDuration,
            longBreakDuration: _longBreakDuration ? _longBreakDuration : this.state.longBreakDuration
        });
    }
    
    render() {
        return this.state && this.state.duration ? (
            <div className="timer-container">
                <h1>Puamodoro Timer</h1><br/>
                <h1>Phase: {this.state.phase}</h1>
                <Timer 
                    phase={this.state.phase}
                    duration={this.state.duration}
                    updatePhaseToFocus={this.updatePhaseToFocus}
                    updatePhaseToBreak={this.updatePhaseToBreak}
                />
                <TimerConfig
                    focusDuration={this.state.focusDuration}
                    shortBreakDuration={this.state.shortBreakDuration}
                    longBreakDuration={this.state.longBreakDuration}
                    updateTimerConfig={this.updateTimerConfig}
                />
            </div>
        ) : <span>Loading...</span>;
    }
}

