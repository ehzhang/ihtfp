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
 *
 */
Template.post.events({
  'click .emotion.submit.button': function () {
    var username = Meteor.user().username,
        text = $("textarea").val();
    // Quick validate text length on client side
    if (text.length > 1200) {
      return false;
    }
    var emotion = Session.get("emotion");
    Meteor.call("postFeel", username, text, emotion,
      function(error, result) {
        if (result[0]) {
          // Successful post!
          // reset post stuff
          $('#composer').dimmer('hide');
          $('textarea').val("");
        } else {
          // In case of error, get the error.
          $('#post-warning').html(result[1]);
          $('.emotion.editor .field').addClass("error");
        }
      });
    return false;
  },
  'click .emotion .item': function (event) {
    var emotion = $(event.target).attr('emotion');
    Session.set("emotion", emotion);
    return false;
  },
  'click .cancel.button': function () {
    $('#composer')
      .dimmer('hide');
    $('textarea').val("");
    $('#post-warning').html("");
    $('.emotion.editor .field').removeClass("error");
    return false;
  },
  'keyup .emotion.editor .field' : function () {
    // Error handling for invalid posts.
    var $emotionEditor = $('textarea'),
        $submitButton = $('.emotion.submit.button'),
        $postWarning = $('#post-warning');
    if ($emotionEditor.val().length > 1200) {
      $postWarning.text('Your feel exceeds the character limit!');
      $emotionEditor.parent().addClass("error");
      $submitButton.addClass("disabled");
    } else {
      $postWarning.text("");
      $emotionEditor.parent().removeClass("error");
      $submitButton.removeClass("disabled");
    }
    return false;
  }
});
