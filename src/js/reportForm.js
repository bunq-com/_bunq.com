// HIDE ALL SECTIONS AND ERRORS
$('.form_section').hide();
$('.form_error-instruction').hide();
$('.form_error-message').hide();
$('.form_error').hide();

// HANDLING INPUTS
// Create function to add required class to- and show error for empty inputs
function checkInputs() {
  $("input[type='text'], input[type='number'], input[type='email'], textarea")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).addClass('required');
        $(this).closest('.form_section').find('.form_error').slideDown('200', 'easeOutQuad');
      }
    });
  $("input[type='tel']")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).closest('.field-phone_wrapper').addClass('required');
        $(this).closest('.form_section').find('.form_error').slideDown('200', 'easeOutQuad');
      }
    });
  $("input[type='radio']")
    .filter(':visible')
    .each(function () {
      var inputName = "input[name='" + this.name + "']:checked";
      var inputValue = $(inputName).val();
      if (inputValue === undefined) {
        $(this).closest('.form_options').find('.form_radio-icon').addClass('required');
        $(this).closest('.form_radio-card').addClass('required');
        $(this).closest('.form_section').find('.form_error').slideDown('200', 'easeOutQuad');
      }
    });
  $("input[type='checkbox']")
    .filter(':visible')
    .each(function () {
      if (!$(this).is(':checked')) {
        $(this).siblings('.form_checkbox-icon').addClass('required');
        $(this).closest('.form_section').find('.form_error').slideDown('200', 'easeOutQuad');
      }
    });
  $("input[type='file']")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).siblings('.file-upload').addClass('required');
        $(this).closest('.form_section').find('.form_error').slideDown('200', 'easeOutQuad');
      }
    });
}

// Remove required class from input when clicked and remove errors
$('input, textarea, .form_radio').on('click', function () {
  $(this).closest('.form_field').find('*[class*=required]').removeClass('required');
  $('*[class*=form_error]').slideUp('100', 'easeInQuad');
});

// Remove required class from radio cards on selection
$('.form_radio-card').on('click', function () {
  $('.form_radio-card-grid').find('.form_radio-card').removeClass('required');
  $('*[class*=form_error]').slideUp('100', 'easeInQuad');
});

// Remove required class from all fields on "previous" button click
$('*[id*=previous]').on('click', function () {
  $('*[class*=required]').removeClass('required');
  $('*[class*=form_error]').slideUp('100', 'easeInQuad');
});

// STEP: SITUATION
// Show first step on page load
$('#situation').show();

// Create "situation" variable
var situation = $('input[name="Situation"]:checked').val();

// Update "situation" variable on change of radio value
$('input[name="Situation"]').on('change', function () {
  situation = $('input[name="Situation"]:checked').val();
});

// Remove borders from radio cards and add border to selected radio card on change
$('input[name="Situation"]').on('change', function () {
  $('input[name="Situation"]').closest('.form_radio-card').removeClass('checked');
  $('input[name="Situation"]:checked').closest('.form_radio-card').addClass('checked');
});

// Continue on "continue" button click if requirements are fulfilled
$('#continue-situation').on('click', function () {
  if (situation) {
    $('#situation').hide();
    $('#contact').show();
    // Hide and show conditional fields in next step
    if (situation === 'fraud' || situation === 'phishing' || situation === 'complaint') {
      $('#field_bunq-user').show();
      if (!bunqUser) {
        $('#field_contact_email').hide();
        $('#field_account_email').hide();
      } else if (bunqUser === 'yes') {
        $('#field_contact_email').hide();
        $('#field_account_email').show();
      } else if (bunqUser === 'no') {
        $('#field_contact_email').show();
        $('#field_account_email').hide();
      }
    } else if (situation === 'hacked') {
      $('#field_bunq-user').hide();
      $('#field_contact_email').hide();
      $('#field_account_email').show();
    }
  } else {
    checkInputs();
  }
});

// STEP: CONTACT
// Create "bunqUser" variable
var bunqUser = $('input[name="bunq-User"]:checked').val();

// Update "bunqUser" variable on change of radio value
$('input[name="bunq-User"]').on('change', function () {
  bunqUser = $('input[name="bunq-User"]:checked').val();
});

// Conditional visibility for "contact" fields
$('input[name="bunq-User"]').on('change', function () {
  if (bunqUser === 'yes') {
    $('#field_contact_email').hide();
    $('#field_account_email').show();
  } else if (bunqUser === 'no') {
    $('#field_contact_email').show();
    $('#field_account_email').hide();
  }
});

// Go back on "previous" button click
$('#previous-contact').on('click', function () {
  $('#contact').hide();
  $('#situation').show();
});

// Continue on "continue" button click if requirements are fulfilled
$('#continue-contact').on('click', function () {
  var contactName = $('#contact_name').val();
  var contactEmail = $('#contact_email').val();
  var accountEmail = $('#account_email').val();

  if (situation === 'fraud') {
    if (bunqUser === 'yes') {
      if (!accountEmail) {
        $('#contact_email-error').slideDown('200', 'easeOutQuad');
      }
      if (contactName && accountEmail) {
        $('#contact').hide();
        $('#transaction').show();
      } else {
        checkInputs();
      }
    } else if (bunqUser === 'no') {
      if (contactName && contactEmail) {
        $('#contact').hide();
        $('#transaction').show();
      } else {
        checkInputs();
      }
    } else {
      checkInputs();
    }
  } else if (situation === 'phishing') {
    if (bunqUser === 'yes') {
      if (!accountEmail) {
        $('#contact_email-error').slideDown('200', 'easeOutQuad');
      }
      if (contactName && accountEmail) {
        $('#contact').hide();
        $('#phishing').show();
        $('#submit').show();
      } else {
        checkInputs();
      }
    } else if (bunqUser === 'no') {
      if (contactName && contactEmail) {
        $('#contact').hide();
        $('#phishing').show();
        $('#submit').show();
      } else {
        checkInputs();
      }
    } else {
      checkInputs();
    }
  } else if (situation === 'complaint') {
    if (bunqUser === 'yes') {
      if (!accountEmail) {
        $('#contact_email-error').slideDown('200', 'easeOutQuad');
      }
      if (contactName && accountEmail) {
        $('#contact').hide();
        $('#complaint').show();
        $('#submit').show();
      } else {
        checkInputs();
      }
    } else if (bunqUser === 'no') {
      if (contactName && contactEmail) {
        $('#contact').hide();
        $('#complaint').show();
        $('#submit').show();
      } else {
        checkInputs();
      }
    } else {
      checkInputs();
    }
  } else if (situation === 'hacked') {
    if (!accountEmail) {
      $('#contact_email-error').slideDown('200', 'easeOutQuad');
    }
    if (contactName && accountEmail) {
      $('#contact').hide();
      $('#hacked').show();
    } else {
      checkInputs();
    }
  }
});

// STEP: TRANSACTION
// Set and update "transactionType" variable
var transactionType = $('input[name="Transaction-Type"]:checked').val();

$('input[name="Transaction-Type"]').on('change', function () {
  transactionType = $('input[name="Transaction-Type"]:checked').val();
});

// Hide all "transaction" fields
$('*[id*=field_transaction]').hide();
$('#field_transaction_type').show();

// Conditional visibility for "transaction" fields
$('input[name="Transaction-Type"]').on('change', function () {
  if (transactionType === 'card') {
    $('*[id*=field_transaction]').show();
    $('*[id*=field_transaction_iban]').hide();
  } else if (transactionType === 'app') {
    $('*[id*=field_transaction]').show();
    $('*[id*=field_transaction_card]').hide();
  } else if (transactionType === 'none') {
    $('*[id*=field_transaction]').hide();
    $('#field_transaction_type').show();
    $('#transaction_type_error').slideDown('200', 'easeOutQuad');
  }
});

// Go back on "previous" button click
$('#previous-transaction').on('click', function () {
  $('#transaction').hide();
  $('#contact').show();
});

// Conditionally continue on "continue" button click
$('#continue-transaction').on('click', function () {
  var transactionAmount = $('#transaction_amount').val();
  var transactionDate = $('#transaction_date').val();
  var firstSixDigits = $('#transaction_card-first-digits').val();
  var lastFourDigits = $('#transaction_card-last-digits').val();
  var ibanSending = $('#transaction_iban-sending').val();
  var ibanReceiving = $('#transaction_iban-receiving').val();

  if (transactionAmount && transactionAmount <= 0) {
    $('#transaction_amount').siblings('.form_error-instruction').show();
    $('#transaction_amount').addClass('required');
  }
  if (transactionType === 'card') {
    if (transactionAmount && transactionDate && firstSixDigits && lastFourDigits) {
      $('#transaction').hide();
      $('#fraudster').show();
    } else {
      checkInputs();
    }
  } else if (transactionType === 'app') {
    if (transactionAmount && transactionDate && ibanSending && ibanReceiving) {
      $('#transaction').hide();
      $('#fraudster').show();
    } else {
      checkInputs();
    }
  } else if (transactionType === 'none') {
    $('#transaction_type_error').slideDown('200', 'easeOutQuad');
  }
});

// STEP: FRAUDSTER
// Go back on "previous" button click
$('#previous-fraudster').on('click', function () {
  $('#fraudster').hide();
  $('#transaction').show();
});

// Conditionally continue on "continue" button click
$('#continue-fraudster').on('click', function () {
  var fraudType = $('input[name="Fraud-Type"]:checked').val();
  var fraudsterName = $('#fraudster_name').val();
  var fraudsterEmail = $('#fraudster_email').val();
  var fraudsterPhoneNumber = $('#fraudster_phone-number').val();
  var fraudsterWebsite = $('#fraudster_website').val();
  var fraudsterInstagram = $('#fraudster_instagram').val();
  var fraudsterTwitter = $('#fraudster_twitter').val();

  if (
    fraudType &&
    (fraudsterName ||
      fraudsterEmail ||
      fraudsterPhoneNumber ||
      fraudsterWebsite ||
      fraudsterInstagram ||
      fraudsterTwitter)
  ) {
    $('#fraudster').hide();
    $('#issue').show();
    $('#submit').show();
    $('*[id*=field_issue]').show();
    $('#field_issue_additional-comment').hide();
    $('#field_issue_police-report_file').hide();
  } else {
    checkInputs();
  }
});

// STEP: PHISHING
// Go back on "previous" button click
// $('#previous-phishing').on('click', function () {
//   $('#phishing').hide();
//   $('#contact').show();
// });

// Conditionally continue on "continue" button click
// $('#continue-phishing').on('click', function () {
//   var phishingName = $('#phishing_name').val();
//   var phishingEmail = $('#phishing_email').val();
//   var phishingPhoneNumber = $('#phishing_phone-number').val();
//   var phishingWebsite = $('#phishing_website').val();
//   var phishingInstagram = $('#phishing_instagram').val();
//   var phishingTwitter = $('#phishing_twitter').val();
//   var phishingMessage = $('#phishing_message').val();

//   if (
//     phishingMessage &&
//     (phishingName ||
//       phishingEmail ||
//       phishingPhoneNumber ||
//       phishingWebsite ||
//       phishingInstagram ||
//       phishingTwitter)
//   ) {
//     $('#phishing').hide();
//     $('#issue').show();
//     $('#submit').show();
//     $('*[id*=field_issue]').hide();
//     $('#field_issue_additional-comment').show();
//   } else {
//     checkInputs();
//   }
// });

// STEP: HACKED
// Hide all elaboration fields
$('#hacked-1-elaboration').hide();
$('#hacked-2-elaboration').hide();
$('#hacked-3-elaboration').hide();
$('#hacked-4-elaboration').hide();
$('#hacked-5-elaboration').hide();

// Conditional visibility for elaboration fields
$('input[name=Hacked-Shared-Credentials]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-1-elaboration').slideDown('200', 'easeOutQuad');
  } else {
    $('#hacked-1-elaboration').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Hacked-Unusual-Links]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-2-elaboration').slideDown('200', 'easeOutQuad');
  } else {
    $('#hacked-2-elaboration').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Hacked-Guided-Payment]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-3-elaboration').slideDown('200', 'easeOutQuad');
  } else {
    $('#hacked-3-elaboration').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Hacked-Account-Access]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-4-elaboration').slideDown('200', 'easeOutQuad');
  } else {
    $('#hacked-4-elaboration').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Hacked-Unauthorized-Phone-Use]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-5-elaboration').slideDown('200', 'easeOutQuad');
  } else {
    $('#hacked-5-elaboration').slideUp('100', 'easeInQuad');
  }
});

// Go back on "previous" button click
$('#previous-hacked').on('click', function () {
  $('#hacked').hide();
  $('#contact').show();
});

// Conditionally continue on "continue" button click
$('#continue-hacked').on('click', function () {
  var sharedCredentials = $('input[name="Hacked-Shared-Credentials"]:checked').val();
  var unusualLinks = $('input[name="Hacked-Unusual-Links"]:checked').val();
  var guidedPayment = $('input[name="Hacked-Guided-Payment"]:checked').val();
  var accountAccess = $('input[name="Hacked-Account-Access"]:checked').val();
  var unauthorizedPhoneUse = $('input[name="Hacked-Unauthorized-Phone-Use"]:checked').val();

  if (sharedCredentials && unusualLinks && guidedPayment && accountAccess && unauthorizedPhoneUse) {
    $('#hacked').hide();
    $('#issue').show();
    $('#submit').show();
    $('*[id*=field_issue]').show();
    $('#field_issue_explanation').hide();
    $('#field_issue_police-report_file').hide();
  } else {
    checkInputs();
  }
});

// STEP: COMPLAINT
// Hide all conditional fields
$('#complaint_got-support_error').hide();
$('#complaint_support-responded_error').hide();
$('#complaint_user_error').hide();
$('*[id*=field_complaint_account]').hide();

// Conditional visibility for conditional elements
$('input[name=Complaint-Got-Support]').on('change', function () {
  if ($('input[name=Complaint-Got-Support]:checked').val() === 'no') {
    $('#complaint_got-support_error').slideDown('200', 'easeOutQuad');
  } else {
    $('#complaint_got-support_error').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Complaint-Support-Responded]').on('change', function () {
  if ($('input[name=Complaint-Support-Responded]:checked').val() === 'no') {
    $('#complaint_support-responded_error').slideDown('200', 'easeOutQuad');
  } else {
    $('#complaint_support-responded_error').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Complaint-User]').on('change', function () {
  if ($('input[name=Complaint-User]:checked').val() === 'no') {
    $('#complaint_user_error').slideDown('200', 'easeOutQuad');
  } else {
    $('#complaint_user_error').slideUp('100', 'easeInQuad');
  }
});

$('input[name=Complaint-User]').on('change', function () {
  if (bunqUser === 'no' && $('input[name=Complaint-User]:checked').val() === 'yes') {
    $('*[id*=field_complaint_account]').slideDown('200', 'easeOutQuad');
  } else {
    $('*[id*=field_complaint_account]').slideUp('100', 'easeInQuad');
  }
});

// STEP: ISSUE & SUBMIT
// Set variables for issue
var issueExplanation = $('#issue_explanation').val();
var policeReport = $('input[name="Police-Report"]:checked').val();

// Update "issueExplanation" variable on change
$('textarea[name="Issue-Explanation"]').on('keyup', function () {
  issueExplanation = $('textarea[name="Issue-Explanation"]').val();
});

// Update "policeReport" variable on change
$('input[name="Police-Report"]').on('change', function () {
  policeReport = $('input[name="Police-Report"]:checked').val();
});

// Hide police report upload field fields
// $('#field_issue_police-report_file').hide();

// Conditional visibility for police report upload field
$('input[name=Police-Report]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#field_issue_police-report_file').slideDown('200', 'easeOutQuad');
  } else {
    $('#field_issue_police-report_file').slideUp('100', 'easeInQuad');
  }
});

// Go back on "previous" button click
$('#previous-submit').on('click', function () {
  if (situation === 'fraud') {
    $('#issue').hide();
    $('#submit').hide();
    $('#fraudster').show();
  } else if (situation === 'phishing') {
    $('#phishing').hide();
    $('#submit').hide();
    $('#contact').show();
  } else if (situation === 'hacked') {
    $('#issue').hide();
    $('#submit').hide();
    $('#hacked').show();
  } else if (situation === 'complaint') {
    $('#complaint').hide();
    $('#submit').hide();
    $('#contact').show();
  }
});

// Conditionally show real submit button
$('#form_submit').hide();

$('#issue, #phishing, #complaint, #submit')
  .find('input, textarea')
  .on('change', () => {
    if (situation === 'fraud') {
      if (issueExplanation && policeReport && $('#terms_report').is(':checked')) {
        $('#form_submit_disabled').hide();
        $('#form_submit').show();
      } else {
        $('#form_submit_disabled').show();
        $('#form_submit').hide();
      }
    } else if (situation === 'phishing') {
      var phishingName = $('#phishing_name').val();
      var phishingEmail = $('#phishing_email').val();
      var phishingPhoneNumber = $('#phishing_phone-number').val();
      var phishingWebsite = $('#phishing_website').val();
      var phishingInstagram = $('#phishing_instagram').val();
      var phishingTwitter = $('#phishing_twitter').val();
      var phishingMessage = $('#phishing_message').val();

      if (
        phishingMessage &&
        (phishingName ||
          phishingEmail ||
          phishingPhoneNumber ||
          phishingWebsite ||
          phishingInstagram ||
          phishingTwitter) &&
        $('#terms_report').is(':checked')
      ) {
        $('#form_submit_disabled').hide();
        $('#form_submit').show();
      } else {
        $('#form_submit_disabled').show();
        $('#form_submit').hide();
      }
    } else if (situation === 'hacked') {
      if (policeReport && $('#terms_report').is(':checked')) {
        $('#form_submit_disabled').hide();
        $('#form_submit').show();
      } else {
        $('#form_submit_disabled').show();
        $('#form_submit').hide();
      }
    } else if (situation === 'complaint') {
      var bunqUser = $('input[name="Complaint-User"]:checked').val();
      var gotSupport = $('input[name="Complaint-Got-Support"]:checked').val();
      var supportResponded = $('input[name="Complaint-Support-Responded"]:checked').val();
      var accountType = $('input[name="Complaint-Account-Type"]:checked').val();
      var incidentDate = $('#complaint_date').val();
      var complaintMessage = $('#complaint_message').val();

      if (
        bunqUser === 'yes' &&
        gotSupport === 'yes' &&
        supportResponded === 'yes' &&
        accountType &&
        incidentDate &&
        complaintMessage &&
        $('#terms_complaint').is(':checked') &&
        $('#terms_report').is(':checked')
      ) {
        $('#form_submit_disabled').hide();
        $('#form_submit').show();
      } else {
        $('#form_submit_disabled').show();
        $('#form_submit').hide();
      }
    }
  });

$('#form_submit_disabled').on('click', function () {
  checkInputs();
  $(this).closest('.form_section').find('.form_error').show();
});
