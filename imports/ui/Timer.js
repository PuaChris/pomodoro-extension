import React, { Component } from 'react';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import TimerBtns from './TimerBtns';

export default class Timer extends Component {
    constructor(props){
        super(props);

        if (this.props.duration === NaN) {
            throw new Error("Duration value is NaN");
        }
        this.state = {
            timerState: Constants.STOPPED,
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
        let timerState = this.state.timerState;
        let duration = this.state.duration;
        if (timerState === Constants.RESUME && duration > 0) {
            this.updateTimerValues(duration);
        }
        else if (duration <= 0) {
            this.updateTimerPhase();
            this.stop();
        }
    }

    updateTimerValues(duration) {
        if (duration === NaN) {
            throw new Error("Duration value is NaN");
        }
        this.setState({
            duration: duration - 1,
            minutes: Math.floor(duration / 60),
            seconds: duration % 60
        });           
    }

    updateTimerPhase() {
        let oldPhase = this.props.phase;
        if (oldPhase === Constants.FOCUS){
            this.props.updatePhaseToBreak();
        }
        else {
            this.props.updatePhaseToFocus();
        }
    }

    // Button state controllers
    resume() {
        this.setState({
            timerState: Constants.RESUME
        });
        if (this.timerID == null) this.timerID = setInterval(() => this.timerController(), 1000);
    }

    pause() {
        if (this.timerID != null){
            clearInterval(this.timerID);
            this.timerID = null;
        } 
        this.setState({
            timerState: Constants.PAUSED
        });
    }

    stop() {
        if (this.timerID != null){
            clearInterval(this.timerID);
            this.timerID = null;
        } 
        this.setState({
            timerState: Constants.STOPPED,
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