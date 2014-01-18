Meteor.subscribe("feels", function () {
  console.log("I GOT THE FEELS! ");
});

//Template.logo.alpha = function () {
//  var positive = Feels.find({emotion: 'happy'}).count();
//  var negative = Feels.find({emotion: 'sad'}).count();
//  console.log(negative / (positive + negative));
//  return (positive / (positive + negative) * 255).floor();
//}

Template.feel.rendered = function () {
  $(this.find('.feel')).transition('fade up in', '500ms');
}

Template.feed.feels = function () {
  return Feels.find({}, {sort: {timestamp: -1, limit: 100}});
}

Template.heart.events({
  'click .heart': function () {
    console.log("HEART");
    Feels.update(this._id, {$inc: {hearts: 1}});
  }
});

Template.post.events({
  'click .happy.button': function () {
    var username = $(":input:text").val() ? $(":input:text").val() : 'Anonymous';
    var text = $("textarea").val();
    var emotion = 'happy';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  },
  'click .meh.button': function () {
    var username = $(":input:text").val() ? $(":input:text").val() : 'Anonymous';
    var text = $("textarea").val();
    var emotion = 'meh';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  },
  'click .sad.button': function () {
    var username = $(":input:text").val() ? $(":input:text").val() : 'Anonymous';
    var text = $("textarea").val();
    var emotion = 'sad';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  }
});