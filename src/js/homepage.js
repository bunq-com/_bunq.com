$('#tab-1').click(function () {
  var click_tab_1 = $(this).data('click_tab_1');
  if (!click_tab_1) {
  } else {
    window.open('/5-minutes', '_blank');
  }
  $(this).data('click_tab_1', !click_tab_1);
});

$('#tab-2').click(function () {
  var click_tab_2 = $(this).data('click_tab_2');
  if (!click_tab_2) {
  } else {
    window.open('/plans/easygreen', '_blank');
  }
  $(this).data('click_tab_2', !click_tab_2);
});

$('#tab-3').click(function () {
  var click_tab_3 = $(this).data('click_tab_3');
  if (!click_tab_3) {
  } else {
    window.open('/plans/easymoney', '_blank');
  }
  $(this).data('click_tab_3', !click_tab_3);
});
