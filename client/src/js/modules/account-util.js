import validator from 'validator';

import { getMethod } from './ajax.js';

export const extractForm = (form) => {
  let formInfo = {};
  for (let field of form.entries()) {
    formInfo[field[0]] = field[1];
  }
  return formInfo;
};

export const populateFields = (fields) => {
  getMethod('/account/profile').then((serverResponse) => {
    if (serverResponse.success) {
      let user = serverResponse.user;

      fields.forEach(field => {
        Object.keys(user).forEach(key => {
          if (key === field.name) {
            field.value = user[key];
          }
        });
      });
    } else {
      console.error(serverResponse);
    }
  }).catch(err => console.error(err));
};

export const resetErrors = (formFields) => {
  // Reset any errors
  formFields.forEach(field => {
    field.style.border = '1px solid #D8D8D8';
  });
};

export const resetFields = (formFields) => {
  // Reset all fields
  formFields.forEach(field => {
    field.value = '';
  });
};

export const errHandler = (errors, form, formFields) => {
  if (errors.validationErrors) {
    errors.validationErrors.forEach((error) => {
      let msg = error.msg;

      let tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.appendChild(document.createTextNode(msg));

      formFields.forEach(field => {
        if (field.name === error.param) {
          let cancelFlag = false;
          field.style.border = '1px solid #C11C1C';
          let fieldBox = form.querySelector(`#${field.name}-box`);
          fieldBox.appendChild(tooltip);

          // Add Event Listeners
          field.addEventListener('keypress', () => {
            cancelFlag = true;
            field.style.border = '1px solid #D8D8D8'; // reset error
            tooltip.classList.remove('show-tooltip');
          }, false);

          field.addEventListener('keydown', (event) => {
            if (event.code === 'Backspace') {
              cancelFlag = true;
              field.style.border = '1px solid #D8D8D8'; // reset error
              tooltip.classList.remove('show-tooltip');
            }
          }, false);

          field.addEventListener('mouseenter', () => {
            if (!cancelFlag) {
              tooltip.classList.add('show-tooltip');
            }
          }, false);

          field.addEventListener('mouseleave', () => {
            if (!cancelFlag) {
              tooltip.classList.remove('show-tooltip');
            }
          }, false);
        }
      });
    });
  } else {
    console.error(errors);
  }
};

export const validateUpdate = (form) => {
  let validationErrors = [];

  let firstName = form.get('firstName');
  let lastName = form.get('lastName');
  let userName = form.get('userName');
  let email = form.get('email');

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

  if (validationErrors.length > 0) {
    return { isValid: false, validationErrors: validationErrors, form: null };
  }

  form.set('firstName', firstName);
  form.set('lastName', lastName);
  form.set('userName', userName);
  form.set('email', email);
  return { isValid: true, form: form };
};

export const validatePasswords = (form) => {
  let validationErrors = [];

  let oldPassword = form.get('oldPassword');
  let newPassword = form.get('newPassword');
  let passwordConfirm = form.get('passwordConfirm');

  if (!(validator.isLength(oldPassword, { min: 6 }))) {
    validationErrors.push({ param: 'oldPassword', msg: 'Invalid password' });
  }

  if (!(validator.isLength(newPassword, { min: 6 }))) {
    validationErrors.push({ param: 'newPassword', msg: 'The password must be at least 6 characters' });
  }
  if (newPassword === oldPassword) {
    validationErrors.push({ param: 'newPassword', msg: 'The new password is identical to the old password' });
  }

  if (passwordConfirm !== newPassword) {
    validationErrors.push({ param: 'passwordConfirm', msg: 'Confirmation password does not match new password' });
  }

  if (validationErrors.length > 0) {
    return { isValid: false, validationErrors: validationErrors, form: null };
  }

  return { isValid: true, form: form };
};
