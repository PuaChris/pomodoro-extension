import { Meteor } from 'meteor/meteor';
import { db } from '../imports/api/Context';

Meteor.startup(() => {
    db.collection("context").doc("test").set({
        UserEmail: "testemail.com",
        PomodorosHistory: {
            Date: new Date()
        }
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
});
