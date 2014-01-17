// Custom javascript for the ihtfp site

$(window).load(function(){
  var num = Math.floor(Math.random()*3)+1;
  var randomGif = 'url(\'/feels_gifs/' + num + '.gif\')' + ' no-repeat center center fixed';
  $('#splash').css('background', randomGif).css('background-size', 'cover');
});
