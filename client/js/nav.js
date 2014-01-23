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
  $('.new-feel').click( function () {
    $('#composer').accordion('open', 0);
  });
}

Template.nav.username = function () {
  // TODO: Give user a field for just name, more personal that way
  return Meteor.user().username;
}

/**
 * Events related to the main-feed
 */
Template.nav.events({
  'click .new-feel' : function () {
    // TODO: can be made to be a little better.
    Session.set("account", false);
    setTimeout(function () {
      $('#composer').accordion('open', 0);
    }, 500);
    return false;
  },
  'click .logout.item' : function () {
    Meteor.logout();
    return false;
  },
  'click .item.account' : function () {
    Session.set("account", true);
    return false;
  },
  'click .item.home' : function () {
    Session.set("account", false);
    return false;
  },
  'click #filter .button' : function () {
    Session.set('minimized', !Session.get('minimized'));
    return false;
  }
});

