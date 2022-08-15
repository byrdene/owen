/**
 * @file
 * A JavaScript file for the theme.
 *
 */

(function (Drupal, $) {

  var event = (navigator.userAgent.match(/iPhone/i)) ? "touchstart" : "click";

  Drupal.behaviors.tofuGeneral = {
    attach: function (context) {

      // Uncomment to open external links in new windows
      // $(document.links).filter(function() {
      //   return this.hostname !== window.location.hostname;
      // }).attr('target', '_blank');

      // Add class to wrapper around the Reset button provided with exposed filters
      // (Ideally add the class via a hook or twig files)
      $reset = $("input[data-drupal-selector*='edit-reset']");
      if ($reset.length > 0) {
        $reset.parent().addClass('reset-button');
      }

      // Accessibilty & Filtered Views
      // 1. Give focus to the "no results" message.
      // Note: The class, "filter-no-results", needs to be added via the twig file
      $filterResults = $('.filter-no-results');
      if ($filterResults.length > 0) {
        $filterResults.focus();
      }
      // 2. Add class to body when user clicks Apply button. Remove the class when they click the Reset button.
      // Note: The view needs to have Ajax turned on. Otherwise, add the class to the body by checking
      // for the presence of ".form-active-filters" on the exposed filter form (class added via the custom project
      // utilities module)
      $(".bef-exposed-form .submit-button:not(.reset-button) .form-submit").click(function(){
        $("body").addClass('filters-applied');
      });

      $(".bef-exposed-form .submit-button.reset-button .form-submit").click(function(){
        $("body").removeClass('filters-applied');
      });
      // 3. Give focus to the the "total results" message that is either created in Views UI or in the relevant twig files
      $("body.filters-applied .filtered-results").focus(); // 'filtered-results' should be applied in Views UI or in twig files
      $(".view-database-search .filtered-results").focus(); // 'filtered results' applied in Views UI

      $( window ).on( "load", function( event) {

        // Remove the .fouc class that was added to elements to prevent the flash-of-unstyled-content
        $(".slick-initialized.fouc").removeClass("fouc");

        // update the fancybox gallery attr to include slide index so our "galleries"
        // don't include the videos from cloned slides
        if (".slick-initialized") {
          $('.highlight-carousel-wrapper .slick-slide').each(function () {
            var index = $( '.highlight-carousel-wrapper .slick-slide' ).index( this );
            $( this ).find('.video-source-link a').attr('data-fancybox', 'highlights-' + index);
          });
        }

      });

      $( window ).on( "load resize orientationchange", function( event ) {
        setTimeout(function( event ) {
          // Add code here
        }, 100);
      });

    }
  };

} (Drupal, jQuery));
