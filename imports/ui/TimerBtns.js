import React, { Component } from 'react';

export default class TimerBtns extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="btn-group-lg">
                <button
                    type="button"
                    className="btn btn-success"
                    id="start-btn"
                    onClick={e => this.props.resume(e)}>
                    Start
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    id="pause-btn"
                    onClick={e => this.props.pause(e)}>
                    Pause
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    id="reset-btn"
                    onClick={e => this.props.stop(e)}>
                    Reset
                </button>
            </div>
        );
    }
}