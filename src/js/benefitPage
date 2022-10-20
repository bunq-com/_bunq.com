// If Content row 2 is hidden, card order is not reverted
$(document).ready(function () {
  if ($('#content-row-2').hasClass('w-condition-invisible')) {
    $('body').find('#content-row-how-to').removeClass('is--reversed');
  }
});

// If video is present, manage autoplay and autopause when entering and exiting viewport
let iframe = document.getElementById('iframe').getAttribute('src');
if (iframe !== '') {
  let video = document.getElementById('video'),
    fraction = 0.8;

  function checkScroll() {
    let x = video.offsetLeft,
      y = video.offsetTop,
      w = video.offsetWidth,
      h = video.offsetHeight,
      r = x + w, //right
      b = y + h, //bottom
      visibleX,
      visibleY,
      visible;

    visibleX = Math.max(
      0,
      Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset)
    );
    visibleY = Math.max(
      0,
      Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset)
    );

    visible = (visibleX * visibleY) / (w * h);

    if (visible > fraction) {
      video.play();
    } else {
      video.pause();
    }
  }
  checkScroll();
  window.addEventListener('scroll', checkScroll, false);
  window.addEventListener('resize', checkScroll, false);
}
