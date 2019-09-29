import React, { Component } from 'react'
import { thisTypeAnnotation } from '@babel/types';

// ! Source code: https://codepen.io/jurekbarth/pen/pgYGBm

class Timer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      minutes: 0,
      seconds: "02"
    };
    // It's because of the way Javacsript handles contexts of functions.
    // Essentially, if not calling the function directly from the object
    // and that function is not bounded to any context, it loses the context
    this.tick = this.tick.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  tick() {
    if (this.state.minutes >= 0) {
      if (this.state.minutes <= 0 && this.state.seconds <= 0) {
        clearInterval(this.timer);
        return;
      }
      else if (this.state.seconds <= 0) {
        let prevMinute = this.state.minutes;
        this.setState({
          minutes: prevMinute - 1,
          seconds: 60
        });
      }
      else if (this.state.seconds < 10) {
        this.setState({ seconds: "0" + (this.state.seconds - 1) });
      } else {
        this.setState({ seconds: this.state.seconds - 1 });
      }
    }
  }

  startTimerBtn(e) {
    // e.currentTarget.style.backgroundColor = "#ccc";

    clearInterval(this.timer);
    this.timer = setInterval(this.tick, 1000);
  }

  pauseTimerBtn() {
    clearInterval(this.timer);
  }

  resetTimerBtn() {
    clearInterval(this.timer);
    this.setState({
      minutes: this.props.minutes,
      seconds: "00"
    });
  }

  render() {
    return (
      <div className="timer-container">
        <div className="timer">
          <h1>
            {this.state.minutes}:{this.state.seconds}
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
