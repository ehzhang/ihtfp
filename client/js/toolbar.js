// Custom javascript for the toolbar
$(document).ready(function() {

  // Initialize the toolbar on top.
  var toolbarOpen = true;
  var toolbarDuration = 300;
  $('#toolbar')
    .accordion({duration: toolbarDuration, collapsible: false, debug: false})
    .accordion({
      onOpen:
        function() {
          toolbarOpen = true;
        },
      onClose:
        function() {
          toolbarOpen = false;
        }})

  var prevOnGrid = false;
  $(window).scroll(function(){
    var gridTop = $('#grid').offset().top;
    var position = $(this).scrollTop();

    var onGrid = position >= gridTop;
    var setPos = onGrid ? 'fixed' : 'absolute' ;

    // Set the toolbar fixed when you scroll down
    $('#toolbar').css({position: setPos})

    var trigger = prevOnGrid != onGrid;
    var onGridTrigger = trigger && onGrid == true;
    var offGridTrigger = trigger && onGrid == false;

    if (trigger) {
      $('#toolbar')
        .accordion({collapsible: onGrid})

      if (onGridTrigger) {
        // Close it immediately, then drop it down from the top.
        $('#toolbar')
          .accordion({duration: 0})
          .accordion('close', 0)
          .accordion({duration: toolbarDuration})
          .transition('fade down in', '500ms');
      }

      if (offGridTrigger) {
        // Fade that shit in!
        $('#toolbar')
          .accordion({duration: 0})
          .accordion('open', 0)
          .accordion({duration: toolbarDuration})
          .transition('fade up in', '500ms');

      }
    }

    prevOnGrid = onGrid;
  });

});
