/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Stuff to do when the composer gets rendered!
 *  Admittedly, a lot of this might no longer be used/be useful.
 *  Wait no just kidding it's still useful.
 *  I probably wouldn't touch this since it's all good -Edwin
 */

Session.setDefault("emotion", "happy");

/**
 * The current emotion selected.
 * @returns {emotion}
 */
Template.post.emotion = function () {
  return Session.get("emotion");
}

/**
 * When the post template is rendered, initialize the dropdown emotion selector.
 */
Template.post.rendered = function () {
  // Select the dropdown.
  var $dropdown = $('.ui.emotion.dropdown');
  // Initialize the dropdown!
  $dropdown.dropdown();
}

/**
 * Events for the post template, inside the composer.
 */
Template.post.events({
  'click .emotion.submit.button': function () {
    var username = Meteor.user().username;
    var text = $("textarea").val();
    var emotion = Session.get("emotion");
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('#composer').dimmer('hide');
    $('textarea').val("");
    return false;
  },
  'click .emotion .item': function (event) {
    var emotion = $(event.target).attr('emotion');
    Session.set("emotion", emotion);
  },
  'click .cancel.button': function () {
    $('#composer').dimmer('hide');
    $('textarea').val("");
  }
});
