// Custom javascript for the toolbar
$(document).ready(function() {

  // Initialize the toolbar on top.
  var toolbarDuration = 300;
  $toolbar = $('#toolbar')
    .accordion({
      duration: toolbarDuration,
      collapsible: false
    })

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
        .transition('fade down in', '500ms');
    }

    // Activates when the user scrolls off the grid
    if (offGridTrigger) {
      // Fade that shit in!
      $toolbar
        .accordion({duration: 0, collapsible: false})
        .accordion('open', 0)
        .transition('fade up in', '500ms');

    }


    prevOnGrid = onGrid;
  });

});
