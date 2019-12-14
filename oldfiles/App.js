import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { TimerCollection } from '../api/timerCollection.js';

import Timer from './Timer.js';
import * as Constants from '../constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            pomodoroTime: 1,
            shortBreakTime: 2,
            longBreakTime: 3,
            numPomodoros: 0,
            numShortBreaks: 0,
            timerType: Constants.POMODORO,
            isFinished: true
        }
    }

    startTimer = () => {
        this.setState({
            isFinished: false
        })
    }

    endTimer = () => {
        this.setState({
            isFinished: true
        })
    }

    changeTimerType = () => {
        if (this.state.timerType === Constants.POMODORO){

            // TODO: Only increment pomdoros and short breaks when the timer 
            // TODO: actually finishes, not when the user changes states
            this.setState({
                numPomodoros: this.state.numPomodoros + 1
            })

            // Assume 4 cycles are needed to go into long break
            if (this.state.numPomodoros > 0 && this.state.numPomodoros % 4 === 0){
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
        // * If user wants to go into POMODORO state, this still works out
        // * because it first goes into a break state before reading the 
        // * new state set by the user
        else {

            if (this.state.timerType === Constants.SHORTBREAK){
                this.setState({
                    numShortBreaks: this.state.numShortBreaks + 1
                })
            }
            this.setState({
                timerType: Constants.POMODORO
            })
        }

        this.setTimer(); 
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

        // State change error catch
        else {
            this.setState({
                minutes: -69
            }); 
        }
    }

    renderTimer() {
        
        return this.props.timerContext.map((context) => (
            <Timer 
                key={context._id} 
                minutes={context.minutes}
                // decrementMinute={context.decrementMinute}
                // setTimer={context.setTimer}
                // changeTimerType={context.changeTimerType}
                // timerType={context.timerType}
                // isFinished={context.isFinished}
                // startTimer={context.startTimer}
                // endTimer={context.endTimer}
            />
        ));
    }

    render() {
        const {timerContext ={}} = this.props;
        return (
            <div className="Pomodoro">
                {/* <Timer  
                    minutes={this.state.minutes}
                    decrementMinute={this.decrementMinute}
                    setTimer={this.setTimer}
                    changeTimerType={this.changeTimerType}
                    timerType={this.state.timerType}
                    isFinished={this.state.isFinished} 
                    startTimer={this.startTimer}
                    endTimer={this.endTimer}/> */}
                <Timer 
                key={timerContext._id} 
                minutes={timerContext.minutes}
                />
                

            </div>
        )
    }
}

export default withTracker(() => {
    return {
        // Only working with one item in the db currently
        timerContext: TimerCollection.findOne({})
    };
})(App);

