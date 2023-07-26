const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};
console.dir(refs.btnStartEl.disabled);
let intervalId = null;
refs.btnStartEl.addEventListener('click', onStartBtnClick);
refs.btnStopEl.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartBtnClick(event) {
  intervalId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  refs.btnStartEl.disabled = true;
  refs.btnStartEl.style.backgroundColor = '#C0C0C0';
  refs.btnStopEl.disabled = false;
  refs.btnStopEl.style.backgroundColor = '';
}

function onStopBtnClick(event) {
  clearInterval(intervalId);
  refs.btnStopEl.disabled = true;
  refs.btnStopEl.style.backgroundColor = '#C0C0C0';
  refs.btnStartEl.disabled = false;
  refs.btnStartEl.style.backgroundColor = '';
}

function btnStatus() {
  if (intervalId) {
  } else {
  }
}
