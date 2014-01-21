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
  })
}

Template.nav.username = function () {
  return Meteor.user().username;
}

/**
 * Events related to the main-feed
 *
 * Namely: debug button acts a logout button
 */
Template.nav.events({
  'click .logout.item' : function () {
    Meteor.logout();
  },
  'click #filter .button' : function () {
    Session.set('minimized', !Session.get('minimized'));
  }
});

