import validator from 'validator';

export const extractForm = (form) => {
  let formInfo = {};
  for (let field of form.entries()) {
    formInfo[field[0]] = field[1];
  }
  return formInfo;
};

export const validatePost = (form) => {
  let userName = form.get('userName');
  let password = form.get('password');

  userName = validator.trim(userName);
  if (validator.isEmpty(userName)) {
    return { isValid: false, form: null };
  }
  userName = validator.escape(userName);

  if (validator.isEmpty(password)) {
    return { isValid: false, form: null };
  }

  form.set('userName', userName);
  return { isValid: true, form: form };
};