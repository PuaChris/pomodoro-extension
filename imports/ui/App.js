import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import { UserData } from '../api/userData';

import AccountsUIWrapper from './AccountsUIWrapper';
import Timer from './Timer';
import TimerConfig from './TimerConfig';

// TODO: Implement MongoDB and check if a userID exists. If not, use local storage

export default class App extends Component{
    constructor(props){
        super(props);
        let _focusDuration, _shortBreakDuration, _longBreakDuration;
        let doc = UserData.findOne({ userName: Meteor.userId().username });
        if (doc) {
            _focusDuration = UserData.findOne({ _id : doc.id }, {fields: {'focusDuration':1}});
            _shortBreakDuration = UserData.findOne({ _id : doc.id }, {fields: {'shortBreakDuration':1}});
            _longBreakDuration = UserData.findOne({ _id : doc.id }, {fields: {'longBreakDuration':1}});
        }
        else {
            _focusDuration = localStorage.getItem('focusDurationInStorage') ? localStorage.getItem('focusDurationInStorage') : Constants.FOCUS_LENGTH;
            _shortBreakDuration = localStorage.getItem('shortBreakDurationInStorage') ? localStorage.getItem('shortBreakDurationInStorage') : Constants.SHORTBREAK_LENGTH;
            _longBreakDuration = localStorage.getItem('longBreakDurationInStorage') ? localStorage.getItem('longBreakDurationInStorage') : Constants.LONGBREAK_LENGTH;
        }

        this.state = {
            phase: Constants.FOCUS,
            numPomodoros: 0,
            focusDuration: _focusDuration,
            shortBreakDuration: _shortBreakDuration,
            longBreakDuration: _longBreakDuration,
            duration: Helper.minutesToSeconds(_focusDuration)   
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
        let doc = UserData.findOne({ userName: Meteor.userId().username });
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
                if (Meteor.userId()){
                    if (doc) {
                        UserData.update({_id : doc.id},
                            {$set:{
                                focusDuration : _focusDuration,
                                shortBreakDuration : _shortBreakDuration,
                                longBreakDuration : _longBreakDuration
                            }});
                        console.log("User found. Updating database.");
                    }
                    else {
                        UserData.insert({ 
                            userId : Meteor.userId(),
                            userName : Meteor.userId().username,
                            focusDuration : _focusDuration,
                            shortBreakDuration : _shortBreakDuration,
                            longBreakDuration : _longBreakDuration
                         })
                        console.log("Creating new entry in database.");
                    }
                }
            }
        });
        this.setState({
            focusDuration: _focusDuration ? _focusDuration : this.state.focusDuration,
            shortBreakDuration: _shortBreakDuration ? _shortBreakDuration : this.state.shortBreakDuration,
            longBreakDuration: _longBreakDuration ? _longBreakDuration : this.state.longBreakDuration
        });
        UserData.insert({
            userId: "test",
            userName: "testname"
        });
    }
    
    render() {
        return this.state && this.state.duration ? (
            <div className="timer-container">
                <h1>Puamodoro Timer</h1><br/>
                <AccountsUIWrapper />
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

