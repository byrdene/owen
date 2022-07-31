/**
 * @file
 * This creates the custom carousel/slider used by Theory One Design
 */
(function (Drupal, $) {

  var $controls = '<button class="controls pause-slick" aria-label="Pause automatic slideshow">Pause slideshow</button>';

  /**
   * Set Gallery Carousel (Gallery Carousel paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setGalleryCarousel(group, item) {
    var $slideshow = $(group);
    var $slide = $(item);
    var countItems = $slideshow.children($slide).length;
    if (countItems > 1) {
      $slideshow.slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        touchMove: true,
        centerPadding: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 750,
        zIndex: 40,
        fade: true,
        cssEase: 'linear',
        useCSS: true
      });
    }

    var $activatedSlider = $('.active-controllers.slick-slider');

    if (($activatedSlider.length > 0) && ($('.controls-wrapper').length < 1)) {
      $activatedSlider.prepend($controls);
      $('.active-controllers.slick-slider button').wrapAll("<div class='controls-position' />");
      $('.controls-position').wrapAll("<div class='controls-wrapper' />");
      $activatedSlider.wrap( "<section aria-label='Slideshow of featured images' />");
    }
  }

  /**
   * Set Gallery Slider (Gallery Slider paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setGallerySlider(group, item) {
    var $slideshow = $(group);
    var $slide = $(item);
    var countItems = $slideshow.children($slide).length;

    if (countItems > 4) {
      $slideshow.slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrow: true,
        cssEase: 'linear',
        infinite: false,
        useCSS: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          }
        ]
      });
    }
    if (countItems < 5) {
      $slideshow.slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrow: true,
        cssEase: 'linear',
        infinite: false,
        useCSS: true,
        responsive: [
          {
            breakpoint: 992,
            settings: "unslick" // destroys slick
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          }
        ]
      });
    }
    if (countItems < 4) {
      $slideshow.slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrow: true,
        cssEase: 'linear',
        infinite: false,
        useCSS: true,
        responsive: [
          {
            breakpoint: 992,
            settings: "unslick" // destroys slick
          },
          {
            breakpoint: 768,
            settings: "unslick" // destroys slick
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          }
        ]
      });
    }
    if (countItems < 3) {
      $slideshow.slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrow: true,
        cssEase: 'linear',
        infinite: false,
        useCSS: true,
        responsive: [
          {
            breakpoint: 992,
            settings: "unslick" // destroys slick
          },
          {
            breakpoint: 768,
            settings: "unslick" // destroys slick
          },
          {
            breakpoint: 480,
            settings: "unslick" // destroys slick
          }
        ]
      });
    }
  }

  /**
   * Set Gallery Slider (Gallery Slider paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setCardDeckSlider(group, item) {
    var $slideshow = $(group);
    var $slide = $(item);
    var countItems = $slideshow.children($slide).length;

    if (countItems > 3) {
      $slideshow.slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrow: true,
        cssEase: 'linear',
        infinite: false,
        useCSS: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              centerMode: false,
              arrow: true,
            }
          }
        ]
      });
    }
  }


  function initAllCarousel() {
    setGalleryCarousel('.homepage-slides', '.slide-item');
    setGalleryCarousel('.featured-media-wrapper', '.slide-item');
    // setGallerySlider('.component--type-gallery-slider .gallery-wrapper', '.gallery-item');
    // setGalleryCarousel('.component--type-gallery-carousel .gallery-wrapper', '.gallery-item');
    // setCardDeckSlider('.component--type-card-deck .card-deck-wrapper', '.card-item');
  }

  // randomization function
  $.fn.shuffle = function() {

    var allElems = this.get(),
      getRandom = function(max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function(){
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);

  };

  // randomize homepage slide images
  // $('.node--type-homepage .hero-image-wrapper .hero-image').shuffle();

  initAllCarousel();

  $('.active-controllers.slick-slider button.controls').click( function() {
    if ($(this).hasClass('pause-slick')) {
      $('.active-controllers.slick-slider').slick('slickPause');
      $(this).html('Play slideshow');
      $(this).removeClass('pause-slick');
      $(this).addClass('play-slick');
      $(this).attr('aria-label', 'Play automatic slideshow');
    } else {
      $('.active-controllers.slick-slider').slick('slickPlay');
      $(this).html('Pause slideshow');
      $(this).removeClass('play-slick');
      $(this).addClass('pause-slick');
      $(this).attr('aria-label', 'Pause automatic slideshow');
    }
  });


  // If slideshow needs to be reinitialized at different breakpoints, add it here:
  $( window ).on( "resize orientationchange", function( event ) {
    setTimeout(function( event ) {
      // setGallerySlider('.component--type-gallery-slider .gallery-wrapper', '.gallery-item');
      // setCardDeckSlider('.component--type-card-deck .gallery-wrapper', '.gallery-item');
    }, 100);
  });

})(Drupal, jQuery);
