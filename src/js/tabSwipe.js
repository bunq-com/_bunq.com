$('.w-tab-content').swipe({
  swipeLeft: function (event, direction, distance, duration, fingerCount) {
    $('.w-tab-menu a.w--current').next('a').click();
  },
  swipeRight: function (event, direction, distance, duration, fingerCount) {
    $('.w-tab-menu a.w--current').prev('a').click();
  },
});
