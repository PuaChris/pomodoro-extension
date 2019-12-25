import React, { Component } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
require("firebase/firestore");

import { db } from '../api/Context';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import Timer from './Timer';

export default class App extends Component{
    constructor(props){
        super(props);
        this.data;

        this.state = {
            phase: Constants.FOCUS,
            duration: 3,
            numPomodoros: 0
        }

        this.updatePhaseToFocus = this.updatePhaseToFocus.bind(this);
        this.updatePhaseToBreak = this.updatePhaseToBreak.bind(this);
        this.updateNumPomodoros = this.updateNumPomodoros.bind(this);

        db.collection("context").doc("test").set({
            UserEmail: "testemail.com",
            FocusLength: 25,
            ShortBreakLength: 5,
            LongBreakLength: 15,
            PomodorosHistory: {
                Date: new Date()
            }
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    componentDidMount() {
        var data = db.collection("context").where("UserEmail", "==", Constants.USERID).get()
        .then(QuerySnapShot => {
            const data = QuerySnapShot.docs.map(doc => doc.data());
            console.log(data); // array of cities objects
            let UserEmail = data[0].UserEmail;
            let FocusLength = data[0].FocusLength; 

            this.setState({
                duration: FocusLength
            });
        });
    }

    updatePhaseToFocus() {
        this.setState({
            phase: Constants.FOCUS,
            duration: Helper.minutesToSeconds(69)
        });
    }

    updatePhaseToBreak() {
        this.updateNumPomodoros();
        let numPomodoros = this.state.numPomodoros;
        if (numPomodoros % Constants.NUM_POMODOROS_BEFORE_LONGBREAK === 0 && numPomodoros > 0) {
            this.setState({
                phase: Constants.LONGBREAK,
                duration: Helper.minutesToSeconds(Constants.LONGBREAK_LENGTH)
            });
        }
        else {
            this.setState({
                phase: Constants.SHORTBREAK,
                duration: Helper.minutesToSeconds(Constants.SHORTBREAK_LENGTH)
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
                        updatePhaseToFocus={this.updatePhaseToFocus}
                        updatePhaseToBreak={this.updatePhaseToBreak}
                    />
                    <h2>Phase: {this.state.phase}</h2>
                </header>
            </div>
        );
    }
}

