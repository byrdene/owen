!function(a){Drupal.behaviors.mobileMenu={attach:function(n){a(window).on("load resize orientationchange",function(){setTimeout(function(n){a(".secondary-nav-item").length<1&&a(".menu--secondary li.menu-item").each(function(){a("#superfish-main-accordion").append(a(this).clone().addClass("secondary-nav-item"))}),a(".sf-accordion > .menuparent ul li a").focus(function(){a(this).parent().parent().addClass("show-subnav")}).blur(function(){a(this).parent().parent().removeClass("show-subnav")}),a(".sf-accordion > .menuparent ul .menuparent ul li a").focus(function(){a(this).parent().parent().parent().parent().addClass("show-subnav"),a(this).parent().parent().addClass("show-subnav")}).blur(function(){a(this).parent().parent().parent().parent().removeClass("show-subnav"),a(this).parent().parent().removeClass("show-subnav")})},100)})}}}(jQuery);
//# sourceMappingURL=owen-mobile-menu-v1.js.map
