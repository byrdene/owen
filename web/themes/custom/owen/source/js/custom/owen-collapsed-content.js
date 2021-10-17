/**
 * @file
 * A JavaScript file to set up accordions.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  /**
   * Set the Collapse functions
   *
   */
  function setCollapse(trigger,block) {

    // Attach click function for button toggle
    $(trigger).each(function() {

      $(this)
        .off(event)
        .on(event, function(e) {
          // $(this).toggleClass('open').next('#banner-caption').slideDown();
          // Add accordion functionality
          $(this).toggleClass('open').next(block).slideToggle('500');
          // Amend aria values as needed
          if ($(this).hasClass('open')) {
            $(this).attr('aria-expanded', 'true')
            // .find('span').html('Less')
              .next(block).attr('aria-hidden', 'false');
          } else {
            $(this).attr('aria-expanded', 'false')
            // .find('span').html('More')
              .next(block).attr('aria-hidden', 'true');
          }
        });
    });

    // Everything should be closed on page load
    $(block).hide();
  }

  // Call function
  setCollapse('button.collapsed-text-trigger', '.data-collapse');

} (Drupal, jQuery));
