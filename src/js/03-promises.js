// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   inpDelay: document.querySelector('input[name=delay]'),
//   inpStep: document.querySelector('input[name=step]'),
//   inpAmount: document.querySelector('input[name=amount]'),
//   formEl: document.querySelector('.form'),
// };

// refs.formEl.addEventListener('submit', getValues);

// function getValues(event) {
//   event.preventDefault();
//   const dataDelay = parseInt(refs.inpDelay.value);
//   const step = parseInt(refs.inpStep.value);
//   const amount = parseInt(refs.inpAmount.value);
//   const data = { dataDelay, step, amount };
//   console.log(data);
//   promiseCaller(data);
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function promiseCaller({ dataDelay, step, amount }) {
//   for (let i = 0; i < amount; i += 1) {
//     let position = i + 1;
//     let delay = dataDelay + i * step;
//     createPromise(position, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }

// 18.03.25

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ref = {
  formEl: document.querySelector('.form'),
};

ref.formEl.addEventListener('submit', onFormSubmit);
const data = {};

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(ref.formEl);
  formData.forEach((value, name) => {
    {
      data[name] = value;
    }
  });

  promiseCaller(data);
  console.log('data', data);
}

function promiseCaller({ delay, step, amount }) {
  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);

  for (let i = 0; i < amount; i += 1) {
    let currentDelay = delay + i * step;
    console.log('currentDelay', currentDelay);
    let position = i + 1;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
