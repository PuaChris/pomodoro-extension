import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const TimerContext = new Mongo.Collection('timer-context');

Meteor.methods({
    'timer-context.insert'(
        minutes, 
        pomodoroTime, 
        shortBreakTime, 
        longBreakTime, 
        numPomodoros, 
        numShortBreaks, 
        timerType
        ) {
            check(minutes, Number);
            check(pomodoroTime, Number);
            check(shortBreakTime, Number);
            check(longBreakTime, Number);
            check(numPomodoros, Number);
            check(numShortBreaks, Number);
            check(timerType, String);

            TimerContext.insert({
                minutes,
                pomodoroTime,
                shortBreakTime,
                longBreakTime,
                numPomodoros,
                numShortBreaks,
                timerType
            });
    },

        
})
