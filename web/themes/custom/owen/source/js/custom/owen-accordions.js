/**
 * @file
 * A JavaScript file to set up accordions.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  /**
   * Set the accordion classes and delay the visibility of content to deal with bullet issue
   * The contrib jQuery plugin, "jquery-accessible-hide-show-aria.js", handles all the accessibility
   * attributes
   *
   */
  function setAccordion() {
    // $('.accordion-group .accordion-header').each(function() {
    //   $(this)
    //     .addClass('js-expandmore')
    //     .attr('data-hideshow-prefix-class','animated');
    // });
    //
    // $('.accordion-group .accordion-content').each(function() {
    //   $(this)
    //     .addClass('js-to_expand');
    // });

    // When accordion-content class is not being added by default
    // $('.accordion-header').each(function() {
    //
    //   $(this)
    //     .addClass('js-expandmore')
    //     .attr('data-hideshow-prefix-class','animated');
    //
    //   if ($(this).nextAll('.accordion-content').length === 0) {
    //     $(this)
    //       .nextUntil('.accordion-header, .accordion-end')
    //       .wrapAll('<div class="accordion-content js-to_expand"></div>');
    //   }
    // });
  }

  // Call function
  // setAccordion();

} (Drupal, jQuery));
