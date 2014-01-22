/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Javascript specific to the post template.
 *  This template acts as a standalone template to post feels.
 *
 */

Session.setDefault("emotion", "happy");

Template.post.emotion = function () {
  return Session.get("emotion");
}

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
    var username = Meteor.user.username;
    var text = $("textarea").val();
    var emotion = Session.get("emotion");
    Meteor.call("postFeel", username, text, emotion);
    // reset post stuff
    $('#composer').accordion('close', 0);
    $('textarea').val("");
    return false;
  },
  'click .emotion .item': function (event) {
    var emotion = $(event.target).attr('emotion');
    Session.set("emotion", emotion);
  },
  'click .cancel.button': function () {
    $('#composer').accordion('close', 0);
    $('textarea').val("");
  }
});