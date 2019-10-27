import React, { Component } from 'react'
import Timer from './Timer.js'
import * as Constants from './constants'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            pomodoroTime: 1,
            shortBreakTime: 5,
            longBreakTime: 30,
            numShortBreaks: 0,
            // timerStates: ["Pomodoro", "ShortBreak", "LongBreak"],
            timerType: Constants.POMODORO,
            isFinished: true
        }
    }



    changeTimerType = () => {
        if (this.state.isFinished){
            if (this.state.timerType === Constants.POMODORO){

                // Assume 4 cycles are needed to go into long break
                if (this.state.numShortBreaks % 4 === 0){
                    this.setState({
                        timerType: Constants.LONGBREAK
                    })
                }
    
                // Short Break
                else {
                    this.setState({
                        timerType: Constants.SHORTBREAK
                    })
                }
            }
    
            // Must be in one of the two break states
            else {
    
            }
    
            this.setState({
                isFinished: false
            })
        }   
    }

    decrementMinute = () => {
        this.setState({
            minutes: this.state.minutes - 1
        });
    }

    setTimer = () => {
        // Pomodoro State
        if (this.state.timerType === Constants.POMODORO){
            this.setState({
                minutes: this.state.pomodoroTime
            }); 
        }  
        
        // Short Break State
        else if (this.state.timerType === Constants.SHORTBREAK){
            this.setState({
                minutes: this.state.shortBreakTime
            }); 
        }

        // Long Break State
        else if (this.state.timerType === Constants.LONGBREAK){
            this.setState({
                minutes: this.state.longBreakTime
            }); 
        }
    }

    render() {
        return (
            <div className="Pomodoro">
                <Timer  
                    minutes={this.state.minutes}
                    decrementMinute={this.decrementMinute}
                    setTimer={this.setTimer}
                    changeTimerType={this.changeTimerType}
                    timerType={this.state.timerType}
                    isFinished={this.state.isFinished} />
            </div>
        )
    }
}


export default App
