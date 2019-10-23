import React, { Component } from 'react'
import Timer from './Timer.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            pomodoroTime: 25,
            shortBreakTime: 5,
            longBreakTime: 30,
            numShortBreaks: 0,
            timerType: "pomodoro",
            isFinished: true
        }

        // * No need to bind if using the Javascript function syntax (?)
        // this.pomodoroHandler = this.pomodoroHandler.bind(this);
        // this.shortBreakHandler = this.shortBreakHandler.bind(this);
        // this.longBreakHandler = this.longBreakHandler.bind(this);
    }

    decrementMinute = () => {
        this.setState({
            minutes: this.state.minutes - 1
        });
    }

    pomodoroHandler = () => {
        this.setState({
            minutes: this.state.pomodoroTime
        });
        
    }

    render() {
        return (
            <div className="Pomodoro">
                <Timer  minutes={this.state.minutes}
                        decrementMinute={this.decrementMinute}
                        pomodoroHandler={this.pomodoroHandler}
                        timerType={this.state.timerType}
                        isFinished={this.state.isFinished} 
                        // TODO: Complete and pass on additional handlers
                        />
            </div>
        )
    }
}


export default App
