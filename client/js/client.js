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
var start = new Date(today.setHours(0,0,0,0));

// Get the collections on the client side.
Feels = new Meteor.Collection("feels");
// Collections permissions from the client side.
Feels.allow({
  insert: function(userId, feel) {
    // Don't fuck with the console, yo
    return false;
  },
  update: function(userId, feel) {
    return false;
  },
  remove: function(userId, feel) {
    return false;
  }
});

/**
 * Session key-value pairs.
 */
// For now, only subscribing to today's posts.
Session.setDefault("startDate", start);
Session.setDefault("limit", 40);

Deps.autorun( function () {
  // Gets the feels from the sessions startDate/endDate.
  // Only subscribe to the data relevant to the session values.
  // startDate indicates the start of the query
  // endDate indicates the end of the query
  // limit is the number of feels to load
  // Sstart date is currently false for infinite scroll
  Meteor.subscribe("feels", false, Session.get("endDate"), Session.get("limit"));
});

Template.app.loggedIn = function () {
  return Meteor.user() ? true : false;
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