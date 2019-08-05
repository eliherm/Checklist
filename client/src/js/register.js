//TODO: Add Hover for client side validation errors

// Import local modules
import { postUser } from './modules/ajax.js';
import { errHandler, resetErrors, validatePost } from './modules/register-util';

const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', () => {
  let formData = new FormData(registerForm);
  let validationResult = validatePost(formData);
  resetErrors();

  if (validationResult.isValid) {
    let registerInfo = new URLSearchParams(validationResult.form);

    postUser('/users', registerInfo).then((serverResponse) => {
      if (serverResponse.success) {
        window.location.href = '/login/';
      } else {
        errHandler(serverResponse);
      }
    }).catch(err => errHandler(err));
  } else {
    errHandler(validationResult);
  }
}, false);
