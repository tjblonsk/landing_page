$(function(){
  /*
   * Throttle functions, stolen from underscore.js
   */
  var throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
    };
    return function() {
        var now = new Date;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
  };


  /*
   * Homepage image
   */
  function resizeBannerImage() {
    var $img = $('.landing_img');
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var imgHeight = $img.prop('height');
    var imgWidth = $img.prop('width');
    var marginleft;
    var marginTop;
    var marginleftpx;
    var marginToppx;

    var imgAspect = imgWidth / imgHeight;
    var windowAspect = windowWidth / windowHeight;

    if (imgAspect > windowAspect) {
      // img is wider than window
      $img.css({
        'height': windowHeight,
        'width': 'auto'
      });
      
      marginleft = ($img.width() - windowWidth) / 2;
      marginleftpx = '-' + marginleft + 'px';
      $img.css('margin-left', marginleftpx);
    }
    else if (imgAspect < windowAspect) {
      // window is wider than img
      $img.css({
        'height': 'auto',
        'width': windowWidth,
        'margin-left': 0
      });
      marginTop = ($img.height() - windowHeight) / 2;
      marginToppx = '-' + marginTop + 'px';
      $img.css('margin-top', marginToppx);
    }
    else {
      // window and image are the same size
      $img.css({
        'height': windowHeight,
        'width': windowWidth
      });
    }
  }

  resizeBannerImage();
  $(window).resize(throttle(resizeBannerImage, 20));
  $('.landing_img').imagesLoaded(function() {
    resizeBannerImage();
  });

});
