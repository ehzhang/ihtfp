if (Meteor.isClient) {

  Meteor.subscribe("feels", function () {
    console.log("I GOT THE FEELS! " + Feels.find().count());
  });

  Template.feed.feels = function () {
    return Feels.find();
  }

  Template.post.clear = function () {
  // reset post stuff
  }

  Template.post.events({
    'click .green': function () {
      var username = $(":input:text").val();
      var text = $("textarea").val();
      var emotion = $('.green').html();
      Meteor.call("postFeel", username, text, emotion);
      // reset post stuff
      return false;
    },
    'click .black': function () {
      var username = $(":input:text").val();
      var text = $("textarea").val();
      var emotion = $('.black').html();
      Meteor.call("postFeel", username, text, emotion);
      // reset post stuff
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("feels", function () {
    console.log("I'M SENDING THE FEELS! " + Feels.find().count());
//    return Feels.find({username :"Bob"});
    return Feels.find();
  });
}
