// ihtfp data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Feels

/**
 Each feel is represented by a document in the Feels collection:
 username: String user name
 anon: Boolean
 text: String
 emotion: String out of the set {happy, sad, meh}
 hearts: Integer representing number of 'hearts'
 timestamp: Date
 */

Feels = new Meteor.Collection("feels");

Meteor.methods({
  postFeel: function (username, text, emotion) {
    Feels.insert(
      {
        username: username,
        anon: false, // default for now
        text: text,
        emotion: emotion,
        hearts: 0,
        timestamp: (new Date()).getTime()
      }, function () {
        console.log("successfully posted!!")
      });
  }
})