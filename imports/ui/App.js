import React, { Component } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
require("firebase/firestore");
var firebase = require('firebase');
var firebaseui = require('firebaseui');

import { db } from '../api/Context';

import * as Constants from '../resources/Constants';
import * as Helper from '../resources/Helper';

import Timer from './Timer';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            phase: Constants.FOCUS,
            duration: Helper.minutesToSeconds(Constants.FOCUS_LENGTH), 
        }

        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
              },
              uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
              }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'http://localhost:3000',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // * Terms of service url.
            // tosUrl: '<your-tos-url>',
            // * Privacy policy url.
            // privacyPolicyUrl: '<your-privacy-policy-url>'
          };
          
          // The start method will wait until the DOM is loaded.
          ui.start('#firebaseui-auth-container', uiConfig);

        this.updatePhaseToFocus = this.updatePhaseToFocus.bind(this);
        this.updatePhaseToBreak = this.updatePhaseToBreak.bind(this);
        this.updateNumPomodoros = this.updateNumPomodoros.bind(this);
    }

    updatePhaseToFocus() {
        this.setState({
            phase: Constants.FOCUS,
            duration: Helper.minutesToSeconds(Constants.FOCUS_LENGTH)
        });
    }

    updatePhaseToBreak() {
        this.updateNumPomodoros();
        let numPomodoros = this.state.numPomodoros;
        if (numPomodoros % Constants.NUM_POMODOROS_BEFORE_LONGBREAK === 0 && numPomodoros > 0) {
            this.setState({
                phase: Constants.LONGBREAK,
                duration: Helper.minutesToSeconds(Constants.LONGBREAK_LENGTH)
            });
        }
        else {
            this.setState({
                phase: Constants.SHORTBREAK,
                duration: Helper.minutesToSeconds(Constants.SHORTBREAK_LENGTH)
            });
        }
    }

    updateNumPomodoros() {
        this.setState({
            numPomodoros: this.state.numPomodoros + 1
        });
    }
    render() {
        return this.state && this.state.duration ? (
            <div className="timer-container">
                <header>
                    <h1>Puamodoro Timer</h1>
                    <Timer 
                        phase={this.state.phase}
                        duration={this.state.duration}
                        updatePhaseToFocus={this.updatePhaseToFocus}
                        updatePhaseToBreak={this.updatePhaseToBreak}
                    />
                    <h2>Phase: {this.state.phase}</h2>
                </header>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        ) : <span>Loading...</span>;
    }
}

