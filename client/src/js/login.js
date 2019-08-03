const loginForm = document.querySelector('.login-form');
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
    throw new Error(await response.text());
  }
};

// eslint-disable-next-line no-unused-vars
function submitForm() {
  let formData = new URLSearchParams(new FormData(loginForm));
  postForm('/login', formData).then((serverResponse) => {
    if (serverResponse.success) {
      localStorage.setItem('loginStatus', 'true');
      window.location.href = '/tasks/';
    } else {
      errorBox.style.display = 'flex';
    }
  }).catch(err => console.log(err));
}
