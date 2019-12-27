import React, { Component } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
require("firebase/firestore");

import { db } from '../api/Context';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import Timer from './Timer';
import TimerConfig from './TimerConfig';


// TODO: Send the data back to firestore
// TODO: Have to check if user exists in db already

export default class App extends Component{
    constructor(props){
        super(props);
        db.collection("context").where("UserEmail", "==", Constants.USERID).get()
        .then(QuerySnapShot => {
            let UserData = QuerySnapShot.docs.map(doc => doc.data());
            if (UserData) {
                this.setState({
                    focusLength: UserData[0].FocusLength,
                    shortBreakLength: UserData[0].ShortBreakLength,
                    longBreakLength: UserData[0].LongBreakLength,
                    phase: Constants.FOCUS,
                    duration: Helper.minutesToSeconds(UserData[0].FocusLength),
                    numPomodoros: 0,
                    isContextModified: false
                });
            }
            else {
                this.setState({
                    userData: null,
                    phase: Constants.FOCUS,
                    duration: Constants.FOCUS_LENGTH,
                    numPomodoros: 0
                });
            }
        });
        this.updateTimerConfig = this.updateTimerConfig.bind(this);
        this.updatePhaseToFocus = this.updatePhaseToFocus.bind(this);
        this.updatePhaseToBreak = this.updatePhaseToBreak.bind(this);
        this.updateNumPomodoros = this.updateNumPomodoros.bind(this);
    }

    updateTimerConfig = (e) => {
        switch (e.target.id) {
            case "focus_input":
                this.setState({
                    focusLength: e.target.value,
                    isContextModified: true
                });
                // TODO: get specific document id here
                db.collection("context").doc("test").update({FocusLength: this.state.focusLength});
                console.log("Focus: " + this.state.focusLength);
                break;
            case "short_break_input":
                this.setState({
                    shortBreakLength: e.target.value,
                    isContextModified: true
                });
                db.collection("context").doc("test").update({ShortBreakLength: this.state.shortBreakLength});
                console.log("Short Break: " + this.state.shortBreakLength);
                break;
            case "long_break_input":
                this.setState({
                    longBreakLength: e.target.value,
                    isContextModified: true
                });
                db.collection("context").doc("test").update({LongBreakLength: this.state.longBreakLength});
                console.log("Long Break: " + this.state.longBreakLength);
                break;
        }
    }

    updatePhaseToFocus() {
        if (this.state) {
            this.setState({
                phase: Constants.FOCUS,
                duration: Helper.minutesToSeconds(this.state.focusLength)
            });
        }
        else {
            this.setState({
                phase: Constants.FOCUS,
                duration: Helper.minutesToSeconds(Constants.FOCUS_LENGTH)
            });
        }
    }

    updatePhaseToBreak() {
        this.updateNumPomodoros();
        let numPomodoros = this.state.numPomodoros;
        if (numPomodoros % Constants.NUM_POMODOROS_BEFORE_LONGBREAK === 0 && numPomodoros > 0) {
            if (this.UserData != null) {
                this.setState({
                    phase: Constants.LONGBREAK,
                    duration: Helper.minutesToSeconds(this.state.longBreakLength)
                });
            }
            else {
                this.setState({
                    phase: Constants.LONGBREAK,
                    duration: Helper.minutesToSeconds(Constants.LONGBREAK_LENGTH)
                });
            }
        }
        else {
            if (this.UserData != null) {
                this.setState({
                    phase: Constants.SHORTBREAK,
                    duration: Helper.minutesToSeconds(this.state.shortBreakLength)
                });
            }
            else {
                this.setState({
                    phase: Constants.SHORTBREAK,
                    duration: Helper.minutesToSeconds(Constants.SHORTBREAK_LENGTH)
                });
            }
        }
    }

    updateNumPomodoros() {
        this.setState({
            numPomodoros: this.state.numPomodoros + 1
        });
    }
    
    render() {
        return this.state && this.state.duration ? (
            <div className="timer-container">
                <header>
                    <h1>Puamodoro Timer</h1>
                    <Timer 
                        phase={this.state.phase}
                        duration={this.state.duration}
                        updatePhaseToFocus={this.updatePhaseToFocus}
                        updatePhaseToBreak={this.updatePhaseToBreak}
                    />
                    <h2>Phase: {this.state.phase}</h2>
                    <TimerConfig
                        focusLength={this.state.focusLength}
                        shortBreakLength={this.state.shortBreakLength}
                        longBreakLength={this.state.longBreakLength}
                        updateTimerConfig={this.updateTimerConfig}
                    />
                </header>
            </div>
        ) : <span>Loading...</span>;
    }
}

