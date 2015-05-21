$( document ).ready(function() {
  smoothScroll(400);
  workBelt();
  workLoad();

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

// this function is responsible for getting back and forth between the thumbnail and the work section by activating a bit of css trickery
function workBelt () {

  // look for all the thumb unit
  $('.thumb-unit').click(function(event) {
    event.preventDefault();
    $('.work-belt').css('left', '-100%');
    $('.work-container').show();
  });

  $('.work-return').click(function() {
    $('.work-belt').css('left', '0%');
    $('.work-container').hide(800);
  });
}

function workLoad() {
  // use this for static asset only not random stuff that only appear once
  $.ajaxSetup({ cache: true });

  $('.thumb-unit').click(function() {
    // event.preventDefault();
    // this is to cache the this and 'this' in this case is the thumb-unit div part 11, at 13.57mins in
    var $this = $(this);
    // find the text that is in the strong tag
    var newTitle = $this.find('strong').text();
    var newFolder = $this.data('folder');
    var spinner = '<div class="loader">Loading...</div>';
    var newHTML = '/work/'+ newFolder + '.html';

    $('.project-load').html(spinner).load(newHTML);
    $('.project-title').text(newTitle);
  });
}