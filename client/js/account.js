/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Code specific for the accounts page.
 *
 */

// Today!
var today = new Date();
var start = new Date(today.setHours(0, 0, 0, 0));
var lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

Session.setDefault("accountsReady", false);

Template.account.rendered = function () {

};

Template.account.events({

});

Template.account.username = function () {
  if (Meteor.user().name) {
    return Meteor.user().name;
  }
  return Meteor.user().username;
}

Template.account.timesPosted = function () {
  return Feels.find({username: Meteor.user().username}).count();
}

Template.account.joinDate = function () {
  if (Meteor.user().createdAt instanceof Date) {
    return Meteor.user().createdAt.toDateString();
  }
}

Template.account.mostEmotion = function () {
  return mode(Feels.find({username: Meteor.user().username}).map(function (item) {
    return item.emotion;
  }));
}

Template.account.weeksEmotion = function () {
  return mode(Feels.find({
      username: Meteor.user().username,
      timestamp: { $gte: lastWeek}
    }
  ).map(function (item) {
      return item.emotion;
    }));
}


