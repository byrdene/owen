/**
 * @file
 * Smooth scrolling.
 *
 */
(function (Drupal, $) {

  Drupal.behaviors.smoothScroll = {
    attach: function (context) {

      // Anchor link navigation
      $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - 20
        }, 750);

        // close menu too
        var toggleButton = document.getElementById( 'hamburger' );
        $('#navigation-panel').slideUp();
        toggleButton.className = toggleButton.className.replace( ' is-active', '' );
        toggleButton.setAttribute( 'aria-expanded', 'false' );

        // hide sticky header but do it after the sticky header functions run
        // $('.sticky-header').addClass('hide-nav');

      });


      $(window).scroll(function() {
        if($(this).scrollTop() < 150) {
          // $("#scroll-top-wrapper").removeClass("visible");
          $("#scroll-top-wrapper").slideUp();
        }
        else {
          // $("#scroll-top-wrapper").addClass("visible");
          $("#scroll-top-wrapper").slideDown();
        }
      })

      // back to top scroll button
      $("#scroll-top").click(function() {
        $('html, body').animate({ scrollTop: 0 }, 750);
      });

    }
  };

} (Drupal, jQuery));
