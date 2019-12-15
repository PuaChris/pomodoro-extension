import React, { Component } from 'react';
import * as Constants from '../constants/TimerState';
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
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // Update duration every second 
    tick() {
        let state = this.state.state;
        let duration = this.state.duration;
        if (state === Constants.RESUME && duration > 0) {
            this.setState({
                duration: this.state.duration - 1,
                minutes: Math.floor(this.state.duration / 60),
                seconds: this.state.duration % 60
            });                
        }
    }

    // Button state controllers
    resume() {
        this.setState({
            state: Constants.RESUME
        });
    }

    pause() {
        this.setState({
            state: Constants.PAUSED
        });
    }

    stop() {
        this.setState({
            state: Constants.STOPPED
        });
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