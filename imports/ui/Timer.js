import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let minutes = Math.floor(this.props.duration / 60);
        let seconds = this.props.duration % 60;

        return (
            <div>
                <h1>
                    {minutes}:{ (seconds < 10) ? "0" + seconds : seconds }  
                </h1>
            </div>
        )
    }
}