import React, { Component } from 'react';

import Timer from './Timer.js';
import * as Constants from '../constants/TimerState';


export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            state: Constants.STOPPED,
            phase: Constants.POMODORO,
            duration: 60 * 5
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            duration: this.state.duration - 1
        })
    }
    
    render() {
        return (
            <div className="timer-container">
                <header>
                    <h1>Puamodoro Timer</h1>
                    <Timer 
                        duration={this.state.duration}
                    />
                </header>
            </div>
        );
    }
}

