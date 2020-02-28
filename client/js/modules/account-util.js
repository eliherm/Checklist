import validator from 'validator';

import { getMethod } from './ajax';

export const extractForm = (form) => {
  const formInfo = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const field of form.entries()) {
    // eslint-disable-next-line prefer-destructuring
    formInfo[field[0]] = field[1];
  }
  return formInfo;
};

export const populateFields = (fields) => {
  getMethod('/account/profile').then((serverResponse) => {
    if (serverResponse.success) {
      const { user } = serverResponse;

      fields.forEach((field) => {
        Object.keys(user).forEach((key) => {
          if (key === field.name) {
            field.value = user[key];
          }
        });
      });
    } else {
      console.error(serverResponse);
    }
  }).catch((err) => console.error(err));
};

export const resetErrors = (formFields) => {
  // Reset any errors
  formFields.forEach((field) => {
    field.style.border = '1px solid #D8D8D8';
  });
};

export const resetFields = (formFields) => {
  // Reset all fields
  formFields.forEach((field) => {
    field.value = '';
  });
};

export const errHandler = (errors, form, formFields) => {
  if (errors.validationErrors) {
    errors.validationErrors.forEach((error) => {
      const { msg } = error;

      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.appendChild(document.createTextNode(msg));

      formFields.forEach((field) => {
        if (field.name === error.param) {
          let cancelFlag = false;
          field.style.border = '1px solid #C11C1C';
          const fieldBox = form.querySelector(`#${field.name}-box`);
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
  const validationErrors = [];

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
    return { isValid: false, validationErrors, form: null };
  }

  form.set('firstName', firstName);
  form.set('lastName', lastName);
  form.set('userName', userName);
  form.set('email', email);
  return { isValid: true, form };
};

export const validatePasswords = (form) => {
  const validationErrors = [];

  const oldPassword = form.get('oldPassword');
  const newPassword = form.get('newPassword');
  const passwordConfirm = form.get('passwordConfirm');

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
    return { isValid: false, validationErrors, form: null };
  }

  return { isValid: true, form };
};
