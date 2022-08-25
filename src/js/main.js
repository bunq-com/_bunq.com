// WEGLOT
// initialize Weglot
Weglot.initialize({
  api_key: 'wg_41cb6c3a43f94335132e8573b4ac14b73',
});

// on Weglot init
Weglot.on('initialized', () => {
  // get the current active language
  const currentLang = Weglot.getCurrentLang();
  // call updateDropdownLinks function
  updateSW7DropdownLinks(currentLang);
});

// for each of the .wg-element-wrapper language links
document.querySelectorAll('.wg-element-wrapper [lang]').forEach((link) => {
  // add a click event listener
  link.addEventListener('click', function (e) {
    // prevent default
    e.preventDefault();
    // switch to the current active language
    Weglot.switchTo(this.getAttribute('lang'));
    // call updateDropdownLinks function
    updateSW7DropdownLinks(this.getAttribute('lang'));
  });
});

// updateDropdownLinks function
function updateSW7DropdownLinks(currentLang) {
  // get the wrapper element
  const $wrapper = document.querySelector('.wg-element-wrapper');
  // if the .w-dropdown-toggle is not the current active language
  if ($wrapper.querySelector('.w-dropdown-toggle').getAttribute('lang') !== currentLang) {
    // get the current active language link
    const $activeLangLink = $wrapper.querySelector('[lang=' + currentLang + ']');
    // swap the dropdown toggle's text with the current active language link text
    const $toggle = $activeLangLink
      .closest('.wg-element-wrapper')
      .querySelector('.w-dropdown-toggle');
    const toggleTxt = $toggle.textContent;
    const activeLangLinkTxt = $activeLangLink.textContent;
    $toggle.querySelector('div').textContent = activeLangLinkTxt;
    $activeLangLink.textContent = toggleTxt;
    // swap the dropdown toggle's lang attr with the current active language link lang attr
    const lang = $activeLangLink.getAttribute('lang');
    const toggleLang = $toggle.getAttribute('lang');
    $toggle.setAttribute('lang', lang);
    $activeLangLink.setAttribute('lang', toggleLang);
  }
} // END

// BUTTON MODIFIER
window.onload = function () {
  // Determine all lead parameters.
  let source = '';
  let medium = '';
  let campaign = '';
  let content = '';
  let gclid = '';

  const allUrlParameter = new URLSearchParams(window.location.search);

  if (Cookies.get('Lead')) {
    const allCookieLeadParameter = JSON.parse(Cookies.get('Lead')).parameters;
    source = allCookieLeadParameter.utm_source;
    medium = allCookieLeadParameter.utm_medium;
    campaign = allCookieLeadParameter.utm_campaign;
    content = allCookieLeadParameter.utm_content;
    gclid = allCookieLeadParameter.gclid;
  } else {
    source = allUrlParameter.get('utm_source');
    medium = allUrlParameter.get('utm_medium');
    campaign = allUrlParameter.get('utm_campaign');
    content = allUrlParameter.get('utm_content');
    gclid = allUrlParameter.get('gclid');
  }

  // Determine pathname.
  const pathName = window.location.pathname;
  const pathNameEncoded = pathName.replace('/', '%2F');

  // Determine everflowTransactionId.
  const allUrlParameterKey = allUrlParameter.keys();
  let everflowTransactionId = '';

  for (var key of allUrlParameter.keys()) {
    if (key.length === 32) {
      everflowTransactionId = `?${key}`;
    }
  }

  if (everflowTransactionId === '') {
    const transactionIdFromStorage = localStorage.getItem('everflow:transactionId');

    if (transactionIdFromStorage) {
      everflowTransactionId = `?${transactionIdFromStorage}`;
    }
  }

  // Paid marketing script
  if (
    [
      'xzd89c',
      'nih1kt',
      'tv5kaev',
      'e00qkb',
      'ox5s3nf',
      'gp8fuyk',
      'v7pubt9',
      'hdyfj42',
      'jypz7y8',
      'l05ldc0',
      '3zgbra4',
    ].includes(source)
  ) {
    const allSignupButton = document.querySelectorAll("a[href^='https://app.adjust.com/']"); // a-tags that start with this link.
    allSignupButton.forEach((button) => {
      const allUrlParameter = new URLSearchParams();

      if (campaign) allUrlParameter.set('campaign', campaign);
      if (medium) allUrlParameter.set('adgroup', medium);
      if (content) allUrlParameter.set('creative', content);
      if (gclid) allUrlParameter.set('external_click_id', gclid);
      if (pathNameEncoded) allUrlParameter.set('label', pathNameEncoded);

      if (/(iPhone|Android)/.test(navigator.userAgent)) {
        allUrlParameter.set('fallback', `https://web.bunq.com/signup?tracker_token=${source}`);
      } else {
        allUrlParameter.set('redirect', `https://web.bunq.com/signup?tracker_token=${source}`);
      }

      button.href = `https://app.adjust.com/${source}?${allUrlParameter.toString()}`;
    });
  } else if (everflowTransactionId) {
    // Adjust link with everflowTransactionId.
    const allSignupButton = document.querySelectorAll("a[href^='https://app.adjust.com/']"); // a-tags that start with this link.
    allSignupButton.forEach((button) => {
      const allUrlParameter = new URLSearchParams();

      allUrlParameter.set('fallback', `https://web.bunq.com/signup${everflowTransactionId}`);
      allUrlParameter.set('redirect_macos', `https://web.bunq.com/signup${everflowTransactionId}`);

      button.href = `https://app.adjust.com/dqvbt6?${allUrlParameter.toString()}`;
    });
  } else {
    // Organic Adjust link.
    const allSignupButton = document.querySelectorAll("a[href^='https://app.adjust.com/']"); // a-tags that start with this link.
    allSignupButton.forEach((button) => {
      const allUrlParameter = new URLSearchParams();

      if (pathNameEncoded) allUrlParameter.set('label', pathNameEncoded);

      if (/(iPhone|Android)/.test(navigator.userAgent)) {
        allUrlParameter.set('fallback', `https://web.bunq.com/signup?tracker_token=dqvbt6`);
      } else {
        allUrlParameter.set('redirect', `https://web.bunq.com/signup?tracker_token=dqvbt6`);
      }

      button.href = `https://app.adjust.com/dqvbt6?${allUrlParameter.toString()}`;
    });
  }
}; // END

// STORE EVERFLOW TRANSACTION ID
const allUrlParameter = new URLSearchParams(window.location.search);
const allUrlParameterKey = allUrlParameter.keys();

for (var key of allUrlParameter.keys()) {
  if (key.length === 32) {
    localStorage.setItem('everflow:transactionId', key);
  }
} // END

// UTM READER NO COOKIES
var queryString = window.location.search;
console.log(queryString);
// ?utm_source=facebook&utm_medium=post&utm_campaign=webflow
var URLSearchParams_wb = new URLSearchParams(queryString);

const utmParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid'];

for (const utm_element of utmParameters) {
  // if utm_source exist
  if (URLSearchParams_wb.has(utm_element)) {
    console.log(utm_element + 'is exist');
    // get UTM value of this utm param
    var value = URLSearchParams_wb.get(utm_element);
    // change form hidden feild to this utm url value
    $('.' + utm_element).val(value);
  }
} // END

// BANNER MANAGEMENT
(async () => {
  // fetch endpoint, checks for api validation
  const response = await fetch(
    `https://api.web.${
      location.hostname.endsWith('bunq.com') ? 'bunq.com' : 'triage.bunq.net'
    }/v1/incident-public`,
    {
      headers: { 'X-Bunq-Client-Request-Id': '1' },
      cache: 'no-store',
    }
  );
  const data = await response.json();
  const incident = data.Response?.[0]?.Incident;
  // if incident is present in the endpoint
  if (!incident) {
    return;
  }
  // hide news banner and get message
  $('#alert-news').hide();
  $('#hidden').removeClass('hide');
  $('#incident-message').text(incident.user_message_incident_ongoing);
  // if link is present, get link, else hide text block
  if (incident.incident_link) {
    $('#incident-link').attr('href', incident.incident_link);
  } else {
    $('#incident-link').hide();
  }
  // animate in banner
  $('#alert-incident').slideDown({
    duration: 250,
    easing: 'easeOutQuart',
  });
})(); // END

// SECTION ANIMATION
// import style
// import './css/style.css'

// check element location
function checkElementLocation() {
  var $window = $(window);
  var bottom_of_window = $window.scrollTop() + $window.height();

  $('section').each(function (i) {
    if (i === 0) {
      // first section, doesn't slide in but fades in
      $(this).addClass('fade-in');
    } else {
      var $that = $(this);
      // determines how bit the slide is. If you want the section to slide in later, add more to bottom_of_object.
      var bottom_of_object = $that.position().top + 96;

      // if element is in viewport, add the slide-in animate class
      if (bottom_of_window > bottom_of_object) {
        $(this).addClass('slide-in');
      }
    }
  });
}
// if in viewport, show the animation
checkElementLocation();

$(window).on('scroll', function () {
  checkElementLocation();
}); // END

// SKIP TO MAIN
(async () => {
  // if banner is on focus, gives top margin
  $(document).ready(function () {
    $('#skip-link').on('focus', function () {
      $('#skip-link').css('margin-top', '40px');
    });
    // if banner is pressed, goes to main section
    $('#skip-link').on('click keydown', function (e) {
      if (e.type === 'keydown' && e.which !== 13) {
        return;
      }

      e.preventDefault();
      var target = $('#main');
      target.attr('tabindex', '-1');
      target.focus();
    });
    // if banner goes out of focus, removes top margin
    $('#skip-link').on('focusout', function () {
      $('#skip-link').css('margin-top', '0px');
    });
  });
})(); // END
