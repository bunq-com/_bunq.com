// HIDE ALL SECTIONS AND ERRORS
$('.form_section').hide();
$('.form_error-instruction').hide();
$('.form_error-message').hide();
$('.form_error').hide();

// CREATE AND CALL FUNCTION TO ADD REQUIRED CLASS TO- AND SHOW ERROR FOR EMPTY INPUTS ON BUTTON CLICK
// Create "checkInputs" function
function checkInputs() {
  $("input[type='text'], input[type='number'], input[type='email'], textarea")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).addClass('required');
        $(this).closest('.form_section').find('.form_error').show();
      }
    });
  $("input[type='tel']")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).closest('.field-phone_wrapper').addClass('required');
        $(this).closest('.form_section').find('.form_error').show();
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
        $(this).closest('.form_section').find('.form_error').show();
      }
    });
  $("input[type='checkbox']")
    .filter(':visible')
    .each(function () {
      if (!$(this).is(':checked')) {
        $(this).siblings('.form_checkbox-icon').addClass('required');
        $(this).closest('.form_section').find('.form_error').show();
      }
    });
  $("input[type='file']")
    .filter(':visible')
    .each(function () {
      if (!$(this).val()) {
        $(this).siblings('.file-upload').addClass('required');
        $(this).closest('.form_section').find('.form_error').show();
      }
    });
}

// Call "checkInputs" function on click of any "continue" button
$('*[id*=continue]').on('click', function () {
  checkInputs();
});

// CREATE AND RUN FUNCTION TO REMOVE REQUIRED CLASS AND REMOVE ERRORS ON INPUT AND BUTTON CLICK
// Create function to reset inputs and remove errors
function resetInputs() {
  $('*[class*=required]').removeClass('required');
  $('*[class*=form_error]').hide();
}

// Call "resetInputs" function on input click
$('input, textarea').on('click', function () {
  resetInputs();
});

// Call "resetInputs" function on radio button click
$('.form_radio-icon').on('click', function () {
  resetInputs();
});

// Click radio button on click of parent div including label
$('.form-radio').on('click', function () {
  $(this).find('.form_radio-icon').click();
});

// Call "resetInputs" function on click of any "previous" button
$('*[id*=previous]').on('click', function () {
  resetInputs();
});

// STEP: SITUATION
// Show first step on page load
$('#situation').show();

// Create "situation" variable
var situation = $('input[name="Situation"]:checked').val();

// Update "situation" variable on change of radio button value
$('input[name="Situation"]').on('change', function () {
  situation = $('input[name="Situation"]:checked').val();
});

// Remove borders from radio cards and add border to selected radio card on change
$('input[name="Situation"]').on('change', function () {
  $('input[name="Situation"]').closest('.form_radio-card').removeClass('required');
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
      }
      if (bunqUser === 'yes') {
        $('#field_contact_email').hide();
        $('#field_account_email').show();
      }
      if (bunqUser === 'no') {
        $('#field_contact_email').show();
        $('#field_account_email').hide();
      }
    }
    if (situation === 'hacked') {
      $('#field_bunq-user').hide();
      $('#field_contact_email').hide();
      $('#field_account_email').show();
    }
  }
});

// STEP: CONTACT
// Create "bunqUser" variable
var bunqUser = $('input[name="bunq-User"]:checked').val();

// Update "bunqUser" variable on change of radio button value
$('input[name="bunq-User"]').on('change', function () {
  bunqUser = $('input[name="bunq-User"]:checked').val();
});

// Conditional visibility for "contact" fields
$('input[name="bunq-User"]').on('change', function () {
  if (bunqUser === 'yes') {
    $('#field_contact_email').hide();
    $('#field_account_email').show();
  }
  if (bunqUser === 'no') {
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

  if (situation === 'fraud' || situation === 'phishing' || situation === 'complaint') {
    if (bunqUser === 'yes') {
      if (contactName && accountEmail) {
        $('#contact').hide();
        if (situation === 'fraud') {
          $('#transaction').show();
        }
        if (situation === 'phishing') {
          $('#phishing').show();
        }
        if (situation === 'complaint') {
          $('#complaint').show();
          $('#submit').show();
        }
      }
      if (!accountEmail) {
        $('#contact_email-error').show();
      }
    }
    if (bunqUser === 'no') {
      if (contactName && contactEmail) {
        $('#contact').hide();
        if (situation === 'fraud') {
          $('#transaction').show();
        }
        if (situation === 'phishing') {
          $('#phishing').show();
        }
        if (situation === 'complaint') {
          $('#complaint').show();
          $('#submit').show();
        }
      }
    }
  }
  if (situation === 'hacked') {
    if (contactName && accountEmail) {
      $('#contact').hide();
      $('#hacked').show();
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
  }
  if (transactionType === 'app') {
    $('*[id*=field_transaction]').show();
    $('*[id*=field_transaction_card]').hide();
  }
  if (transactionType === 'none') {
    $('*[id*=field_transaction]').hide();
    $('#field_transaction_type').show();
    $('#transaction_type_error').show();
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
    }
  }
  if (transactionType === 'app') {
    if (transactionAmount && transactionDate && ibanSending && ibanReceiving) {
      $('#transaction').hide();
      $('#fraudster').show();
    }
  }
  if (transactionType === 'none') {
    $('.form_error').hide();
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
    fraudsterName &&
    (fraudsterEmail ||
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
  }
});

// STEP: PHISHING
// Go back on "previous" button click
$('#previous-phishing').on('click', function () {
  $('#phishing').hide();
  $('#contact').show();
});

// Conditionally continue on "continue" button click
$('#continue-fraudster').on('click', function () {
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
      phishingTwitter)
  ) {
    $('#phishing').hide();
    $('#issue').show();
    $('*[id*=field_issue]').hide();
    $('#field_issue_additional-comment').show();
  }
});

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
    $('#hacked-1-elaboration').show();
  } else {
    $('#hacked-1-elaboration').hide();
  }
});

$('input[name=Hacked-Unusual-Links]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-2-elaboration').show();
  } else {
    $('#hacked-2-elaboration').hide();
  }
});

$('input[name=Hacked-Guided-Payment]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-3-elaboration').show();
  } else {
    $('#hacked-3-elaboration').hide();
  }
});

$('input[name=Hacked-Account-Access]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-4-elaboration').show();
  } else {
    $('#hacked-4-elaboration').hide();
  }
});

$('input[name=Hacked-Unauthorized-Phone-Use]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-5-elaboration').show();
  } else {
    $('#hacked-5-elaboration').hide();
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
    $('#field_issue_additional-comment').hide();
  }
});

// STEP: COMPLAINT
// Hide all elaboration fields
$('#complaint_user_error').hide();
$('#complaint_support-responded_error').hide();

// Conditional visibility for elaboration fields
$('input[name=Complaint-User]').on('change', function () {
  if ($('input[name=Complaint-User]:checked').val() === 'no') {
    $('#complaint_user_error').show();
  } else {
    $('#complaint_user_error').hide();
  }
});

$('input[name=Complaint-Support-Responded]').on('change', function () {
  if ($('input[name=Complaint-Support-Responded]:checked').val() === 'no') {
    $('#complaint_support-responded_error').show();
  } else {
    $('#complaint_support-responded_error').hide();
  }
});

// STEP: ISSUE & SUBMIT
// Set variables for issue
var issueExplanation = $('#issue_explanation').val();
var policeReport = $('input[name="Police-Report"]:checked').val();

// Update "policeReport" variable on change
$('input[name="Police-Report"]').on('change', function () {
  policeReport = $('input[name="Police-Report"]:checked').val();
});

// Hide police report upload field fields
$('#field_issue_police-report_file').hide();

// Conditional visibility for police report upload field
$('input[name=Police-Report]').on('change', function () {
  if ($(this).val() === 'yes') {
    $('#field_issue_police-report_file').show();
  } else {
    $('#field_issue_police-report_file').hide();
  }
});

// Go back on "previous" button click
$('#previous-submit').on('click', function () {
  if (situation === 'fraud') {
    $('#issue').hide();
    $('#submit').hide();
    $('#fraudster').show();
  }
  if (situation === 'phishing') {
    $('#issue').hide();
    $('#submit').hide();
    $('#phishing').show();
  }
  if (situation === 'hacked') {
    $('#issue').hide();
    $('#submit').hide();
    $('#hacked').show();
  }
  if (situation === 'complaint') {
    $('#complaint').hide();
    $('#submit').hide();
    $('#contact').show();
  }
});

// Conditionally show real submit button
$('#form_submit').hide();

$('#terms_complaint').on('change', () => {
  if ($('#terms_complaint').is(':checked') && $('#terms_report').is(':checked')) {
    $('#form_submit_disabled').hide();
    $('#form_submit').show();
  } else {
    $('#form_submit_disabled').show();
    $('#form_submit').hide();
  }
});

$('#terms_report').on('change', () => {
  if (situation === 'fraud') {
    if (issueExplanation && policeReport && $('#terms_report').is(':checked')) {
      $('#form_submit_disabled').hide();
      $('#form_submit').show();
    } else {
      $('#form_submit_disabled').show();
      $('#form_submit').hide();
    }
  }
  if (situation === 'phishing') {
    if ($('#terms_report').is(':checked')) {
      $('#form_submit_disabled').hide();
      $('#form_submit').show();
    } else {
      $('#form_submit_disabled').show();
      $('#form_submit').hide();
    }
  }
  if (situation === 'hacked') {
    if (policeReport && $('#terms_report').is(':checked')) {
      $('#form_submit_disabled').hide();
      $('#form_submit').show();
    } else {
      $('#form_submit_disabled').show();
      $('#form_submit').hide();
    }
  }
  if (situation === 'complaint') {
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

