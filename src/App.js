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
            timerStates: ["Pomodoro", "ShortBreak", "LongBreak"],
            timerType: "Pomodoro",
            isFinished: true
        }

        // * No need to bind if using the Javascript function syntax (?)
        // this.pomodoroHandler = this.pomodoroHandler.bind(this);
        // this.shortBreakHandler = this.shortBreakHandler.bind(this);
        // this.longBreakHandler = this.longBreakHandler.bind(this);
    }

    changeTimerType = () => {
        if (this.state.timerType === this.state.timerStates[0] && this.state.isFinished){
            if (this.state.numShortBreaks % 4 === 0){
                this.setState({
                    timerType: this.state.timerStates[2]
                })
            }
            else {
                this.setState({
                    timerType: this.state.timerStates[1]
                })
            }
        }
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
                        timerStates={this.state.timerStates}
                        timerType={this.state.timerType}
                        isFinished={this.state.isFinished} 
                        // TODO: Complete and pass on additional handlers
                        />
            </div>
        )
    }
}


export default App
