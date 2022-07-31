/**
 * @file
 * A JavaScript file for the theme.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.tofuMasonry = {
    attach: function (context) {

      // // init Masonry
      // var $grid = $('.grid').masonry({
      //   columnWidth: '.grid-sizer',
      //   itemSelector: '.grid-item'
      // });

      var $grid = $('.grid').imagesLoaded( function() {
        // init Masonry after all images have loaded
        $grid.masonry({
          columnWidth: '.grid-sizer',
          itemSelector: '.grid-item'
        });
      });

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          // Add code here
        }, 100);
      });

    }
  };

} (Drupal, jQuery));
