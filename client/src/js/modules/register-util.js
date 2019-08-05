import validator from 'validator';

const registerForm = document.querySelector('.register-form');
const formFields = registerForm.querySelectorAll('input');
const errorBox = document.querySelector('.error-box');

export const extractForm = (form) => {
  let formInfo = {};
  for (let field of form.entries()) {
    formInfo[field[0]] = field[1];
  }
  return formInfo;
};

export const resetErrors = () => {
  // Reset any errors
  if (errorBox.style.display === 'flex') {
    formFields.forEach(field => {
      field.style.border = '1px solid #D8D8D8';
    });

    errorBox.innerText = '';
    errorBox.style.display = 'none';
  }
};

export const errHandler = (errors) => {
  if (errors.validationErrors) {
    errors.validationErrors.forEach((error, index, Array) => {
      let msg = error.msg;

      let paragragh = document.createElement('p');
      paragragh.appendChild(document.createTextNode(msg));

      if (index === (Array.length - 1)) {
        paragragh.classList.add('error-box-last');
      }

      errorBox.appendChild(paragragh);

      formFields.forEach(field => {
        if (field.name === error.param) {
          field.style.border = '1px solid #C11C1C';
        }
      });
    });
    errorBox.style.display = 'flex';
  } else {
    console.error(errors);
  }
};

export const validatePost = (form) => {
  let validationErrors = [];

  let firstName = form.get('firstName');
  let lastName = form.get('lastName');
  let userName = form.get('userName');
  let email = form.get('email');
  let password = form.get('password');
  let passwordConfirm = form.get('passwordConfirm');

  firstName = validator.trim(firstName);
  if (validator.isEmpty(firstName)) {
    validationErrors.push({ param: 'firstName', msg: 'First name is required' });
  }
  firstName = validator.escape(firstName);

  lastName = validator.trim(lastName);
  lastName = validator.escape(lastName);

  userName = validator.trim(userName);
  if (validator.isEmpty(userName)) {
    validationErrors.push({ param: 'userName', msg: 'Username is required' });
  }
  userName = validator.escape(userName);

  if (validator.isEmpty(email)) {
    validationErrors.push({ param: 'email', msg: 'Email is required' });
  }
  if (!(validator.isEmail(email))) {
    validationErrors.push({ param: 'email', msg: 'Invalid email format' });
  }
  email = validator.normalizeEmail(email);

  if (!(validator.isLength(password, { min: 6 }))) {
    validationErrors.push({ param: 'password', msg: 'The password must be at least 6 characters' });
  }

  if (passwordConfirm !== password) {
    validationErrors.push({ param: 'passwordConfirm', msg: 'Confirmation password does not match password' });
  }

  if (validationErrors.length > 0) {
    return { isValid: false, validationErrors: validationErrors, form: null };
  }

  form.set('firstName', firstName);
  form.set('lastName', lastName);
  form.set('userName', userName);
  form.set('email', email);
  form.set('password', password);
  form.set('passwordConfirm', passwordConfirm);
  return { isValid: true, form: form };
};
