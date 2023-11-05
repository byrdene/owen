/**
 * @file
 * A JavaScript file for the theme.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.tofuFancybox = {
    attach: function (context) {

      Fancybox.bind("[data-fancybox]", {
        // Options go here
        on: {
          reveal: (fancybox, slide) => {
            // The content of this slide is loaded and ready to be revealed
            console.log(
              "The content of the current slide is loaded and revealed"
            );
          },
        },
      });


      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          // Add code here
        }, 100);
      });

    }
  };

} (Drupal, jQuery));
