const mongoose = require('mongoose');
const Session = require('./index').session;
const Recommendation = require('./index').recommendation;
// const fs = require('fs');
if (process.env.dbfilepath) {
  var dbfilepath = process.env.dbfilepath;
// } else if (fs.existsSync('../keys.js')) {
// } else {
//   var dbfilepath = require('../keys.js').dbfilepath;
}
// test

console.log('---dbfilepath from process.env: ---', dbfilepath);
// console.log('---MONGODB_URI: ---', MONGODB_URI);


mongoose.connect(dbfilepath);
var db = mongoose.connection;

let saveSessionModel = ((data,res) => {
  let session = new Session(data);
  saveSession = session.save()
  saveSession.then(document => {
    console.log('Session saved');
    
    res.status(201).send(document._id);
  })
  .catch(err => console.log('Error saving session:', err))
});


let findSession = ((id, res) => {
  let session = Session.findById(id).exec()
  session.then(session => {
    console.log('Session data:', session);
    let responseData = {
      initiatorName: session.initiator_name,
      pointsOfInterest: session.recommended_destinations,
      phoneNums: session.phone_numbers
    };

    res.status(200).send(responseData);
  })
  .catch(err => console.log('Error finding Session: ', err));
});

module.exports = {
  saveSessionModel : saveSessionModel,
  findSession : findSession
};