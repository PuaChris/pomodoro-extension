import React, { Component } from 'react'
// ! Source code: https://codepen.io/jurekbarth/pen/pgYGBm

class Timer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      seconds: "00"
    };    

    if (this.props.timerType === this.props.timerStates[0]){
      this.props.pomodoroHandler();
    }
    
    // It's because of the way Javacsript handles contexts of functions.
    // Essentially, if not calling the function directly from the object
    // and that function is not bounded to any context, it loses the context
    // this.tick = this.tick.bind(this);
  }
  // componentWillUnmount = () => {
  //   clearInterval(this.timer);
  // }

  tick = () => {
    if (this.props.minutes >= 0) {
      this.props.isFinished = false;

      if (this.props.minutes <= 0 && this.state.seconds <= 0) {
        clearInterval(this.timer);
        this.props.isFinished = true;
        return;
      }
      
      else if (this.state.seconds <= 0) {
        this.props.decrementMinute();

        this.setState({
          seconds: 59
        });
      }

      // TODO: Optimzation opportunity -> figure out a way to not manually insert a 0 in the timer
      else if (this.state.seconds < 10) {
        this.setState({ 
          seconds: "0" + (this.state.seconds - 1)
        });
      } 
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
    this.timer = setInterval(this.tick, 1000);
  }

  pauseTimerBtn = () => {
    clearInterval(this.timer);
  }

  resetTimerBtn = () => {
    clearInterval(this.timer);
    
    if (this.props.timerType === this.props.timerStates[0]){
      this.props.pomodoroHandler();
    }

    // TODO: Set conditionals for what state it is to set the timer (e.g. pomodoroState, etc.)

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
