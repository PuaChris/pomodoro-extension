import React, { Component } from 'react'
import Timer from './Timer.js'

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pomodoroTime: 25,
            shortBreakTime: 5,
            longBreakTime: 30,
            numShortBreaks: 0,
            isShortBreak: false,
            isLongBreak: false
        }

    }


    render() {
        if (this.state.isShortBreak){
            return (
                <div className="Pomodoro">
                    <Timer minutes={this.state.shortBreakTime}/>
                </div>
            )
        }

        else if (this.state.isLongBreak){
            return (
                <div className="Pomodoro">
                    <Timer minutes={this.state.longBreakTime}/>
                </div>
            )
        }

        else {
            return (
                <div className="Pomodoro">
                    <Timer minutes={this.state.pomodoroTime}/>
                </div>
            )
        }
    }
}

export default Pomodoro


/*
When timer is finished, how does the child component
let the parent component it's finished?

*/