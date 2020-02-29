import validator from 'validator';

// Import local modules
import { deleteMethod, updateMethod } from './ajax';
import { toggleStar, validatePost } from './tasks-util';

// Import sound effects
const completeAudio = new Audio('/audio/complete.wav');
const deleteAudio = new Audio('/audio/delete.wav');

const tasksList = document.querySelector('.tasks-list');

// eslint-disable-next-line import/prefer-default-export
export const displayTask = (task) => {
  // Create HTML elements
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('task-item');

  const completedDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const modifyBtnDiv = document.createElement('div');
  const starredDiv = document.createElement('div');
  const modifyDiv = document.createElement('div');
  const modifyForm = document.createElement('form');

  completedDiv.classList.add('completed-box');
  descriptionDiv.classList.add('description-box');
  modifyBtnDiv.classList.add('modifyBtn-box');
  starredDiv.classList.add('starred-box');
  modifyDiv.classList.add('modify-box');

  modifyForm.classList.add('modify-task-form');
  // eslint-disable-next-line no-script-url
  modifyForm.setAttribute('action', 'javascript:');
  modifyForm.setAttribute('autocomplete', 'off');
  modifyForm.setAttribute('novalidate', '');

  const checkboxDiv = document.createElement('div');
  const descriptionPara = document.createElement('p');
  const modifyIcon = document.createElement('i');
  const starredIcon = document.createElement('i');
  const deleteIcon = document.createElement('i');
  const modifyInput = document.createElement('input');

  checkboxDiv.classList.add('checkbox');
  descriptionPara.appendChild(document.createTextNode(validator.unescape(task.description)));
  modifyIcon.classList.add('far', 'fa-edit');

  if (task.completed === 1) {
    checkboxDiv.classList.add('checkbox-complete');
    descriptionPara.classList.add('description-complete');
    itemDiv.classList.add('task-item-complete');
  }

  if (task.starred === 1) {
    starredIcon.classList.add('fas', 'fa-star');
  } else {
    starredIcon.classList.add('far', 'fa-star');
  }

  deleteIcon.classList.add('fas', 'fa-trash-alt');

  modifyInput.setAttribute('type', 'text');
  modifyInput.setAttribute('id', 'description-mod');
  modifyInput.setAttribute('name', 'description');
  modifyInput.setAttribute('placeholder', 'Modify the task ...');
  modifyInput.setAttribute('required', '');

  // Append HTML elements
  completedDiv.appendChild(checkboxDiv);
  descriptionDiv.appendChild(descriptionPara);
  modifyBtnDiv.appendChild(modifyIcon);
  starredDiv.appendChild(starredIcon);
  modifyForm.appendChild(modifyInput);
  modifyDiv.appendChild(modifyForm);
  modifyDiv.appendChild(deleteIcon);

  itemDiv.appendChild(completedDiv);
  itemDiv.appendChild(descriptionDiv);
  itemDiv.appendChild(modifyBtnDiv);
  itemDiv.appendChild(starredDiv);
  itemDiv.appendChild(modifyDiv);

  tasksList.appendChild(itemDiv);

  // Event listeners
  checkboxDiv.addEventListener('click', () => {
    checkboxDiv.classList.toggle('checkbox-complete');
    descriptionPara.classList.toggle('description-complete');
    itemDiv.classList.toggle('task-item-complete');

    if (checkboxDiv.classList.contains('checkbox-complete')) {
      completeAudio.play().catch((err) => console.error(err));
    }

    // eslint-disable-next-line no-unused-expressions
    task.completed === 1 ? task.completed = 0 : task.completed = 1;
    const taskUpdate = { completed: task.completed };

    updateMethod(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then((serverResponse) => {
      if (!serverResponse.success) {
        console.error(serverResponse);
      }
    }).catch((err) => console.error(err));
  }, false);

  modifyIcon.addEventListener('click', () => {
    modifyDiv.classList.toggle('show-modify-box');
    modifyIcon.classList.toggle('fa-edit');
    modifyIcon.classList.toggle('far');
    modifyIcon.classList.toggle('fa-times');
    modifyIcon.classList.toggle('fas');
  }, false);

  starredIcon.addEventListener('click', () => {
    toggleStar(starredIcon);

    // eslint-disable-next-line no-unused-expressions
    task.starred === 1 ? task.starred = 0 : task.starred = 1;
    const taskUpdate = { starred: task.starred };

    updateMethod(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then((serverResponse) => {
      if (!serverResponse.success) {
        console.error(serverResponse);
      }
    }).catch((err) => console.error(err));
  }, false);

  deleteIcon.addEventListener('click', () => {
    deleteMethod(`/tasks/${task.id}`).then((serverResponse) => {
      if (serverResponse.success) {
        deleteAudio.play().catch((err) => console.error(err));
        itemDiv.remove(); // No IE support
      } else {
        console.error(serverResponse);
      }
    }).catch((err) => console.error(err));
  }, false);

  modifyForm.addEventListener('submit', () => {
    const formData = new FormData(modifyForm);
    const validationResult = validatePost(formData.get('description'));

    modifyInput.value = '';

    if (validationResult.isValid) {
      const taskUpdate = { description: validationResult.description };
      updateMethod(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then((serverResponse) => {
        if (serverResponse.success) {
          descriptionPara.replaceChild(
            document.createTextNode(validator.unescape(validationResult.description)),
            descriptionPara.firstChild
          );
        } else {
          console.error(serverResponse);
        }
      }).catch((err) => console.error(err));
    }
  }, false);
};
