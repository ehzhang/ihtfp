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

/**
 * Stuff to initialize whenever the navbar is rendered.
 */
Template.nav.rendered = function () {
  // Initialize popups on the nav stuff.
  $('.item.popup').popup();
  // Listen for events
//  $('.new-feel').click(function () {
//    $('#composer').accordion('open', 0);
//  });
}

/**
 * Returns the username, or the name. Whatever.
 * @returns String
 */
Template.nav.username = function () {
  if (Meteor.user()){
    if (Meteor.user().name) {
      return Meteor.user().name;
    }
    return Meteor.user().username;
  }
  return '';
}

/**
 * Return the current emotion to colorize the nav.
 * @returns String (emotion)
 */
Template.nav.emotion = function () {
//  return Session.get("emotion");
}

Template.nav.account = function () {
  return Session.get("account");
};

/** Account template code in nav
 * because it's just this one method.
 *
 */
Template.about.account = function () {
  return Session.get("account");
};

/**
 * Events related to the app in general
 */
Template.nav.events({
  'click .new-feel': function () {
    $('#composer.ui.dimmer')
      .dimmer({
        closable: false
      })
      .dimmer('show');
    return false;
  },
  'click .trigger-about': function () {
    $('#about.ui.dimmer')
      .dimmer()
      .dimmer('show');
    return false;
  },
  'click .logout.item': function () {
    Meteor.logout();
    return false;
  },
  'click .item.account': function () {
    switchToAccount();
    return false;
  },
  'click .item.home': function () {
    switchToCommunity();
    return false;
  },
  'click #filter .button': function () {
    // lol does nothing right now
    Session.set('minimized', !Session.get('minimized'));
    return false;
  }
});

