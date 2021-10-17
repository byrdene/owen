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
      };

      // Add home link to navigation panel
      $('#navigation-panel .menu--main ul.menu').prepend('<li><a href="/">Home</a></li>');

      // Create the structure for the submenu accordions with buttons for toggling all the necessary aria attributes
      // $('#navigation-panel .menu--main ul.menu li > span').each(function() {
      //   $(this)
      //     .wrap( "<button class='submenu__trigger' aria-expanded='false' aria-controls='" + $(this).text().replace(/\s+/g, '-').toLowerCase() + "-submenu' id='" + $(this).text().replace(/\s+/g, '-').toLowerCase() + "-submenu-controls'></button>" )
      //     .parent().next('ul').attr('aria-hidden', 'true')
      //     .attr('id', $(this).text().replace(/\s+/g, '-').toLowerCase() + '-submenu')
      //     .addClass('submenu');
      // });


      /**
       * Set the main menu submenu accordions
       *
       */
      // function mainMenuAccordions() {
      //
      //   // Attach click function for submenu accordion toggle
      //   $('#navigation-panel .menu--main ul.menu li button').each(function() {
      //
      //     $(this)
      //       .off(event)
      //       .on(event, function(e) {
      //         // Add accordion functionality
      //         $(this).toggleClass('open').next('.submenu').slideToggle('500');
      //         // Amend aria values as needed
      //         if ($(this).hasClass('open')) {
      //           $(this).attr('aria-expanded', 'true')
      //             .next().attr('aria-hidden', 'false');
      //         } else {
      //           $(this).attr('aria-expanded', 'false')
      //             .next().attr('aria-hidden', 'true');
      //         }
      //       });
      //   });
      //
      //   // Everything should be closed on page load
      //   $('.submenu').hide();
      // }

      // Call function
      // mainMenuAccordions();

      // close the menu if the user clicks outside of it or clicks the esc key
      $( document ).on(event, function(e) {
        var container = $(".hamburger-navigation");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          // hide the hamburger menu and reset the classes and aria code
          $("#navigation-panel").slideUp();
          toggleButton.className = toggleButton.className.replace( ' is-active', '' );
          toggleButton.setAttribute( 'aria-expanded', 'false' );
        }
      });

      $( document ).on('keydown', function(e) {
        $areaexpandedtrue = $('#hamburger[aria-expanded=true]');
        if($areaexpandedtrue.length){
          if ( e.keyCode === 27 ) { // ESC
            // hide the hamburger menu and reset the classes and aria code
            $("#navigation-panel").slideUp();
            toggleButton.className = toggleButton.className.replace( ' is-active', '' );
            toggleButton.setAttribute( 'aria-expanded', 'false' );
            toggleButton.focus();
          }
        }
      });


    }
  };

})(jQuery);
