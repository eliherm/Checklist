// Import local modules
import { postMethod } from './modules/ajax';
import { errHandler, resetErrors, validatePost } from './modules/register-util';

const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', () => {
  const formData = new FormData(registerForm);
  const validationResult = validatePost(formData);
  resetErrors();

  if (validationResult.isValid) {
    const registerInfo = new URLSearchParams(validationResult.form);

    postMethod('/users', registerInfo).then((serverResponse) => {
      if (serverResponse.success) {
        window.location.href = '/login/';
      } else {
        errHandler(serverResponse);
      }
    }).catch((err) => errHandler(err));
  } else {
    errHandler(validationResult);
  }
}, false);
