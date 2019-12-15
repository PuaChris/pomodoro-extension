import React, { Component } from 'react';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import TimerBtns from './TimerBtns';

export default class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            state: Constants.STOPPED,
            duration: this.props.duration,
            minutes: Math.floor(this.props.duration / 60),
            seconds: this.props.duration % 60
        }
        this.resume = this.resume.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
    }
    
    componentDidMount() {
        this.timerID = setInterval(() => this.timerController(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    timerController() {
        let state = this.state.state;
        let duration = this.state.duration;
        if (state === Constants.RESUME && duration > 0) {
            this.updateTimerValues(duration);
        }
        else if (duration <= 0) {
            this.updateTimerPhase();
            this.stop();
        }
    }

    updateTimerValues(duration) {
        this.setState({
            duration: duration - 1,
            minutes: Math.floor(duration / 60),
            seconds: duration % 60
        });           
    }

    updateTimerPhase() {
        let oldPhase = this.props.phase;
        if (oldPhase === Constants.POMODORO){
            this.props.updatePhaseToBreak();
        }
        else {
            this.props.updatePhaseToPomodoro();
        }
    }

    // Button state controllers
    resume() {
        this.setState({
            state: Constants.RESUME
        });
        if (this.timerID == null) this.timerID = setInterval(() => this.timerController(), 1000);
    }

    pause() {
        if (this.timerID != null){
            clearInterval(this.timerID);
            this.timerID = null;
        } 
        this.setState({
            state: Constants.PAUSED
        });
    }

    stop() {
        if (this.timerID != null){
            clearInterval(this.timerID);
            this.timerID = null;
        } 
        this.setState({
            state: Constants.STOPPED,
        });
        this.updateTimerValues(this.props.duration);
    }

    render() {
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;
        return (
            <div>
                <h1>
                    {minutes}:{ (seconds < 10) ? "0" + seconds : seconds }  
                </h1>
                <TimerBtns
                    resume={this.resume}
                    pause={this.pause}
                    stop={this.stop}
                />
            </div>
        )
    }
}