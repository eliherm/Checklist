// Import local modules
import { postMethod } from './modules/ajax';
import { validatePost } from './modules/login-util';

const loginForm = document.querySelector('.login-form');
const errorBox = document.querySelector('.error-box');

loginForm.addEventListener('submit', () => {
  const formData = new FormData(loginForm);
  const validationResult = validatePost(formData);

  if (validationResult.isValid) {
    const loginInfo = new URLSearchParams(validationResult.form);

    postMethod('/login', loginInfo).then((serverResponse) => {
      if (serverResponse.success) {
        localStorage.setItem('loginStatus', 'true');
        window.location.href = '/tasks/';
      } else {
        errorBox.style.display = 'flex';
      }
    }).catch((err) => console.error(err));
  }
}, false);
