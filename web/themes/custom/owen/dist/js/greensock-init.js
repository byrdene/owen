gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,TextPlugin),document.addEventListener("DOMContentLoaded",function(){gsap.utils.toArray(".gsap-pinned-background").forEach((r,e)=>{var a=r.querySelectorAll(".pin-wrapper"),t=r.querySelectorAll(".gsap-pinned-image-text");ScrollTrigger.create({trigger:r,pin:a,pinSpacing:!1,start:"top top",endTrigger:t,end:"bottom 40px",toggleActions:"play reverse play reverse"})}),gsap.utils.toArray(".gsap-zoom-image img").forEach((r,e)=>{var a=gsap.fromTo(r,{scale:1},{duration:2,scale:1.5});ScrollTrigger.create({trigger:r,start:"top top",end:"bottom top",scrub:!0,animation:a,toggleActions:"play reverse play reverse"})}),gsap.utils.toArray(".gsap-fadein-up").forEach((r,e)=>{var a=gsap.fromTo(r,{autoAlpha:0,y:100},{duration:1,autoAlpha:1,y:0});ScrollTrigger.create({trigger:r,animation:a,toggleActions:"play reverse play reverse"})})});
//# sourceMappingURL=greensock-init.js.map