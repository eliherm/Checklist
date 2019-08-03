const registerForm = document.querySelector('.register-form');
const formFields = registerForm.querySelectorAll('input');
const errorBox = document.querySelector('.error-box');

const postForm = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
};

const errHandler = (errors) => {
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
    console.log(errors);
  }
};

// eslint-disable-next-line no-unused-vars
function submitForm() {
  let formData = new URLSearchParams(new FormData(registerForm));

  // Reset any errors
  if (errorBox.style.display === 'flex') {
    formFields.forEach(field => {
      field.style.border = '1px solid #D8D8D8';
    });

    errorBox.innerText = '';
    errorBox.style.display = 'none';
  }

  postForm('/users', formData).then((serverResponse) => {
    if (serverResponse.success) {
      window.location.href = '/login/';
    } else {
      errHandler(serverResponse);
    }
  }).catch(err => errHandler(err));
}
