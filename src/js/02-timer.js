// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   inputEl: document.querySelector('#datetime-picker'),
//   btnEl: document.querySelector('[data-start]'),
//   daysEl: document.querySelector('[data-days]'),
//   hoursEl: document.querySelector('[data-hours]'),
//   minutesEl: document.querySelector('[data-minutes]'),
//   secondsEl: document.querySelector('[data-seconds]'),
// };

// refs.btnEl.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       Notify.failure('Please choose a date in the future');
//     } else {
//       refs.btnEl.disabled = false;
//       refs.btnEl.addEventListener('click', onBtnClick);
//     }
//   },
// };

// let intervalId = null;

// const fp = flatpickr('#datetime-picker', options);

// function onBtnClick(event) {
//   if (intervalId !== null) {
//     return;
//   }

//   const selectedTime = new Date(refs.inputEl.value);
//   intervalId = setInterval(() => {
//     const currentTime = Date.now();
//     let ms = selectedTime.getTime() - currentTime;

//     if (ms <= 0) {
//       clearInterval(intervalId);
//       ms = 0;
//       intervalId = null;
//       refs.btnEl.disabled = false;
//       refs.inputEl.disabled = false;
//     }
//     let timeData = convertMs(ms);
//     addLeadingZero(timeData);
//   }, 1000);

//   refs.btnEl.disabled = true;
//   refs.inputEl.disabled = true;
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function padStart(value) {
//   return String(value).padStart(2, 0);
// }

// function addLeadingZero({ days, hours, minutes, seconds }) {
//   refs.daysEl.textContent = padStart(`${days}`);
//   refs.hoursEl.textContent = padStart(`${hours}`);
//   refs.minutesEl.textContent = padStart(`${minutes}`);
//   refs.secondsEl.textContent = padStart(`${seconds}`);
// }
// 16.03.25
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timeInput: document.querySelector('#datetime-picker'),
  startTimerBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.startTimerBtn.disabled = true;
      window.alert('Please choose a date in the future');
      return;
    }
    refs.startTimerBtn.disabled = false;
    refs.startTimerBtn.addEventListener('click', onStartBtn);
  },
};

const date = flatpickr(refs.timeInput, options);
let timer = null;
const DELAY = 1000;

function onStartBtn() {
  if (!refs.timeInput.value) {
    return;
  }
  refs.startTimerBtn.disabled = true;
  timer = setInterval(calculateTime, DELAY);
}

function calculateTime() {
  const targetTime = new Date(refs.timeInput.value);
  const currentTime = Date.now();
  const ms = targetTime.getTime() - currentTime;
  const { days, hours, minutes, seconds } = convertMs(ms);
  redrawInterface({ days, hours, minutes, seconds });
  if (ms < 0) {
    clearInterval(timer);
    refs.startTimerBtn.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function padStart(value) {
  return String(value).padStart(2, '0');
}

function redrawInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = padStart(`${days}`);
  refs.hours.textContent = padStart(`${hours}`);
  refs.minutes.textContent = padStart(`${minutes}`);
  refs.seconds.textContent = padStart(`${seconds}`);
}
