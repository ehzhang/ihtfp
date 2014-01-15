if (Meteor.isClient) {

  Meteor.subscribe("feels", function () {
    console.log("I GOT THE FEELS! " + Feels.find().count());
  });

  Template.post.events({
    'click .green': function () {
      var username = $("textarea").val();
      var text = $(":input:text").val();
      var emotion = $('.green').html();
      Meteor.call("postFeel", username, text, emotion);
      return false;
    },
    'click .black': function () {
      var username = $("textarea").val();
      var text = $(":input:text").val();
      var emotion = $('.black').html();
      Meteor.call("postFeel", username, text, emotion);
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("feels", function () {
    console.log("I'M SENDING THE FEELS! " + Feels.find({username: "Bob"}).count());
    return Feels.find({username: "Bob"});
  });
}
