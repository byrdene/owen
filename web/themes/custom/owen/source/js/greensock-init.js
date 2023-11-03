/**
 * @file
 * A JavaScript file for the theme.
 *
 */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

function init() {

  // create
  let mm = gsap.matchMedia();

  // add a media query. When it matches, the associated function will run
  mm.add("(min-width: 880px)", () => {

    // the animation code would go here
    // gsap.utils.toArray('.gsap-zoom-image img').forEach((elem, i) => {
    //   const anim = gsap.fromTo(elem, { scale: 1 }, { duration: 2, scale: 1.15 });
    //   ScrollTrigger.create({
    //     trigger: elem,
    //     // start: "top bottom", // starts the zoom before the image is pinned
    //     start: "top top",
    //     end: "bottom top",
    //     scrub: true,
    //     animation: anim,
    //     toggleClass: 'active',
    //     toggleActions: 'play reverse play reverse'
    //     // onEnter: () => anim.play(),
    //     // onLeave: () => anim.reverse(),
    //     // onEnterBack: () => anim.play(),
    //     // onLeaveBack: () => anim.reverse()
    //   });
    //
    // });

    return () => { // optional
      // custom cleanup code here (runs when it STOPS matching)
    };
  });

  //pin the image
  gsap.utils.toArray('.gsap-pinned-background').forEach((elem, i) => {
    var thePin= elem.querySelectorAll(".pin-wrapper");
    var theEnd= elem.querySelectorAll(".gsap-pinned-image-text");
    ScrollTrigger.create({
      trigger: elem,
      pin: thePin,
      pinSpacing: false,
      start: 'top top',
      endTrigger: theEnd,
      end: 'bottom 40px',
      // markers: true,
      toggleActions: 'play reverse play reverse'
    });

  });

  //zoom in on the image
  gsap.utils.toArray('.gsap-zoom-image img').forEach((elem, i) => {
    const anim = gsap.fromTo(elem, { scale: 1 }, { duration: 2, scale: 1.5 });
    ScrollTrigger.create({
      trigger: elem,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: anim,
      toggleActions: 'play reverse play reverse'
      // onEnter: () => anim.play(),
      // onLeave: () => anim.reverse(),
      // onEnterBack: () => anim.play(),
      // onLeaveBack: () => anim.reverse()
    });

  });

  // fade in while sliding up
  gsap.utils.toArray('.gsap-fadein-up').forEach((elem, i) => {
    const anim = gsap.fromTo(elem, { autoAlpha: 0, y: 100 }, { duration: 1, autoAlpha: 1, y: 0 });
    ScrollTrigger.create({
      trigger: elem,
      animation: anim,
      toggleActions: 'play reverse play reverse'
      // onEnter: () => anim.play(),
      // onLeave: () => anim.reverse(),
      // onEnterBack: () => anim.play(),
      // onLeaveBack: () => anim.reverse()
    });

  });

}

window.addEventListener('load', function(){
  init();
});


