/**
 * @file
 * A JavaScript file for the theme.
 *
 */

(function ($) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.filterDropdowns = {
    attach: function (context) {

      function setFilterDropdown() {
        $('.filter-dropdown .dropdown-header').each(function() {

          $(this)
            .attr('tabIndex','0') // allow keyboard access
            .off(event)
            .on(event, function() {
              $(this).toggleClass('open').next('.dropdown-content').slideToggle('500');
              // But "reset" any other filter that might already be open
              $('.filter-dropdown .dropdown-header').not(this).removeClass('open')
                .next('.dropdown-content').hide();
            });

          // Accessibility - Open the dropdown with enter key if header has keyboard focus
          $(this).keyup(function(e){
            if(e.which === 13){ //13 is the char code for Enter
              $(this).click();
            }
          });
        });

        if ($('.dropdown-header.open').length < 1) {
          $('.filter-dropdown .dropdown-content').hide();
        }

      }

      function flagFilter(arg) {
        $(arg).each(function() {
          $(this).addClass('filter-dropdown');
          $(this).find('legend').addClass('dropdown-header')
            .next('.fieldset-content').addClass('dropdown-content');
        });
      }

      flagFilter('fieldset[data-drupal-selector="edit-field-ma-ste-standards-target-id"]');
      flagFilter('fieldset[data-drupal-selector="edit-field-grades-target-id"]');
      flagFilter('fieldset[data-drupal-selector="edit-field-workshop-format-target-id"]');

      setFilterDropdown();

    }
  };

})(jQuery);
