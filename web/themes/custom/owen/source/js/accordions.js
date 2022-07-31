/**
 * @file
 * A JavaScript file to set up accordions.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.accordions = {
    attach: function (context) {

      /**
       * Set the Collapse functions
       *
       */
      function setAccordions(trigger,block) {

        // Attach click function for button toggle
        $(trigger).each(function() {

          $(this)
            .off(event)
            .on(event, function(e) {
              // Add accordion functionality
              $(this).toggleClass('open').next(block).slideToggle('500');
              // Amend aria values as needed
              if ($(this).hasClass('open')) {
                $(this).attr('aria-expanded', 'true')
                  .next(block).attr('aria-hidden', 'false');
              } else {
                $(this).attr('aria-expanded', 'false')
                  .next(block).attr('aria-hidden', 'true');
              }
            });
        });

        // Everything should be closed on page load
        $(block).hide();
      }

      // Call function
      setAccordions('.accordion__button', '.accordion__content');

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          // code here
        }, 100);
      });

    }
  };

} (Drupal, jQuery));
