import React, { Component } from 'react';

export default class TimerConfig extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <form id="timer_inputs">
                <h1>Focus Length:</h1> 
                <input 
                    id="focus_input" 
                    type="number" 
                    name="focus_length"
                    defaultValue={this.props.focusLength}
                    onChange={(event) => this.props.updateTimerConfig(event)}
                    required/>
                <br/>

                <h1>Short Break Length:</h1> 
                <input 
                    id="short_break_input" 
                    type="number" 
                    name="shortBreak_length"
                    defaultValue={this.props.shortBreakLength}
                    onChange={(event) => this.props.updateTimerConfig(event)}
                    required/>
                <br/>

                <h1>Long Break Length:</h1> 
                <input 
                    id="long_break_input" 
                    type="number" 
                    name="longBreak_length"
                    defaultValue={this.props.longBreakLength}
                    onChange={(event) => this.props.updateTimerConfig(event)}
                    required/>
                <br/>
            </form>
        );
    }
}