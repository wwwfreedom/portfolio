$( document ).ready(function() {
  smoothScroll(400);

});

// to make the internal link of the one page site scroll smoothly instead of the default jump
function smoothScroll(duration) {
  // looks in the documents for all of the anchor tag with a href that has a # in it the key is the ^ sign.
  $('a[href^="#"]').on('click', function(event){
    // store the attribute of the link that was clicked in a variable
    var target = $( $(this).attr('href'));

    // so if attribute is not just a blank # then animate the body to scroll there
    if(target.length){
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}