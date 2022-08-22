function getAllUrlParams() {
  const allParameter = new URLSearchParams(window.location.search);

  return Object.fromEntries(allParameter.entries());
}

/* Check if Lead Cookie already exist */
var cookieExist = Cookies.get('Lead'); // => 'value'
/* get URL params object */
var parameters = getAllUrlParams();
/*Convert a JavaScript object into a string */
var parametersJSON = JSON.stringify(parameters);
/* Check if the url with utm_parameters */
let isEmpty = jQuery.isEmptyObject(parameters);

/* OPTION 1 - if the page with parameters and no cookie exsist */
if (!isEmpty && cookieExist === undefined) {
  /* set lead object for the cockies */
  console.log('1 - Create Cockie');
  /*
          ## Set Cookies ##
          expires: If omitted, the cookie becomes a session cookie (This example)
      */
  createLead();
  setUTMformValues();
  location.reload();
} /*end if*/

/* OPTION 2 -
  if page with utm params but the lead already exsist (overide current Lead)
  else use the current cookie
  */
if (!isEmpty && cookieExist !== undefined) {
  if (
    JSON.parse(cookieExist).parameters.utm_source !== parameters.utm_source ||
    JSON.parse(cookieExist).parameters.utm_medium !== parameters.utm_medium ||
    JSON.parse(cookieExist).parameters.utm_campaign !== parameters.utm_campaign ||
    JSON.parse(cookieExist).parameters.utm_content !== parameters.utm_content ||
    JSON.parse(cookieExist).parameters.gclid !== parameters.gclid
  ) {
    console.log('lead Exist but with diff parames');
    Cookies.remove('Lead');
    createLead();
    console.log('Option 3');
    setUTMformValues();
  } else {
    console.log('option 2');
    setUTMformValues();
  }
}

/* option 3 - cookie Exist  but page without any utm param */
if (isEmpty && cookieExist !== undefined) {
  console.log('option 4');
  setUTMformValues();
}

function createLead() {
  var lead = {
    parameters: parameters,
  };
  /* if you want to add 2 days expires for example:
     Cookies.set('Lead', 'lead', { expires: 2})
     */
  Cookies.set('Lead', lead, { expires: 28 });
}

function setUTMformValues() {
  /* utm data */
  let utm_source_value = JSON.parse(Cookies.get('Lead')).parameters.utm_source;
  let utm_medium_value = JSON.parse(Cookies.get('Lead')).parameters.utm_medium;
  let utm_campaign_value = JSON.parse(Cookies.get('Lead')).parameters.utm_campaign;
  let utm_content_value = JSON.parse(Cookies.get('Lead')).parameters.utm_content;
  let gclid_value = JSON.parse(Cookies.get('Lead')).parameters.utm_gclid;

  var utm_source_nodes = document.getElementsByClassName('utm_source');
  var utm_medium_nodes = document.getElementsByClassName('utm_medium');
  var utm_campaign_nodes = document.getElementsByClassName('utm_campaign');
  var utm_content_nodes = document.getElementsByClassName('utm_content');
  var gclid_nodes = document.getElementsByClassName('gclid');
  /* 1 of 5 change all utm_source form fields */
  if (utm_source_nodes != null && utm_source_value !== undefined) {
    for (var i = 0; i < utm_source_nodes.length; i++) {
      utm_source_nodes[i].value = utm_source_value;
    }
  }
  /* 2 of 5 change all utm_source form fields */
  if (utm_medium_nodes != null && utm_medium_value !== undefined) {
    for (var i = 0; i < utm_source_nodes.length; i++) {
      utm_medium_nodes[i].value = utm_medium_value;
    }
  }
  /* 3 of 5 change all utm_campaign form fields */
  if (utm_campaign_nodes != null && utm_campaign_value !== undefined) {
    for (var i = 0; i < utm_source_nodes.length; i++) {
      utm_campaign_nodes[i].value = utm_campaign_value;
    }
  }
  /* 4 of 5 change all utm_content form fields */
  if (utm_content_nodes != null && utm_content_value !== undefined) {
    for (var i = 0; i < utm_source_nodes.length; i++) {
      utm_content_nodes[i].value = utm_content_value;
    }
  }
  /* 5 of 5 change all gclid form fields */
  if (gclid_nodes != null && gclid_value !== undefined) {
    for (var i = 0; i < utm_source_nodes.length; i++) {
      gclid_nodes[i].value = gclid_value;
    }
  }
}
