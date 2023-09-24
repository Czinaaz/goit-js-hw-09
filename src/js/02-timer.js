import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval;
let targetDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future.");
      startButton.disabled = true;
    } else {
      Notiflix.Notify.success("Date selected successfully!");
      startButton.disabled = false;
      targetDate = selectedDate;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); 

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success("Countdown completed!");
      dateTimePicker.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      timerFields.days.textContent = addLeadingZero(days);
      timerFields.hours.textContent = addLeadingZero(hours);
      timerFields.minutes.textContent = addLeadingZero(minutes);
      timerFields.seconds.textContent = addLeadingZero(seconds);
    }
  }
});