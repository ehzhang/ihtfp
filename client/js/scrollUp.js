// Javascript for the scrollUp button

$(document).ready(function () {
  // Add a handler to the window on scroll
  var $scrollUp = $('.scrollUp');
  $scrollUp.click(function () {
    $('html, body').animate({scrollTop: 0}, 500, 'swing');
  });

  $(window).scroll(function () {
    // When the user scrolls past one window's height from the top,
    // make the scrollup button visible.
    var position = $(this).scrollTop();
    if (position > $(window).height()) {
      if (!$scrollUp.hasClass('visible')) {
        $scrollUp.addClass('visible');
      }
    } else {
      $scrollUp.removeClass('visible');
    }
  });
});