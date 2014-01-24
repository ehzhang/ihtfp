/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Code specific to the nav bar. icons and such, actions in this template.
 *
 */

Template.nav.rendered = function () {
  // Initialize popups on the nav stuff.
  $('.item.popup').popup();
  // Listen for events
  $('.new-feel').click(function () {
    $('#composer').accordion('open', 0);
  });
}

Template.nav.username = function () {
  if (Meteor.user().name) {
    return Meteor.user().name;
  }
  return Meteor.user().username;
}

/**
 * Events related to the app in general
 */
Template.nav.events({
  'click .new-feel': function () {
    // TODO: can be made to be a little better.
    Session.set("account", false);
    setTimeout(function () {
      $('#composer').accordion('open', 0);
    }, 500);
    return false;
  },
  'click .logout.item': function () {
    Meteor.logout();
    return false;
  },
  'click .item.account': function () {
    if (!Session.get("account")) {
      Session.set("active", false);
      Session.set("account", true);
      return false;
    }
    return false;
  },
  'click .item.home': function () {
    if (Session.get("account")) {
      Session.set("active", false);
      Session.set("limit", 40);
      Session.set("account", false);
      return false;
    }
    return false;
  },
  'click #filter .button': function () {
    Session.set('minimized', !Session.get('minimized'));
    return false;
  }
});

