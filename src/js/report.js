console.log('Hello world!');

// Hide all steps and error message
$('#reported-bunqer').hide();
$('#reported-ext-fraud').hide();
$('#complaint-reporter').hide();
$('#bunq-account').hide();
$('#transaction').hide();
$('#issue').hide();
$('#hacked-questions').hide();
$('#final-step').hide();
$('#terms-complaint').hide();
$('#department').hide();
$('.error-message').hide();
$('.field-form-alert').hide();

// Set variable for situation
var incidentSituation = $('#incident_situation').val();

$('#incident_situation').on('change', function () {
  incidentSituation = $('#incident_situation').val();
});

// Set variable for country of complaint
var complaintCountry = $('#complaint_country').val();

$('#complaint_country').on('change', function () {
  complaintCountry = $('#complaint_country').val();
});

// Remove required class when clicking an input field
$('input').on('click', function () {
  $(this).removeClass('required');
  $(this).siblings('.field-form-alert').hide();
});

// Email validation
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($email);
}

// Conditional logic for navigation buttons
$('#continue-basic-info').on('click', function () {
  var contactName = $('#contact_name').val();
  var contactEmail = $('#contact_email').val();

  if (!validateEmail(contactEmail)) {
    $('#contact_email').siblings('.field-form-alert').show();
    $('#contact_email').addClass('required');
  }
  if (!contactName) {
    $('#contact_name').addClass('required');
  }
  if (!contactEmail) {
    $('#contact_email').addClass('required');
  }
  if (!contactName || !contactEmail || !validateEmail(contactEmail)) {
    $('#continue-basic-info').siblings('.error-message').show();
  } else {
    $('#basic-info').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    if (incidentSituation === 'bunq-scammer') {
      $('#reported-bunqer').show();
    }
    if (incidentSituation === 'bunqer-scammed') {
      $('#reported-ext-fraud').show();
    }
    if (incidentSituation === 'bunqer-hacked') {
      $('#bunq-account').show();
    }
    if (incidentSituation === 'complaint') {
      $('#complaint-reporter').show();
    }
    if (!(incidentSituation === 'complaint')) {
      $('#account-type').hide();
    }
  }
});

$('#previous-reported-bunqer').on('click', function () {
  $('#reported-bunqer').hide();
  $('#basic-info').show();
  $('#reported-bunqer_phone').removeClass('required');
});

$('#continue-reported-bunqer').on('click', function () {
  var reportedBunqerName = $('#reported-bunqer_name').val();
  var reportedBunqerEmail = $('#reported-bunqer_email').val();
  var reportedBunqerPhone = $('#reported-bunqer_phone-number').val();
  var reportedBunqerWebsite = $('#reported-bunqer_website').val();
  var reportedBunqerBunqme = $('#reported-bunqer_bunqme').val();
  var reportedBunqerIban = $('#reported-bunqer_iban').val();

  if (!reportedBunqerName) {
    $('#reported-bunqer_name').addClass('required');
  }
  if (!reportedBunqerEmail) {
    $('#reported-bunqer_email').addClass('required');
  }
  if (!reportedBunqerPhone) {
    $('#reported-bunqer_phone').addClass('required');
  }
  if (!reportedBunqerWebsite) {
    $('#reported-bunqer_website').addClass('required');
  }
  if (!reportedBunqerBunqme) {
    $('#reported-bunqer_bunqme').addClass('required');
  }
  if (!reportedBunqerIban) {
    $('#reported-bunqer_iban').addClass('required');
  }
  if (
    !reportedBunqerName &&
    !reportedBunqerEmail &&
    !reportedBunqerPhone &&
    !reportedBunqerWebsite &&
    !reportedBunqerBunqme &&
    !reportedBunqerIban
  ) {
    $('#continue-reported-bunqer').siblings('.error-message').show();
  } else {
    $('#reported-bunqer').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    $('#reported-bunqer_phone').removeClass('required');
    $('#transaction').show();
  }
});

$('#reported-bunqer_phone-number').on('click', function () {
  $('#reported-bunqer_phone').removeClass('required');
});

$('#previous-reported-ext-fraud').on('click', function () {
  $('#reported-ext-fraud').hide();
  $('#basic-info').show();
  $('#reported-ext-fraud_phone').removeClass('required');
});

$('#continue-reported-ext-fraud').on('click', function () {
  var reportedExtFraudName = $('#reported-ext-fraud_name').val();
  var reportedExtFraudEmail = $('#reported-ext-fraud_email').val();
  var reportedExtFraudPhone = $('#reported-ext-fraud_phone-number').val();
  var reportedExtFraudWebsite = $('#reported-ext-fraud_website').val();
  var reportedExtFraudIban = $('#reported-ext-fraud_iban').val();

  if (!reportedExtFraudName) {
    $('#reported-ext-fraud_name').addClass('required');
  }
  if (!reportedExtFraudEmail) {
    $('#reported-ext-fraud_email').addClass('required');
  }
  if (!reportedExtFraudPhone) {
    $('#reported-ext-fraud_phone').addClass('required');
  }
  if (!reportedExtFraudWebsite) {
    $('#reported-ext-fraud_website').addClass('required');
  }
  if (!reportedExtFraudIban) {
    $('#reported-ext-fraud_iban').addClass('required');
  }
  if (
    !reportedExtFraudName &&
    !reportedExtFraudEmail &&
    !reportedExtFraudPhone &&
    !reportedExtFraudWebsite &&
    !reportedExtFraudIban
  ) {
    $('#continue-reported-ext-fraud').siblings('.error-message').show();
  } else {
    $('#reported-ext-fraud').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    $('#transaction').show();
  }
});

$('#reported-ext-fraud_phone-number').on('click', function () {
  $('#reported-ext-fraud_phone').removeClass('required');
});

$('#previous-complaint-reporter').on('click', function () {
  $('#complaint-reporter').hide();
  $('#basic-info').show();
});

$('#continue-complaint-reporter').on('click', function () {
  var complaintBunqUser = $('input[name="Complaint-bunq-User"]:checked').val();

  if (complaintBunqUser !== 'yes') {
    $('#continue-complaint-reporter').siblings('.error-message').show();
  } else {
    $('#complaint-reporter').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    $('#bunq-account').show();
    $('#account-type').show();
  }
});

$('#previous-bunq-account').on('click', function () {
  $('#bunq-account').hide();
  if (incidentSituation === 'complaint') {
    $('#complaint-reporter').show();
  } else {
    $('#basic-info').show();
  }
});

$('#continue-bunq-account').on('click', function () {
  var bunqAccountEmail = $('#bunq-account_email').val();
  var bunqAccountPhone = $('#bunq-account_phone-number').val();
  var accountType = $('input[name="Account-Type"]:checked').val();

  if (!bunqAccountEmail) {
    $('#bunq-account_email').addClass('required');
  }
  if (!bunqAccountPhone) {
    $('#bunq-account_phone').addClass('required');
  }
  if (
    (!bunqAccountEmail && !bunqAccountPhone) ||
    (incidentSituation === 'complaint' && !accountType)
  ) {
    $('#continue-bunq-account').siblings('.error-message').show();
  } else {
    $('#bunq-account').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    if (incidentSituation === 'bunqer-hacked') {
      $('#hacked-questions').show();
    } else if (incidentSituation === 'complaint') {
      $('#issue').show();
      if (complaintCountry === 'ES') {
        $('#department').show();
      }
    }
  }
});

$('#previous-transaction').on('click', function () {
  $('#transaction').hide();
  if (incidentSituation === 'bunq-scammer') {
    $('#reported-bunqer').show();
  } else if (incidentSituation === 'bunqer-scammed') {
    $('#reported-ext-fraud').show();
  }
});

$('#none').on('click', function () {
  $('.error-message').hide();
});

$('#continue-transaction').on('click', function () {
  var transactionAmount = $('#transaction_amount').val();
  var transactionDate = $('#transaction_date').val();
  var firstSixDigits = $('#transaction_card-first-digits').val();
  var lastFourDigits = $('#transaction_card-last-digits').val();
  var sendingIban = $('#transaction_sending-iban').val();
  var receivingIban = $('#transaction_receiving-iban').val();

  if (
    $('#card').is(':checked') === false &&
    $('#app').is(':checked') === false &&
    $('#none').is(':checked') === false
  ) {
    $('#continue-transaction').siblings('.error-message').show();
  } else if ($('#card').is(':checked') === true) {
    if (!transactionAmount || transactionAmount <= 0) {
      $('#transaction_amount').addClass('required');
    }
    if (!transactionDate) {
      $('#transaction_date').addClass('required');
    }
    if (!firstSixDigits) {
      $('#transaction_card-first-digits').addClass('required');
    }
    if (!lastFourDigits) {
      $('#transaction_card-last-digits').addClass('required');
    }
    if (
      !transactionAmount ||
      transactionAmount <= 0 ||
      !transactionDate ||
      !firstSixDigits ||
      !lastFourDigits
    ) {
      if (transactionAmount <= 0) {
        $('#transaction_amount').siblings('.field-form-alert').show();
      }
      $('#continue-transaction').siblings('.error-message').show();
    } else {
      $('#transaction').hide();
      $('.error-message').hide();
      $('input').removeClass('required');
      $('#issue').show();
    }
  } else if ($('#app').is(':checked') === true) {
    if (!transactionAmount || transactionAmount <= 0) {
      $('#transaction_amount').addClass('required');
    }
    if (!transactionDate) {
      $('#transaction_date').addClass('required');
    }
    if (!sendingIban) {
      $('#transaction_sending-iban').addClass('required');
    }
    if (!receivingIban) {
      $('#transaction_receiving-iban').addClass('required');
    }
    if (
      !transactionAmount ||
      transactionAmount <= 0 ||
      !transactionDate ||
      !sendingIban ||
      !receivingIban
    ) {
      if (transactionAmount <= 0) {
        $('#transaction_amount').siblings('.field-form-alert').show();
      }
      $('#continue-transaction').siblings('.error-message').show();
    } else {
      $('#transaction').hide();
      $('.error-message').hide();
      $('input').removeClass('required');
      $('#issue').show();
    }
  } else {
    $('#transaction').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    $('#issue').show();
  }
});

$('#previous-issue').on('click', function () {
  $('#issue').hide();
  $('#department').hide();
  $('#terms-complaint').hide();
  if (incidentSituation === 'complaint') {
    $('#bunq-account').show();
  } else {
    $('#transaction').show();
  }
});

$('#continue-issue').on('click', function () {
  var issueExplanation = $('#issue_explanation').val();
  var department = $('#complaint_department').val();

  if (complaintCountry === 'ES') {
    if (!department) {
      $('#complaint_department').addClass('required');
    }
    if (!issueExplanation) {
      $('#issue_explanation').addClass('required');
    }
    if (!issueExplanation || !department) {
      $('#continue-issue').siblings('.error-message').show();
    } else {
      $('#issue').hide();
      $('.error-message').hide();
      $('#issue_explanation').removeClass('required');
      $('#final-step').show();
      if (complaintCountry === 'ES') {
        $('#terms-complaint').show();
      }
    }
  } else {
    if (!issueExplanation) {
      $('#issue_explanation').addClass('required');
      $('#continue-issue').siblings('.error-message').show();
    } else {
      $('#issue').hide();
      $('.error-message').hide();
      $('#issue_explanation').removeClass('required');
      $('#final-step').show();
      if (complaintCountry === 'ES') {
        $('#terms-complaint').show();
      }
    }
  }
});

$('#issue_explanation').on('click', function () {
  $(this).removeClass('required');
});

$('#previous-hacked-questions').on('click', function () {
  $('#hacked-questions').hide();
  $('#bunq-account').show();
});

$('#continue-hacked-questions').on('click', function () {
  var sharedCredentials = $('input[name="Hacked-Shared-Credentials"]:checked').val();
  var unusualLinks = $('input[name="Hacked-Unusual-Links"]:checked').val();
  var guidedPayment = $('input[name="Hacked-Guided-Payment"]:checked').val();
  var accountAccess = $('input[name="Hacked-Account-Access"]:checked').val();
  var unauthorizedPhoneUse = $('input[name="Hacked-Unauthorized-Phone-Use"]:checked').val();

  if (
    !sharedCredentials ||
    !unusualLinks ||
    !guidedPayment ||
    !accountAccess ||
    !unauthorizedPhoneUse
  ) {
    $('#continue-hacked-questions').siblings('.error-message').show();
  } else {
    $('#hacked-questions').hide();
    $('.error-message').hide();
    $('input').removeClass('required');
    $('#final-step').show();
  }
});

$('#previous-final-step').on('click', function () {
  $('#final-step').hide();
  if (
    incidentSituation === 'bunq-scammer' ||
    incidentSituation === 'bunqer-scammed' ||
    incidentSituation === 'complaint'
  ) {
    $('#issue').show();
    $('#terms-complaint').show();
  } else if (incidentSituation === 'bunqer-hacked') {
    $('#hacked-questions').show();
  }
});

// Conditional visibility for transaction step
$('#transaction-amount').hide();
$('#transaction-date').hide();
$('#card-6-digits').hide();
$('#card-4-digits').hide();
$('#sending-iban').hide();
$('#receiving-iban').hide();

$('input[name=Transaction-Type]:radio').on('click', function () {
  if ($('input[name=Transaction-Type]:checked').val() === 'card') {
    $('#transaction-amount').show();
    $('#transaction-date').show();
    $('#card-6-digits').show();
    $('#card-4-digits').show();
    $('#sending-iban').hide();
    $('#receiving-iban').hide();
  } else if ($('input[name=Transaction-Type]:checked').val() === 'app') {
    $('#transaction-amount').show();
    $('#transaction-date').show();
    $('#card-6-digits').hide();
    $('#card-4-digits').hide();
    $('#sending-iban').show();
    $('#receiving-iban').show();
  } else if ($('input[name=Transaction-Type]:checked').val() === 'none') {
    $('#transaction-amount').hide();
    $('#transaction-date').hide();
    $('#card-6-digits').hide();
    $('#card-4-digits').hide();
    $('#sending-iban').hide();
    $('#receiving-iban').hide();
  }
});

// Conditional visibility for elaboration fields
$('#hacked-1-elaboration').hide();
$('#hacked-2-elaboration').hide();
$('#hacked-3-elaboration').hide();
$('#hacked-4-elaboration').hide();
$('#hacked-5-elaboration').hide();
$('#police-report-upload').hide();

$('input[name=Hacked-Shared-Credentials]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-1-elaboration').show();
  } else {
    $('#hacked-1-elaboration').hide();
  }
});

$('input[name=Hacked-Unusual-Links]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-2-elaboration').show();
  } else {
    $('#hacked-2-elaboration').hide();
  }
});

$('input[name=Hacked-Guided-Payment]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-3-elaboration').show();
  } else {
    $('#hacked-3-elaboration').hide();
  }
});

$('input[name=Hacked-Account-Access]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-4-elaboration').show();
  } else {
    $('#hacked-4-elaboration').hide();
  }
});

$('input[name=Hacked-Unauthorized-Phone-Use]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#hacked-5-elaboration').show();
  } else {
    $('#hacked-5-elaboration').hide();
  }
});

$('input[name=Police-Report]:radio').on('click', function () {
  if ($(this).val() === 'yes') {
    $('#police-report-upload').show();
  } else {
    $('#police-report-upload').hide();
  }
});

// Submit button
$('#report-form_submit').prop('disabled', true);

$('#submit-buttons-wrapper').on('mouseenter', () => {
  if (
    $('#checkbox_terms-report').prop('checked') === false ||
    $('#checkbox_terms-complaint').prop('checked') === false
  ) {
    $('#final-step').find('.error-message').show();
  }
});

if (complaintCountry === 'ES') {
  $('#checkbox_terms-complaint').on('change', () => {
    if (
      $('#checkbox_terms-report').prop('checked') === true &&
      $('#checkbox_terms-complaint').prop('checked') === true
    ) {
      $('#final-step').find('.error-message').hide();
      $('#report-form_submit').prop('disabled', false);
      $('#report-form_submit').removeClass('disabled');
    } else {
      $('#final-step').find('.error-message').show();
      $('#report-form_submit').prop('disabled', true);
      $('#report-form_submit').addClass('disabled');
    }
  });

  $('#checkbox_terms-report').on('change', () => {
    if (
      $('#checkbox_terms-report').prop('checked') === true &&
      $('#checkbox_terms-complaint').prop('checked') === true
    ) {
      $('#final-step').find('.error-message').hide();
      $('#report-form_submit').prop('disabled', false);
      $('#report-form_submit').removeClass('disabled');
    } else {
      $('#final-step').find('.error-message').show();
      $('#report-form_submit').prop('disabled', true);
      $('#report-form_submit').addClass('disabled');
    }
  });
} else {
  $('#checkbox_terms-report').on('change', (event) => {
    if (event.target.checked) {
      $('#final-step').find('.error-message').hide();
      $('#report-form_submit').prop('disabled', false);
      $('#report-form_submit').removeClass('disabled');
    } else {
      $('#final-step').find('.error-message').show();
      $('#report-form_submit').prop('disabled', true);
      $('#report-form_submit').addClass('disabled');
    }
  });
}
