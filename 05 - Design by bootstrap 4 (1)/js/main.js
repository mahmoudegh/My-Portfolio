// // Not Working
 $(function () {
    'use strict';
    // Adjust Slider Height
    var winH   = $(window).height(),
        upperH = $('.upper-bar').innerHeight(),
        navH   = $('.navbar').innerHeight();
    $('.slider, .carousel-item').height(winH - ( upperH + navH ));


    // Featured Work Shuffle
    $('.featured-work-header ul li').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
      if ($(this).data('class') === 'all') {
        $('.featured-work-items .shuffel').css('opacity', 1);
      } else {
        $('.featured-work-items .shuffel').css('opacity', '.08');
        $($(this).data('class')).parent().css('opacity', 1);
      }
    });
  });
