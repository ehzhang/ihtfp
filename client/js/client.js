Meteor.subscribe("feels", function () {
  console.log("I GOT THE FEELS! ");
});

Template.feed.alpha = function () {
  var positive = Feels.find({emotion: 'Happy'}).count();
  var negative = Feels.find({emotion: 'Sad'}).count();
  var alpha = negative / (positive + negative);
  $('.feel').css({opacity: alpha});
  return alpha;
}

Template.feed.feels = function () {
  Feels.find().observe({
    added : function (item){
    }
  })
  return Feels.find({}, {sort: {timestamp: -1, limit: 100}});
}

Template.heart.events({
  'click .heart': function () {
    console.log("HEART");
    Feels.update(this._id, {$inc: {hearts: 1}});
  }
});

Template.post.events({
  'click .green': function () {
    var username = $(":input:text").val();
    var text = $("textarea").val();
    var emotion = 'Happy';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    return false;
  },
  'click .black': function () {
    var username = $(":input:text").val();
    var text = $("textarea").val();
    var emotion = 'Sad';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    return false;
  }
});