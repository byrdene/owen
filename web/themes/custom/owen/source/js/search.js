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
          $searchBox = $('.block-search .block-inner'),
          $hamburger = $('#hamburger');

        // Attach click function for submenu accordion toggle
        $searchIcon.each(function() {

          $(this)
            .off(event)
            .on(event, function(e) {

              $searchBox.toggleClass( "open");
              // Amend aria values as needed
              if ($searchBox.hasClass('open')) {
                $(this).attr('aria-expanded', 'true');
                $searchBox.attr('aria-hidden', 'false');
                $searchBox.find('.form-item-search-api-fulltext > input').focus();
              } else {
                $(this).attr('aria-expanded', 'false');
                $searchBox.attr('aria-hidden', 'true');
              }

              // close navigation panel if the hamburger menu is in use and is active
              if (($hamburger.hasClass('is-active')) && ($('#hamburger-navigation').css('display') === 'block' )) {
                $("#navigation-panel").slideUp();
                $hamburger.removeClass('is-active');
                $hamburger.attr( 'aria-expanded', 'false' );
              }

            });
        });

      }

      // Call function
      searchToggle();


    }
  };

})(jQuery);
