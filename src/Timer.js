import React, { Component } from 'react'
import * as Constants from './constants'
// ! Source code: https://codepen.io/jurekbarth/pen/pgYGBm

class Timer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      seconds: "00"
    };    
    this.props.setTimer();
  }

  tick = () => {
    if (this.props.minutes >= 0) {

      // Timer is finished
      if (this.props.minutes <= 0 && this.state.seconds <= 0) {
        clearInterval(this.timer);
        this.props.endTimer();
        this.props.changeTimerType();
        return;
      }
      
      // The current minute finishes
      else if (this.state.seconds <= 0) {
        this.props.decrementMinute();
        this.setState({
          seconds: 1
        });
      }

      // Case to manually add a 0 when seconds is only a single digit
      // TODO: Optimzation opportunity -> figure out a way to not manually insert a 0 in the timer
      else if (this.state.seconds < 10) {
        this.setState({ 
          seconds: "0" + (this.state.seconds - 1)
        });
      } 

      // Normal timer countdown functionality
      else {
        this.setState({
           seconds: this.state.seconds - 1
          });
      }
    }
  }

  startTimerBtn = (e) => {
    // e.currentTarget.style.backgroundColor = "#ccc";
    clearInterval(this.timer);
    this.props.startTimer();
    this.timer = setInterval(this.tick, 1000);
  }

  pauseTimerBtn = () => {
    clearInterval(this.timer);
  }

  resetTimerBtn = () => {
    clearInterval(this.timer);
    this.props.setTimer();
    this.setState({
      seconds: "00"
    });
  }

  render() {
    return (
      <div className="timer-container">
        <div className="timer">
          <h1>
            {this.props.minutes}:{this.state.seconds}
          </h1>
        </div>
        <div className="btn-group-lg">
          <button
            type="button"
            className="btn btn-success"
            id="start-btn"
            onClick={e => this.startTimerBtn(e)}
          >
            Start
          </button>
          <button
            type="button"
            className="btn btn-primary"
            id="pause-btn"
            onClick={e => this.pauseTimerBtn(e)}
          >
            Pause
          </button>
          <button
            type="button"
            className="btn btn-primary"
            id="reset-btn"
            onClick={e => this.resetTimerBtn(e)}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
