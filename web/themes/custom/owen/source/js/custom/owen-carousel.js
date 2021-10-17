/**
 * @file
 * This creates the custom carousel/slider used by Theory One Design
 */
(function (Drupal, $) {

  /**
   * Set Gallery Carousel (Gallery Carousel paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setGalleryCarousel(group, item) {
    var $slideshow = $(group);
    $slideshow.each(function(){
      var countItems = $(item, this).length;
      if (countItems > 1) {
        $(this).slick({
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          touchMove: true,
          centerPadding: 0,
          autoplay: false,
          autoplaySpeed: 5000,
          speed: 750,
          zIndex: 40,
          fade: true,
          cssEase: 'linear',
          useCSS: true
        });
      }
    });
  }

  /**
   * Set Gallery Slider (Gallery Slider paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setGallerySlider(group, item) {
    var $slideshow = $(group);
    var $slide = $(item);
    $slideshow.each(function(){
      var $countItems = $slide.length;
      if ($countItems > 4) {
        if (!$(this).hasClass('slick-initialized')) {
          $(this).slick({
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
      }
      if ($countItems < 5) {
        if ($(window).width() > 992) {
          if ($(this).hasClass('slick-initialized')) {
            $(this).slick('unslick');
          }
        } else {
          if (!$(this).hasClass('slick-initialized')) {
            $(this).slick({
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
        }
      }
      if ($countItems < 4) {
        if ($(window).width() > 768) {
          if ($(this).hasClass('slick-initialized')) {
            $(this).slick('unslick');
          }
        } else {
          if (!$(this).hasClass('slick-initialized')) {
            $(this).slick({
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
        }
      }
      if ($countItems < 3) {
        if ($(window).width() > 480) {
          if ($(this).hasClass('slick-initialized')) {
            $(this).slick('unslick');
          }
        } else {
          if (!$(this).hasClass('slick-initialized')) {
            $(this).slick({
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
      }

    });
  }

  /**
   * Set Gallery Slider (Gallery Slider paragraph types, for one)
   * For configuration see http://kenwheeler.github.io/slick/
   */
  function setCardDeckSlider(group, item) {
    var $slideshow = $(group);
    var $slide = $(item);
    $slideshow.each(function(){
      var $countItems = $slide.length;
      if ($countItems > 3) {
        if (!$(this).hasClass('slick-initialized')) {
          $(this).slick({
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
      if ($countItems < 4) {
        $(this).slick('unslick');
      }
    });
  }


  function initAllCarousel() {
    // setResponsiveCarousel('.entityqueue-carousel > .view-content', '.views-row');
    setGalleryCarousel('.section--type-gallery-carousel .field--name-field-images.field__items', '.field__item');
    setGallerySlider('.section--type-gallery-slider .field--name-field-images.field__items', '.section--type-gallery-slider .field--name-field-images.field__items .field--name-field-images.field__item');
    setCardDeckSlider('.section--type-card-deck .field--name-field-cards.field__items', '.section--type-card-deck .field--name-field-cards.field__items .field--name-field-cards.field__item');

  }

  initAllCarousel();


  // If slideshow needs to be reinitialized at different breakpoints, add it here:
  $( window ).on( "resize orientationchange", function( event ) {
    setTimeout(function( event ) {
      setGallerySlider('.section--type-gallery-slider .field--name-field-images.field__items', '.section--type-gallery-slider .field--name-field-images.field__items .field--name-field-images.field__item');
      setCardDeckSlider('.section--type-card-deck .field--name-field-cards.field__items', '.section--type-card-deck .field--name-field-cards.field__items .field--name-field-cards.field__item');
    }, 100);
  });

})(Drupal, jQuery);
