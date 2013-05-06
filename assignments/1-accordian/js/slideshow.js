var createSlideshow = function(slideshowElem, duration) {
  // default value of duration
  if (typeof duration === 'undefined') {
    duration = 5000;
  }

  var fadeTime = 1000;

  // initialization
  slideshowElem.children().hide();
  slideshowElem.children(':first').fadeIn(fadeTime);

  // timer loop to produce slideshow
  setInterval(function() {
    // only visible child is the current element of the slideshow
    cur = slideshowElem.children().filter(':visible');

    // loop around when reached end
    if (cur.is(':last-child')) {
      next = slideshowElem.children(':first');
    } else {
      next = cur.next();
    }

    // animate
    cur.fadeOut(fadeTime);
    next.fadeIn(fadeTime);
  }, duration);
};

$(document).ready(function() {
  createSlideshow($('.slideshow'));
});
