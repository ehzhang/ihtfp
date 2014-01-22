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

/**
 * Events for the post template, inside the composer.
 */
Template.post.events({
  'click .emotion.submit.button': function (event) {
    var username = Meteor.user.username;
    var text = $("textarea").val();
    var emotion = $(event.target).attr('emotion');
    console.log(emotion);
    Meteor.call("postFeel", username, text, emotion);
//    reset post stuff
    $('textarea').val("");
    return false;
  }
});

Template.composer.rendered = function () {
  // Initialize the composer on top.
  var composerDuration = 300;
  var $composer = $(this.find('#composer'));
  $composer
    .accordion({
      duration: composerDuration
    })
    .transition('fade down in', '400ms');

  var prevOnGrid = false;
  $(window).scroll(function(){
    var gridTop = $('#grid').offset().top;
    var position = $(this).scrollTop();

    var onGrid = position >= gridTop;
    var setPos = onGrid ? 'fixed' : 'absolute' ;

    // Set the composer fixed when you scroll down
    $composer.css({position: setPos})

    var trigger = prevOnGrid != onGrid;
    var onGridTrigger = trigger && onGrid == true;
    var offGridTrigger = trigger && onGrid == false;

    // Activates when the user scrolls onto the grid
    if (onGridTrigger) {
      // Close it immediately, then drop it down from the top.
      $composer
        .accordion({duration: 0})
        .accordion('close', 0)
        .accordion({duration: composerDuration})
        .transition('fade down in', '400ms');
    }

    // Activates when the user scrolls off the grid
    if (offGridTrigger) {
      // Fade that shit in!
      $composer
        .accordion({duration: 0})
        .accordion('close', 0)
        .accordion({duration: composerDuration});
//      $header.transition('fade up in', '1000ms');
    }
    prevOnGrid = onGrid;
  });
}
