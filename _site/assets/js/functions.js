$( document ).ready(function() {
  smoothScroll(400);
  workBelt();
  workLoad();
  clientLogic();

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

function clientLogic() {
  // look for all the client unit and select the first one and assign an active-client class to it
  $('.client-unit').first().addClass('active-client');
  $('.client-logo').first().addClass('active-client');
  $('.client-mobile-nav span').first().addClass('active-client');


  // this anonymous function is to control the click of logo and changes the client testimonials
  $('.client-logo, .client-mobile-nav span').click(function() {
    // store the instance of this so you can refer to the current object this correctly later
    var self = $(this);
    // store the sibblings of the current .client-logo by going up the parent and select the children
    var siblings = self.parent().children();
    // store the position of the children
    var position = siblings.index(self);

    // remove the class 'active-client' from all .client unit that you find, and find the position (eq) of the logo that you just clicked
    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    // same as above but for the logo
    // $('.client-logo').removeClass('active-client').eq(position).addClass('active-client');
    // A BETTER WAY
    // so the sibling variable already store all the children within the div with class .client-logos , so you just use that to remove
    siblings.removeClass('active-client');
    // add the class active client to current selected logo which is the one you just clicked
    self.addClass('active-client');
  });


  // function for next button behaviour
  $('.client-control-next, .client-control-prev').click(function() {
    var self = $(this),
        curActiveClient = $('.clients-belt').find('.active-client'),
        // look through all the children of the div clients-belt and store the index of the curActiveClient
        position = $('.clients-belt').children().index(curActiveClient),
        clientNum = $('.client-unit').length;

    if(self.hasClass('client-control-next')) {

      if(position < clientNum -1) {
      // next here switch over to the next sibbling in the dom
      $('.active-client').removeClass('active-client').next().addClass('active-client');
      } else {
        // otherwise find remove active-client from all elments in the dom in div client belt and after that add active-client class to the first dom element in that div.
        $('.client-unit').removeClass('active-client').first().addClass('active-client');
        $('.client-logo').removeClass('active-client').first().addClass('active-client');
      }
    } else {

      if(position === 0) {
        $('.client-unit').removeClass('active-client').last().addClass('active-client');
        $('.client-logo').removeClass('active-client').last().addClass('active-client');
      } else {
        $('.active-client').removeClass('active-client').prev().addClass('active-client');
      }
    }
  });

}