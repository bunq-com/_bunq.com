$('.content-tabs_image-wrapper-mobile').css({ height: '0' });

$('#tab-1').click(function () {
  let click_tab_1 = $(this).data('click_tab_1');
  if (click_tab_1 === undefined) {
    let button = $(this).children('.content-tabs_button');
    let imageMobile = $(this).children('.content-tabs_image-wrapper-mobile');

    button
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 200);

    imageMobile
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 250);
  } else {
    window.open('/5-minutes', '_blank');
    click_tab_1 = 'click_tab_1';
  }
  $(this).data('click_tab_1', !click_tab_1);
});

$('#tab-2').click(function () {
  let click_tab_2 = $(this).data('click_tab_2');
  if (!click_tab_2) {
    let button = $(this).children('.content-tabs_button');
    let imageMobile = $(this).children('.content-tabs_image-wrapper-mobile');

    button
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 200);

    imageMobile
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 250);
  } else {
    window.open('/plans/easygreen', '_blank');
    click_tab_2 = $(this).data('undefined');
  }
  $(this).data('click_tab_2', !click_tab_2);
});

$('#tab-3').click(function () {
  let click_tab_3 = $(this).data('click_tab_3');
  if (!click_tab_3) {
    let button = $(this).children('.content-tabs_button');
    let imageMobile = $(this).children('.content-tabs_image-wrapper-mobile');

    button
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 200);

    imageMobile
      .data('oHeight', imageMobile.height())
      .css('height', 'auto')
      .data('nHeight', imageMobile.height())
      .height(imageMobile.data('oHeight'))
      .animate({ height: imageMobile.data('nHeight') }, 250);
  } else {
    window.open('/plans/easymoney', '_blank');
    click_tab_3 = $(this).data('undefined');
  }
  $(this).data('click_tab_3', !click_tab_3);
});
