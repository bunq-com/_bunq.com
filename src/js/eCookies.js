// ALERT BANNER COOKIE
(async () => {
  const alertBanner = 'alertClosed';
  // if cookie is not "undefined", hide component
  if (typeof Cookies.get(alertBanner) !== 'undefined') {
    $('.alert-incident_component').remove();
  }
  // if close button pressed, set cookie
  $('.alert-incident_close-btn').on('click', function () {
    Cookies.set(alertBanner, 'yes', { expires: 7 });
  });
})(); // END
