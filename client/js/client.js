/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  This primarily contains Session.get/set stuff
 *  and Template functions.
 *
 */

// Today!
var today = new Date();
var start = new Date(today.setHours(0, 0, 0, 0));

// Get the collections on the client side.
Feels = new Meteor.Collection("feels");
// Collections permissions from the client side.
Feels.allow({
  insert: function (userId, feel) {
    // Don't fuck with the console, yo
    return false;
  },
  update: function (userId, feel) {
    return false;
  },
  remove: function (userId, feel) {
    return false;
  }
});

/**
 * Session key-value pairs.
 */
// For now, only subscribing to today's posts.
Session.setDefault("startDate", start);
Session.setDefault("limit", 60);
Session.setDefault("account", true);
Session.setDefault("active", false);

Deps.autorun(function () {
  // Check first if the user is signed in before syncing any data.
  if (Meteor.user()) {
    // If the user is on the accounts page, only get the data relevant to the user.
    if (Session.get("account")) {
      // Change the subscription if you're on the account page.
      // When this record set is ready, trigger active to then load the grid.
      Meteor.subscribe("userFeels", Meteor.user().username,
        {
          onReady: function () {
            // Set the active session trigger to notify that this record set is ready.
            Session.set("active", true);
          }
        })
    } else {
      // If we're on the main feed, subscribe based on the startDate, endDate, and limit Session variables.
      // The function for the "feels" record set is in queries.js.
      // Takes in startDate, endDate, limit.
      // Currently, no start date or end date, so only acting based on limit.
      // TODO: set the session variables intelligently to select specific date ranges.
      Meteor.subscribe("feels", false, Session.get("endDate"), Session.get("limit"),
        {
          onReady: function () {
            // Record set is ready!
            Session.set("active", true);
          }
        });
    }
    Meteor.subscribe("userData");
  }
});

/**
 * Returns whether or not the user is logged in at the moment.
 * (Reactive)
 * @returns {boolean}
 */
Template.app.loggedIn = function () {
  return Meteor.user() ? true : false;
}

/**
 * Returns whether or not the user is on the account page.
 * (Reactive)
 * @returns {boolean}
 */
Template.app.account = function () {
  return Session.get("account");
}

/**
 * Events for the heart template
 * Temporarily removed to be used later
 */
//Template.heart.events({
//  'click .heart': function () {
//    console.log("HEART");
//    Feels.update(this._id, {$inc: {hearts: 1}});
//  }
//});