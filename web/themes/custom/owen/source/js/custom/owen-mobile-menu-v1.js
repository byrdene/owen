/**
 * @file
 * A JavaScript file for the mobile menu - version 1.
 * Superfish creates the mobile menu. We append the secondary menu options.
 *
 */

(function ($) {
  Drupal.behaviors.mobileMenu = {
    attach: function (context) {

      $(window).on('load resize orientationchange', function () { // the SF accordion menu needs to load first

        setTimeout(function( event ) {
          //Add the secondary menu options to the mobile menu
          if ($('.secondary-nav-item').length < 1) {
            $('.menu--secondary li.menu-item').each( function() {
              $("#superfish-main-accordion").append(
                $(this).clone().addClass('secondary-nav-item')
              );
            });
          }

          // Accessibility: add class to parent ul when mobile menu secondary subnav link has focus
          $('.sf-accordion > .menuparent ul li a').focus(function(){
            $(this).parent().parent().addClass('show-subnav');
          }).blur(function(){
            $(this).parent().parent().removeClass('show-subnav');
          });

          // Accessibility: add class to parent and grandparent ul when mobile menu tertiary subnav link has focus
          $('.sf-accordion > .menuparent ul .menuparent ul li a').focus(function(){
            $(this).parent().parent().parent().parent().addClass('show-subnav');
            $(this).parent().parent().addClass('show-subnav');
          }).blur(function(){
            $(this).parent().parent().parent().parent().removeClass('show-subnav');
            $(this).parent().parent().removeClass('show-subnav');
          });


        }, 100);

      });

    }
  };
})(jQuery);
