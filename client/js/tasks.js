// Import local modules
import { getMethod, postMethod } from './modules/ajax';
import { displayTask } from './modules/displayTask';
import { toggleStar, validatePost } from './modules/tasks-util';

const postTaskForm = document.querySelector('.post-task-form');
const formInput = document.querySelector('#description');
const postStarred = document.querySelector('#post-star');
const logoutLink = document.querySelector('.logout-link');

const appendTask = (taskId) => {
  getMethod(`/tasks/${taskId}`).then((task) => {
    displayTask(task[0]);
  }).catch((err) => console.error(err));
};

const clearInputs = (option) => {
  if (option === 'post') {
    formInput.value = '';
    if (postStarred.classList.contains('fas')) {
      postStarred.classList.replace('fas', 'far');
    }
  }
};

const submitTask = () => {
  const formData = new FormData(postTaskForm);
  const validationResult = validatePost(formData.get('description'));

  if (validationResult.isValid) {
    formData.set('description', validationResult.description);
    formData.set('completed', '0');

    if (postStarred.classList.contains('fas')) {
      formData.set('starred', '1');
    } else {
      formData.set('starred', '0');
    }

    const formToUrl = new URLSearchParams(formData);

    postMethod('/tasks', formToUrl).then((serverResponse) => {
      if (serverResponse.success) {
        clearInputs('post');
        appendTask(serverResponse.taskId);
      } else {
        console.error(serverResponse);
      }
    }).catch((err) => console.error(err));
  } else {
    clearInputs('post');
  }
};

// Fetch all tasks
getMethod('/tasks/all').then((tasks) => {
  tasks.forEach((task) => {
    displayTask(task);
  });
}).catch((err) => console.error(err));

// Event listeners
logoutLink.addEventListener('click', () => localStorage.removeItem('loginStatus'), false); // Change login status
postStarred.addEventListener('click', () => toggleStar(postStarred), false);
postTaskForm.addEventListener('submit', () => submitTask(), false);
