import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnEl.disabled = false;
      refs.btnEl.addEventListener('click', onBtnClick);
    }
  },
};

let intervalId = null;

const fp = flatpickr('#datetime-picker', options);

function onBtnClick(event) {
  const selectedTime = flatpickr.parseDate(refs.inputEl.value);
  if (intervalId !== null) {
    return;
  }

  intervalId = setInterval(() => {
    const curretnTime = Date.now();
    let ms = selectedTime.getTime() - curretnTime;

    if (ms <= 0) {
      clearInterval(intervalId);
      ms = 0;
      intervalId = null;
      refs.inputEl.disabled = false;
    }
    let timeData = convertMs(ms);
    addLeadingZero(timeData);
  }, 1000);

  refs.btnEl.disabled = true;
  refs.inputEl.disabled = true;
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
  return String(value).padStart(2, 0);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = padStart(`${days}`);
  refs.hoursEl.textContent = padStart(`${hours}`);
  refs.minutesEl.textContent = padStart(`${minutes}`);
  refs.secondsEl.textContent = padStart(`${seconds}`);
}
