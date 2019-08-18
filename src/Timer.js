import React, { Component } from 'react'
import { thisTypeAnnotation } from '@babel/types';

// ! Source code: https://codepen.io/jurekbarth/pen/pgYGBm

class Timer extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            minutes: 25,
            seconds: '00'
        }
        // It's because of the way Javacsript handles contexts of functions. 
        // Essentially, if not calling the function directly from the object 
        // and that function is not bounded to any context, it loses the context
        this.tick = this.tick.bind(this);
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    tick () {
        if (this.state.minutes >= 0) {

            if (this.state.minutes == 0 && this.state.seconds == 0) {
                return
            }


            if (this.state.seconds <= 0) {
                let prevMinute = this.state.minutes
                this.setState (
                    {
                        minutes: prevMinute - 1,
                        seconds: 60
                    }
                )
            } 

            if (this.state.seconds < 10) {
                this.setState({seconds:"0" + (this.state.seconds - 1)})
            }
            else {
                this.setState({seconds: (this.state.seconds - 1)})
            }

            
        }
    }

    startTimer () {
        clearInterval(this.timer)
        this.timer = setInterval((this.tick), 1000)
    }

    pauseTimer () {
        clearInterval(this.timer)
    }

    resetTimer() {
        clearInterval(this.timer)
        this.setState (
            {
                minutes: 25,
                seconds: '00'
            }
        )
    }

    render () {
        return (
            <div className='timer'>
                <h1>{this.state.minutes}:{this.state.seconds}</h1>
            <div>
            <button onClick={() => this.startTimer()}>Start</button>
            <button onClick={() => this.pauseTimer()}>Pause</button>
            <button onClick={() => this.resetTimer()}>Reset</button>
            </div>
        </div>
        )
    }
}

export default Timer