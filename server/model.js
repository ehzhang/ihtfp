/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  This datamodel is shared with the client and server.
 *
 *  Each feel is represented by a document in the Feels collection:
 *  username: String user name
 *  anon: Boolean
 *  text: String
 *  emotion: String out of the set {'happy', 'sad', 'meh'}
 *  hearts: Integer representing number of 'hearts'
 *  timestamp: Date object
 */
Feels = new Meteor.Collection("feels");

Meteor.methods({
  postFeel: function (username, text, emotion) {
    Feels.insert(
      {
        username: username,
        anon: true, // default for now
        text: text,
        emotion: emotion,
        hearts: 0,
        timestamp: new Date()
      }, function () {
        console.log("successfully posted!!")
      });
  }
});