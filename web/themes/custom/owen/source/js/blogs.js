/**
 * @file
 * A JavaScript file for the theme.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.owenBlogs = {
    attach: function (context) {
      $( window ).on( "load", function( event) {

        Fancybox.bind("[data-fancybox]", {
          // Options go here
        });

        // put visual link on teaser images without causing accessibility issues
        $('.jquery-link').click(function() {
          window.location = $(this).parent().find('a').attr('href');
          return false;
        })

      });

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          // Add code here
        }, 100);
      });

    }
  };

} (Drupal, jQuery));
