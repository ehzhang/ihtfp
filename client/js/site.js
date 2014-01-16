// Custom javascript for the ihtfp site
$(document).ready(function() {

  // Initialize the toolbar on top.
  $('#toolbar')
    .accordion()
    // Toggle between sizes on hover
    .hover(
      toggleToolbarSize,
      toggleToolbarSize
    );
  ;

  $('#toolbar').duration = 100;

  function toggleToolbarSize() {
//    $('#toolbar').toggleClass("small", 2000);
  }


});

