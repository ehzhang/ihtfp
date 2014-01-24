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

/**
 * Username, if the user hasn't set a personal name yet.
 * @returns String
 */
Template.account.username = function () {
  if (Meteor.user().name) {
    return Meteor.user().name;
  }
  return Meteor.user().username;
}

/**
 * Returns the number of times this user has posted.
 * @returns Integer
 */
Template.account.timesPosted = function () {
  return Feels.find({username: Meteor.user().username}).count();
}

/**
 * Returns the date the user has joined, formatted for readability.
 * @returns {string}
 */
Template.account.joinDate = function () {
  if (Meteor.user().createdAt instanceof Date) {
    return Meteor.user().createdAt.toDateString();
  }
}

/**
 * Returns the most commonly posted emotion by this user.
 * @returns String (emotion)
 */
Template.account.mostEmotion = function () {
  return mode(Feels.find({username: Meteor.user().username}).map(function (item) {
    return item.emotion;
  }));
}

/**
 * Returns the emotion with the highest frequency in the past week.
 * @returns String (emotion)
 */
var lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
Template.account.weeksEmotion = function () {
  return mode(Feels.find({
      username: Meteor.user().username,
      timestamp: { $gte: lastWeek}
    }
  ).map(function (item) {
      return item.emotion;
    }));
}


