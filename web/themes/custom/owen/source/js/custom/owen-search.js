/**
 * @file
 * A JavaScript file for the general search box.
 *
 */

(function ($) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.toggleSearch = {
    attach: function (context) {

      /**
       * Set the search box toggle
       *
       */
      function searchToggle() {

        var $searchIcon = $('.search-button'),
          $searchBox = $('.block-search .block-inner');

        // Attach click function for submenu accordion toggle
        $searchIcon.each(function() {

          $(this)
            .off(event)
            .on(event, function(e) {

              $searchBox.toggleClass( "open").find('.form-item > input').focus();
              // Amend aria values as needed
              if ($searchBox.hasClass('open')) {
                $(this).attr('aria-expanded', 'true');
                $searchBox.attr('aria-hidden', 'false');
              } else {
                $(this).attr('aria-expanded', 'false');
                $searchBox.attr('aria-hidden', 'true');
              }


            });
        });

      }

      // Call function
      searchToggle();


    }
  };

})(jQuery);
