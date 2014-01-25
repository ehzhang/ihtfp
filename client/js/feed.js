/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Code specific to the feed template. Contains the grid and the feels.
 *
 */

Session.setDefault("minimized", false);
Session.setDefault("filter", 'all');

/**
 * Set of greetings to be randomly selected for the header.
 * @returns {string}
 */
Template.logo.greeting = function () {
  var greetings = [
    "how you doin'?",
    "how are you today?",
    "how are you feeling?",
    "what's on your mind?",
    "hey, what's up?",
    "watcha thinkin bout?"
  ]
  return greetings[Math.floor(Math.random() * greetings.length)];
}

Template.header.filtered = function () {
  return emotions.indexOf(Session.get("filter")) >= 0;
}

Template.header.filter = function () {
  return Session.get("filter");
}

/**
 * Dynamically update the text for the emotion, based the max
 * feeling of the current day
 */
Template.header.emotion = function () {
  // An array of emotions
  var recentFeels = Feels.find(
    {
      timestamp: { $gte: Session.get("startDate") }
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
 * Determines whether or not the record set has been sufficiently synced.
 * When true, will then render the feed.
 * @returns Boolean true/false
 */
Template.feed.active = function () {
  return Session.get("active");
}

Template.filter.events({
  'click .filters .item' : function (event) {
    if(!Session.get("account")){
      // Only set the active flag to false on the main feed.
      // On the account page, the data is all found, and filtered
      // on the client side instead of the server
      Session.set("active", false);
    }
    Session.set("limit", 60);
    Session.set("filter",$(event.target).attr("emotion"));
  }
})

/**
 * Populate the feels grid
 */
Template.grid.feels = function () {
  // The feels found is based on the subscribe function above.
  // TODO: Make this less bad
  if (Session.get("active")) {
    if (emotions.indexOf(Session.get("filter")) >= 0) {
      return Feels.find({emotion: Session.get("filter")}, {sort: {timestamp: -1}});
    } else {
      return Feels.find({}, {sort: {timestamp: -1}});
    }
  }
}

// Global container, msnry
var container, msnry;
Template.grid.rendered = function () {
  container = document.querySelector('#grid');
  msnry = new Masonry(container, {
    // options
    columnWidth: 50,
    itemSelector: '.feel',
    gutter: 25,
    isFitWidth: true
  });
  // Check to see if this template hasn't been rendered before.
  // If it hasn't, then do a thing! (transition)
  if(!this._rendered) {
    this._rendered = true;
    $('#grid').transition('fade up in', 500);
  }
}

// When the template is destroyed, reset the _rendered variable to false.
Template.grid.destroyed = function () {
  this._rendered = false;
}

// Add lazy load to the grid
$('#grid').ready(function () {
  //  Add a scroll handler to detect reaching the bottom of the page.
  //  Throttle the function so it doesn't fire so often!
  $(window).scroll(_.throttle(
    function () {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
        Session.set("limit", Session.get("limit") + 15);
      }
    }, 400));
});

// Determine the size of the feel based on the amount of text inside.
Template.feel.size = function () {
  var text = this.text;
  // TODO: Can be moved to postFeel also needs max post size
  if (!this.text || !text.replace(/\s/g, '').length) {
    // If the string is only spaces
    return '';
  } else if (text.length < 100) {
    return 'medium expandable';
  } else if (text.length < 300) {
    return 'big expandable';
  } else {
    return 'huge expandable';
  }
}

Template.feel.date = function () {
  if (this.timestamp instanceof Date) {
    return this.timestamp.toLocaleDateString();
  }
}

// Code to execute when feels are rendered.
// This gives big feels the ability to expand in size
Template.feel.rendered = function () {
  // Find the feel class
  $(this.find('.feel'))
    .addClass('opaque')
    .click(function () {
      // Check if the feel is big or not.
      // If its big, it has the opportunity to be giant!
      var $feel = $(this);
      if ($feel.hasClass('expandable')) {
        // Remove any that are giant at the moment.
        // Only embiggen the one selected
        $feel.toggleClass('expanded')
        // Reorganize the msnry layout
        msnry.layout();
      }
    })
}

// Helper functions
/**
 * Find the maximum element of an array.
 * @param array
 * @returns {*}
 */
mode = function (array) {
  if (array.length == 0)
    return null;
  var elementMap = {};
  var maxEl = array[0], maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (elementMap[el] == null) {
      elementMap[el] = 1;
    } else {
      elementMap[el]++;
    }
    if (elementMap[el] > maxCount) {
      maxEl = el;
      maxCount = elementMap[el];
    }
  }
  return maxEl;
}