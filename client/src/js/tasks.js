// Enable Babel polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Import local modules
import { getTasks, postTask } from './modules/ajax.js';
import { displayTask } from './modules/displayTask';
import { toggleStar, validatePost  } from './modules/tasks-util';

const postTaskForm = document.querySelector('.post-task-form');
const formInput = document.querySelector('#description');
const postStarred = document.querySelector('#post-star');
const logoutLink = document.querySelector('.logout-link');

const appendTask = (taskId) => {
  getTasks(`/tasks/${taskId}`).then(task => {
    displayTask(task[0]);
  }).catch(err => console.error(err));
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
  let formData = new FormData(postTaskForm);
  let validationResult = validatePost(formData.get('description'));

  if (validationResult.isValid) {
    formData.set('description', validationResult.description);
    formData.set('completed', '0');

    if (postStarred.classList.contains('fas')) {
      formData.set('starred', '1');
    } else {
      formData.set('starred', '0');
    }

    let formToUrl = new URLSearchParams(formData);

    postTask('/tasks', formToUrl).then((serverResponse) => {
      if (serverResponse.success) {
        clearInputs('post');
        appendTask(serverResponse.taskId);
      } else {
        console.error(serverResponse);
      }
    }).catch(err => console.error(err));
  } else {
    clearInputs('post');
  }
};

// Fetch all tasks
getTasks('/tasks/all').then(tasks => {
  tasks.forEach(task => {
    displayTask(task);
  });
}).catch(err => console.error(err));

// Event listeners
logoutLink.addEventListener('click', () => localStorage.removeItem('loginStatus'), false); // Change login status
postStarred.addEventListener('click', () => toggleStar(postStarred), false);
formInput.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    submitTask();
  }
}, false);
