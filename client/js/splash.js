/**
 *  __ __  __ ______  ____ ____
 *  || ||  || | || | ||    || \\
 *  || ||==||   ||   ||==  ||_//
 *  || ||  ||   ||   ||    ||
 *  -- --  --   --   --    --
 *
 *  Client-side code.
 *
 *  Splash-screen related functions.
 *
 *  Login-Signup related functions are here.
 *
 */
Template.splash.rendered = function () {
  // Number of feels gifs currently in the folder
  var feelsGifs = 8;
  var previousGif = 0;
  function refreshGif() {
    // Grab a random number of that set, but not the previous.
    var num = Math.floor(Math.random() * feelsGifs) + 1;
    // If its a number we just saw, then switch it up.
    num = num == previousGif ? (num < feelsGifs ? num + 1 : num - 1) : num;
    previousGif = num;
    var randomGif = 'url(\'/feels_gifs/' + num + '.gif\')' + ' no-repeat center center fixed';
    $('#splash')
      .css('background', randomGif)
      .css('background-size', 'cover')
      .css('-webkit-background-size', 'cover')
      .css('-moz-background-size', 'cover')
      .css('-o-background-size', 'cover')
  }
  // Call the refresh function once, then refresh every 30 seconds.
  refreshGif();
  setInterval(refreshGif, 30000);

  // Automatically append @mit to the username field
  $.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    });
    return this;
  };
  $(".username").keyup(function () {
    var current_val = $(this).val();
    current_val.length >= 8 ? current_val = current_val.substring(0, current_val.length - 8): false;
    var string = current_val ? current_val + '@mit.edu' : '';
    $(this).val(string);
    $(this).setCursorPosition(current_val.length);
  });
  $('.username').click(function () {
    var current_val = $(this).val();
    current_val.length >= 8 ?
      current_val = current_val.substring(0, current_val.length - 8): false;
    $(this).setCursorPosition(current_val.length);
  });

  // Smooth scroll to anchor
  $('a').click(function(){
    $('body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 800, 'swing');
    return false;
  });
}

// Animate the signup/login forms
Template.signup.rendered = function () {
  $(this.find('.ui.signup.form')).transition('fade down in', '300ms');
}
Template.login.rendered = function () {
  $(this.find('.ui.login.form')).transition('fade down in', '300ms');
}

/**
 * Splash page events
 */
Session.setDefault("firstTime", true);
Template.splash.firstTime = function () {
  return Session.get("firstTime");
}
/**
 * Events for the login/signup section
 */
Template.splash.events({
  'click .toggle.button': function () {
    Session.set("firstTime", !Session.get("firstTime"));
  },
  'click .signup.button': function () {
    var email = $('.username').val();
    var kerberos = email.substring(0, email.length - 8);
    Meteor.call("newUser", kerberos, email);
    $('.username').val("");
    $('.modal').modal('show');

  },
  'keyup .signup .username': function (event) {
    if(event.keyCode == 13) {
      var email = $('.username').val();
      var kerberos = email.substring(0, email.length - 8);
      Meteor.call("newUser", kerberos, email);
      $('.username').val("");
      $('.modal').modal('show');
    }
  },
  'keyup .login .password': function (event) {
    if(event.keyCode == 13) {
      var email = $('.username').val();
      var password = $('.password').val();
      Meteor.loginWithPassword(email, password);
    }
  }
  ,
  'click .login.button': function () {
    var email = $('.username').val();
    var password = $('.password').val();
    Meteor.loginWithPassword(email, password);
  }
})