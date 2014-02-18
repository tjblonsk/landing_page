$(function(){

  styleButtons();

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
  window.resizeBannerImage = function() {
    var debug = false;
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

    if (debug){
      console.log('windowHeight', windowHeight);
      console.log('windowWidth', windowWidth);
      console.log('imgHeight', imgHeight);
      console.log('imgWidth', imgWidth);
      console.log('imgAspect', imgAspect);
      console.log('windowAspect', windowAspect);
    }

    if (imgAspect > windowAspect) {
      // img is wider than window
      $img.css({
        'height': windowHeight,
        'width': 'auto'
      });

      marginleft = ($img.width() - windowWidth) / 2;
      marginleftpx = '-' + marginleft + 'px';
      $img.css('margin-left', marginleftpx);
      $img.css('margin-top', 0);
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
      $img.css('margin-left', 0);
    }
    else {
      // window and image are the same size
      $img.css({
        'height': windowHeight,
        'width': windowWidth,
        'margin': 0
      });
    }
  }

  resizeBannerImage();
  $(window).resize(throttle(resizeBannerImage, 10));
  window.addEventListener('orientationchange', resizeBannerImage);
  $('.landing_img').imagesLoaded(function() {
    resizeBannerImage();
  });

});
