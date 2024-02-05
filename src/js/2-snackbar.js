import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const timeInput = document.querySelector('input[type=number]');

form.addEventListener('submit', createPromiseOnSubmit);

function createPromiseOnSubmit(event) {
  event.preventDefault();

  const dataForm = new FormData(event.target);
  const state = dataForm.get('state');
  const timeByUser = timeInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(timeByUser);
      } else {
        reject(timeByUser);
      }
    }, timeByUser);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${timeByUser} ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${timeByUser} ms`,
      });
    });

  timeInput.value = '';
}