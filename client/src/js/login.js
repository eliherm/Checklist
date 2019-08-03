// Import local modules
import { postUser } from './modules/ajax.js';
import { validatePost } from './modules/login-util.js';

const loginForm = document.querySelector('.login-form');
const errorBox = document.querySelector('.error-box');

loginForm.addEventListener('submit', () => {
  let formData = new FormData(loginForm);
  let validationResult = validatePost(formData);

  if (validationResult.isValid) {
    let loginInfo = new URLSearchParams(validationResult.form);

    postUser('/login', loginInfo).then((serverResponse) => {
      if (serverResponse.success) {
        localStorage.setItem('loginStatus', 'true');
        window.location.href = '/tasks/';
      } else {
        errorBox.style.display = 'flex';
      }
    }).catch(err => console.error(err));
  }
}, false);
