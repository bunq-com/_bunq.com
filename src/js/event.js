// Set the date we're counting down to, the time in PST
const countDownDate = new Date('Oct 11, 2022 20:20:00 GMT+2');

// Update the count down every 1 second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds and use minimumInteger to make sure all elements have 2 digits
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString(
    undefined,
    { minimumIntegerDigits: 2 }
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString(
    undefined,
    { minimumIntegerDigits: 2 }
  );
  const seconds = Math.floor((distance % (1000 * 60)) / 1000).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });

  // Display the result in the elements with id="days", id="hours", id="minutes", and id = "seconds"
  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  // If the count down is finished, remove the countdown element and copy, remove a combo class to reveal launch message
  if (distance < 0) {
    clearInterval(x);
    const itsTime = document.getElementById('during-event');
    const timeWrapper = document.getElementById('before-event');
    timeWrapper.remove();
    itsTime.classList.remove('hide');
  }
}, 0);