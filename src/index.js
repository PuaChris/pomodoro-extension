import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './Pomodoro';
import Timer from './Timer';
import './index.css';


ReactDOM.render(<Pomodoro />, document.getElementById('root'));
ReactDOM.render(<Timer />, document.getElementById('root'));
