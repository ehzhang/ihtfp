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

// Today!
var today = new Date();
var start = new Date(today.setHours(0,0,0,0));

/**
 * Session key-value pairs.
 */
// For now, only subscribing to today's posts.
Session.setDefault("startDate", start);
Session.setDefault("debugLoggedIn", false);
Session.setDefault("limit", 40);

Deps.autorun( function () {
  // Gets the feels from the sessions startDate/endDate.
  // Only subscribe to the data relevant to the session values.
  // startDate indicates the start of the query
  // endDate indicates the end of the query
  // limit is the number of feels to load
  Meteor.subscribe("feels", Session.get("startDate"), Session.get("endDate"), Session.get("limit"));
});

/**
 * debug value for switching between the splash/app
 */
Template.app.debug = function () {
  return Session.get("debugLoggedIn");
}

/**
 * Events for the debug button.
 * Currently:
 * debug -> toggle the splash/app
 * load -> increases the limit, loads more!
 *
 */
Template.debug.events({
  'click .debug.button' : function () {
    Session.set("limit", 40);
    Session.set("debugLoggedIn", !Session.get("debugLoggedIn"));
  }
})

Template.app.loggedIn = function () {
  return Meteor.user() ? true : false;
}

/**
 * Find the maximum element of an array.
 * @param array
 * @returns {*}
 */
mode = function (array) {
  if(array.length == 0)
    return null;
  var elementMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++)
  {
    var el = array[i];
    if(elementMap[el] == null) {
      elementMap[el] = 1;
    } else {
      elementMap[el]++;
    }
    if(elementMap[el] > maxCount) {
      maxEl = el;
      maxCount = elementMap[el];
    }
  }
  return maxEl;
}

/**
 * Dynamically update the text for the emotion, based the max
 * feeling of the current day
 */
Template.header.emotion = function () {
  // An array of emotions
  var recentFeels = Feels.find(
    {
      timestamp: { $gte: start }
    },
    {
      fields: {emotion: 1},
      sort: {timestamp: -1}
    }).map(function (item) {
      return item.emotion;
    });
  // This could probably be optimized somehow? Maybe.
  return mode(recentFeels);
}

/**
 * Every time the header is rendered, do a thing!
 * - transition the new header
 */
Template.header.rendered = function () {
//  $(this.find('#header')).transition('fade up in', '300ms');
}

/**
 * Populate the feels grid
 */
Template.grid.feels = function () {
  // The feels found is based on the subscribe function above.
  return Feels.find({}, {sort: {timestamp: -1}});
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

/**
 * Events for the Post template
 */
Template.post.events({
  'click .happy.button': function () {
    var username = Meteor.user.username;
    var text = $("textarea").val();
    var emotion = 'happy';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  },
  'click .meh.button': function () {
    var username = Meteor.user.username;
    var text = $("textarea").val();
    var emotion = 'meh';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  },
  'click .sad.button': function () {
    var username = Meteor.user.username;
    var text = $("textarea").val();
    var emotion = 'sad';
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('textarea').val("");
    return false;
  }
});