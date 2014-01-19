Template.grid.rendered = function () {
  var container = document.querySelector('#grid');
  var msnry = new Masonry( container, {
    // options
    columnWidth: 50,
    itemSelector: '.feel',
    gutter: 25,
    isFitWidth: true
  });
}

Template.feel.rendered = function () {
  $(this.find('.feel')).addClass('fadein');
}