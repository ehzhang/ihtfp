/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Stuff to do when the toolbar gets rendered!
 *  Admittedly, a lot of this might no longer be used/be useful.
 *  Wait no just kidding it's still useful.
 *  I probably wouldn't touch this since it's all good -Edwin
 */
Template.toolbar.rendered = function () {
  // Initialize the toolbar on top.
  var toolbarDuration = 300;
  var $toolbar = $(this.find('#toolbar'));
  $toolbar
    .accordion({
      duration: toolbarDuration
    })
    .transition('fade down in', '400ms');

  var prevOnGrid = false;
  $(window).scroll(function(){
    var gridTop = $('#grid').offset().top;
    var position = $(this).scrollTop();

    var onGrid = position >= gridTop;
    var setPos = onGrid ? 'fixed' : 'absolute' ;

    // Set the toolbar fixed when you scroll down
    $toolbar.css({position: setPos})

    var trigger = prevOnGrid != onGrid;
    var onGridTrigger = trigger && onGrid == true;
    var offGridTrigger = trigger && onGrid == false;

    // Activates when the user scrolls onto the grid
    if (onGridTrigger) {
      // Close it immediately, then drop it down from the top.
      $toolbar
        .accordion({duration: 0})
        .accordion('close', 0)
        .accordion({duration: toolbarDuration})
        .transition('fade down in', '400ms');
    }

    // Activates when the user scrolls off the grid
    if (offGridTrigger) {
      // Fade that shit in!
      $toolbar
        .accordion({duration: 0})
        .accordion('close', 0)
        .accordion({duration: toolbarDuration});
//      $header.transition('fade up in', '1000ms');
    }
    prevOnGrid = onGrid;
  });
}
