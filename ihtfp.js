if (Meteor.isClient) {

  Meteor.subscribe("feels", function () {
    console.log("I GOT THE FEELS! ");
  });

  Template.feed.feels = function () {
    return Feels.find({}, { sort: { timestamp: -1 }});
  }

// failed attempt to make new posts appear properly w/ isotope
//  Template.feel.rendered = function () {
//    $('#grid').isotope('reloadItems', function () {
//      console.log("RELOAD!!");
//    });
//  };


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
