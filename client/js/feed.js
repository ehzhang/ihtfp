// Global container, msnry
var container, msnry;

Template.grid.rendered = function () {
  container = document.querySelector('#grid');
  msnry = new Masonry( container, {
    // options
    columnWidth: 50,
    itemSelector: '.feel',
    gutter: 25,
    isFitWidth: true
  });
}

// Add lazy load to the grid
$('#grid').ready(function () {
  //  Add a scroll handler to detect reaching the bottom of the page.
  //  Throttle the function so it doesn't fire so often!
  $(window).scroll(_.throttle(
    function() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        Session.set("limit", Session.get("limit") + 15);
      }
    }, 400));
});

// Code to execute when feels are rendered.
// This gives big feels the ability to expand in size
Template.feel.rendered = function () {
  // Find the feel class
  $(this.find('.feel'))
    .addClass('opaque')
    .click(function () {
      // Check if the feel is big or not.
      // If its big, it has the opportunity to be giant!
      var $feel = $(this);
      if ($feel.hasClass('big')) {
        // Remove any that are giant at the moment.
        // Only embiggen the one selected
        $feel.toggleClass('max')
        // Reorganize the msnry layout
        msnry.layout();
      }
  })
}

/**
 * Events related to the main-feed
 *
 * Namely: debug button acts a logout button
 */
Template.debug.events({
  'click .debug.button' : function () {
    Meteor.logout();
}
});