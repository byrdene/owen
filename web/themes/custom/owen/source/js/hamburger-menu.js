/**
 * @file
 * A JavaScript file for the hamburger menu.
 *
 */

(function ($) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.hamburgerMenu = {
    attach: function (context) {

      // Attach click function for hamburger toggle.
      var toggleButton = document.getElementById( 'hamburger' );
      // Clicking the button
      // NOTE: need to update this for touchstart?
      toggleButton.onclick = function() {
        $('#navigation-panel').slideToggle(); // open dropdown
        // $('.block-search .block-inner').removeClass('open'); // close search box if open
        // 1. Toggle class "is-active"
        // 2. Set aria-expanded to true or false.
        if ( -1 !== toggleButton.className.indexOf( 'is-active' ) ) {
          toggleButton.className = toggleButton.className.replace( ' is-active', '' );
          toggleButton.setAttribute( 'aria-expanded', 'false' );
        } else {
          toggleButton.className += ' is-active';
          toggleButton.setAttribute( 'aria-expanded', 'true' );
        }
        // close search box if is open
        $('.block-search .block-inner').removeClass('open');
      };

      $('#navigation-panel .wrapper__menu--main > ul.menu').prepend('<li class="mobile-only"><a href="/">Home</a></li>');

      /**
       * Set the main menu submenu accordions for hamburger navigation
       *
       */
      function mainMenuAccordions() {
        // This should apply only if the hamburger menu is in play
        if ( $('#hamburger-navigation').css('display') === 'block' ) {

          // Attach click function for submenu accordion toggle
          $('#navigation-panel .wrapper__menu--main ul.menu li button').each(function() {

            // start with accordions closed (useful for resizing)
            $(this).removeClass('open').attr('aria-expanded', 'false').next('.submenu').attr('aria-hidden', 'true');

            $(this)
              .off(event)
              .on(event, function(e) {
                // Add accordion functionality
                $(this).toggleClass('open').next('.submenu').slideToggle('500');
                // Amend aria values as needed
                if ($(this).hasClass('open')) {
                  $(this).attr('aria-expanded', 'true')
                    .next().attr('aria-hidden', 'false');
                } else {
                  $(this).attr('aria-expanded', 'false')
                    .next().attr('aria-hidden', 'true');
                }
              });
          });

          // Everything should be closed on page load
          $('.submenu').hide();
        }

      }


      // close the menu if the user clicks outside of it or clicks the esc key
      $( document ).on(event, function(e) {
        var container = $("header");

        if ( $('#hamburger-navigation').css('display') === 'block' ) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            // hide the hamburger menu and reset the classes and aria code
            $('#navigation-panel').slideUp();
            toggleButton.className = toggleButton.className.replace( ' is-active', '' );
            toggleButton.setAttribute( 'aria-expanded', 'false' );
          }
        }
      });

      $( document ).on('keydown', function(e) {
        $areaexpandedtrue = $('#hamburger[aria-expanded=true]');

        if ( $('#hamburger-navigation').css('display') === 'block' ) {
          if($areaexpandedtrue.length){
            if ( e.keyCode === 27 ) { // ESC
              // hide the hamburger menu and reset the classes and aria code
              $('#navigation-panel').slideUp();
              toggleButton.className = toggleButton.className.replace( ' is-active', '' );
              toggleButton.setAttribute( 'aria-expanded', 'false' );
              toggleButton.focus();
            }
          }
        }
      });

      // Call function
      mainMenuAccordions();

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          mainMenuAccordions();
        }, 100);
      });

    }
  };

})(jQuery);
