/**
 * @file
 * A JavaScript file for the hamburger menu.
 *
 */

(function ($) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.accessibleMenus = {
    attach: function (context) {

      $('#navigation-panel .wrapper__menu--main ul.menu li > button').each(function() {
        var buttonText = "<span>" + $(this).text() + "</span>";
        var linkIdentifier = $(this).text().replace(/\s+/g, '-').toLowerCase();

        $(this)
          .html(buttonText)
          .addClass('submenu__trigger')
          .attr('aria-expanded', 'false')
          .attr('aria-controls', linkIdentifier + '-submenu')
          .attr('id', linkIdentifier + '-submenu-controls')
          // .next('ul').attr('aria-hidden', 'true') // for simple dropdown
          .next('.megamenu').attr('aria-hidden', 'true') // for megamenu
          .attr('id', linkIdentifier + '-submenu')
          .addClass('submenu');
      });

      function menuType() {
        var navPanel = $('#navigation-panel');
        // flag menu type for styling
        if ( $('#hamburger-navigation').css('display') === 'block' ) {
          navPanel.addClass('hamburger-menu');
          navPanel.removeClass('dropdown-menu');
        } else {
          navPanel.addClass('dropdown-menu');
          navPanel.removeClass('hamburger-menu');
        }
      }

      // Dropdown menus need to accommodate keyboard navigation
      function dropDownMenus() {
        // target when hamburger is not in use
        if ( $('#hamburger-navigation').css('display') === 'none' ) {
          // Attach click function to submenu trigger
          $('.submenu__trigger').each(function() {


            // start with submenus closed (useful for resizing)
            $(this).attr('aria-expanded', 'false').next('.submenu').attr('aria-hidden', 'true').parent().removeClass('expanded-dropdown');

            $(this)
              .off(event)
              .on(event, function(e) {
                // Add accordion functionality
                $(this).parent().toggleClass('expanded-dropdown');
                // Amend aria values as needed
                if ($(this).parent().hasClass('expanded-dropdown')) {
                  $(this).parent().removeClass('not-expanded');
                  $(this).attr('aria-expanded', 'true')
                    .next().attr('aria-hidden', 'false');
                } else {
                  $(this).parent().addClass('not-expanded');
                  $(this).attr('aria-expanded', 'false')
                    .next().attr('aria-hidden', 'true');
                }

                $('.submenu__trigger').not(this).parent().removeClass('expanded-dropdown');
                $('.submenu__trigger').not(this).attr('aria-expanded', 'true').next().attr('aria-hidden', 'false');

              });
          });

          // submenus should have any inline styles removed that might be there from resizing from hamburger menu
          $('.submenu').removeAttr('style');
        }
      }

      // close the submenus if the user clicks outside of them
      $( document ).on(event, function(e) {
        var container = $("#navigation-panel");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          // hide the menus by resetting the classes and aria code
          $('.submenu__trigger').each(function() {
            $(this).parent().removeClass('expanded');
            $(this).parent().removeClass('not-expanded');
          });
        }
      });

      // Call function
      menuType();
      dropDownMenus();

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          menuType();
          dropDownMenus();
        }, 100);
      });

    }
  };

})(jQuery);
