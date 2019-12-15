import React, { Component } from 'react';
import * as Constants from '../constants/TimerState';

import Timer from './Timer.js';


export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            phase: Constants.POMODORO,
            duration: 60 * 5
        }
    }
    
    render() {
        return (
            <div className="timer-container">
                <header>
                    <h1>Puamodoro Timer</h1>
                    <Timer 
                        phase={this.state.phase}
                        duration={this.state.duration}
                    />
                </header>
            </div>
        );
    }
}

