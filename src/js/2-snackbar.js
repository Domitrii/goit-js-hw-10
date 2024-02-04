import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const inputState = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputState === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  }); 

  promise
    .then((message) => {
      iziToast.success({
        title: 'Success',
        message: `✅ ${message}`,
      });
    })
    .catch((message) => {
      iziToast.error({
        title: 'Error',
        message: `❌ ${message}`,
      });
    });
}