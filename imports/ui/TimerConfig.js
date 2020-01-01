import React, { Component } from 'react';

export default class TimerConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusDuration: this.props.focusDuration,
            shortBreakDuration: this.props.shortBreakDuration,
            longBreakDuration: this.props.longBreakDuration
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateTimerConfig(event);
        alert('Values saved.');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <h2>Focus Value</h2>
                <input 
                    type="text"
                    className="input"
                    id="focus_duration" 
                    value={this.state.focusDuration} 
                    onChange={e => this.setState({focusDuration: e.target.value})}/> 
                <br/>

                <h2>Short Break Value</h2>
                <input 
                    type="text" 
                    className="input" 
                    id="short_break_duration" 
                    value={this.state.shortBreakDuration} 
                    onChange={e => this.setState({shortBreakDuration: e.target.value})}/> 
                <br/>

                <h2>Long Break Value</h2>
                <input 
                    type="text" 
                    className="input" 
                    id="long_break_duration" 
                    value={this.state.longBreakDuration} 
                    onChange={e => this.setState({longBreakDuration: e.target.value})}/> 
                <br/>

                <input 
                    type="submit" 
                    className="submit" 
                    value="Save"/>
            </form>
        );
    }
}