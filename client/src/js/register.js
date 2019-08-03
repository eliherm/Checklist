// TODO: Add validation

// Import local modules
import { postUser } from './modules/ajax.js';
import { errHandler, resetErrors } from './modules/register-util';

const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', () => {
  let formData = new URLSearchParams(new FormData(registerForm));
  resetErrors();

  postUser('/users', formData).then((serverResponse) => {
    if (serverResponse.success) {
      window.location.href = '/login/';
    } else {
      errHandler(serverResponse);
    }
  }).catch(err => errHandler(err));
}, false);
