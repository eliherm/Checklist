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
