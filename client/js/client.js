Deps.autorun( function () {
  // Gets the feels from the sessions startDate/endDate.
  // Only subscribe to the data relevant for speed
  Meteor.subscribe("feels", Session.get("startDate"), Session.get("endDate"))
});

/**
 * Splash page events
 */
Session.setDefault("firstTime", true);
Template.splash.firstTime = function () {
  return Session.get("firstTime");
}

Template.splash.events({
  'click .toggle.button': function () {
    Session.set("firstTime", !Session.get("firstTime"));
  }
})

Template.splash.preserve({
  '#splash' : function(node) {}
})

/**
 * debug value for switching between the splash/app
 */
Template.app.debug = function () {
  return Session.get("debugLoggedIn");
}

/**
 * Events for the debug button
 */
Template.debug.events({
  'click .debug.button' : function () {
    Session.set("debugLoggedIn", !Session.get("debugLoggedIn"));
  }
})

// Today!
var today = new Date();
var start = new Date(today.setHours(0,0,0,0));

// For now, only subscribing to today's posts.
Session.set("startDate", start);
Session.set("debugLoggedIn", false);

/**
 * Find the maximum element of an array.
 * @param array
 * @returns {*}
 */
function mode(array) {
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
  $(this.find('#header')).transition('fade up in', '300ms');
}

/**
 * Populate the feels grid
 */
Template.grid.feels = function () {
  // The feels found is based on the subscribe function above.
  return Feels.find({}, {sort: {timestamp: -1}});
}

/**
 * Every time the feel template is rendered, do a thing:
 * - transition this new feel upward!
 */
Template.feel.rendered = function () {
  $(this.find('.feel')).transition('fade up in', '300ms');
}

/**
 * Events for the heart template
 */
Template.heart.events({
  'click .heart': function () {
    console.log("HEART");
    Feels.update(this._id, {$inc: {hearts: 1}});
  }
});

/**
 * Events for the Post template
 */
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