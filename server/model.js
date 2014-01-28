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
 *  private: Boolean (indicates text should be hidden to public)
 *  text: String
 *  emotion: String out of these options:
 *  {'happy', 'sad', 'meh', 'excited', 'angry', 'stressed', 'proud', 'romantic'}
 *  hearts: Integer representing number of 'hearts'
 *  timestamp: Date object
 */
Feels = new Meteor.Collection("feels");

Meteor.methods({
  postFeel: function (username, text, emotion) {

    // First check that the username and userId match.
    var user = Meteor.users.find({_id: this.userId}, {fields: {username: 1}}).fetch()[0];
    if (user.username !== username) {
      return [false, "Oops. You're not who you say you are."];
    }

    // Check to see if the user has posted recently, and how often.
    // Currently limit to 6 posts an hour.
    var latestPosts = Feels.find(
      {
        username: username
      },{
        sort:{timestamp: -1},
        limit: 6
      }).fetch();

    // Make sure there are even posts there to limit.
    if (latestPosts.length >= 6) {
      var latestPost = latestPosts[latestPosts.length -1];
      var minutesDiff = Math.abs(new Date - latestPost.timestamp)/60000;
      if (minutesDiff < 60) {
        return [false, "Oops. Looks like you've had too many feels in the past hour. " +
          "<br> Try posting again a little later!"];
      }
    }

    // Shouldn't happen, but if somebody sneaks by with text larger than the limit.
    if (text.length > 1200) {
      return [false, "Your feel exceeds the 1200 character limit!" +
        "<br> Also, get the fuck out of the console!"];
    }

    // Also like, seriously shouldn't happen.
    if (!(emotions.indexOf(emotion) >= 0)) {
      return [false, "That's not an emotion I've seen before." +
        "<br> Get out of the console, yo!"]
    }

    // If not posting too frequently/not posted yet, post that shittt
    return Feels.insert(
      {
        username: username,
        anon: true, // default for now
        text: text,
        emotion: emotion,
        hearts: 0,
        timestamp: new Date()
      }, function () {
        console.log("successfully posted!!");
        return [true, "Successfully Posted!"]
      });
  }
});