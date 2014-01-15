$(function(){
  function autoResizeDiv() {
    $('.landing_img').height(window.innerHeight +'px');
  }
  window.onresize = autoResizeDiv;
  autoResizeDiv();

  ////
  // function resizeImg() {
  //   $('.landing_img').each(function() {
  //     console.log('called');
  //     var maxWidth = 815; // Max width for the image
  //     var maxHeight = 611;    // Max height for the image
  //     var ratio = 0;  // Used for aspect ratio
  //     var width = $(this).width();    // Current image width
  //     var height = $(this).height();  // Current image height

  //     console.log(width, height)
  //     // Check if the current width is larger than the max
  //     if(width > maxWidth){
  //         console.log('width greater')
  //         ratio = maxWidth / width;   // get ratio for scaling image
  //         $(this).css("width", maxWidth); // Set new width
  //         $(this).css("height", height * ratio);  // Scale height based on ratio
  //         height = height * ratio;    // Reset height to match scaled image
  //         width = width * ratio;    // Reset width to match scaled image
  //     }
  //     console.log(width, height)

  //     // Check if current height is larger than max
  //     if(height > maxHeight){
  //         console.log('height greater')
  //         ratio = maxHeight / height; // get ratio for scaling image
  //         $(this).css("height", maxHeight);   // Set new height
  //         $(this).css("width", width * ratio);    // Scale width based on ratio
  //         width = width * ratio;    // Reset width to match scaled image
  //         height = height * ratio;    // Reset height to match scaled image
  //     }
  //     console.log(width, height)

  //   });
  // }

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
  //   resizeImg();
  // $(window).resize(throttle(resizeImg, 20));
});
