const tasksList = document.querySelector('.tasks-list');
const postTaskForm = document.querySelector('.post-task-form');
const formInput = document.querySelector('#description');
const postStarred = document.querySelector('#post-star');
const logoutLink = document.querySelector('.logout-link');

// Sound effects
let completeAudio = new Audio('/audio/complete.wav');
let deleteAudio = new Audio('/audio/delete.wav');

const getTasks = async (url) => {
  const response = await fetch(url, {
    credentials: 'same-origin'
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    throw new Error(await response.text());
  }
};

const postTask = async (url, data) => {
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

const updateTask = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
};

const deleteTask = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE'
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
};

const toggleStar = (star) => {
  if (star.classList.contains('fas')) {
    star.classList.replace('fas', 'far');
  } else {
    star.classList.replace('far', 'fas');
  }
};

const displayTask = (task) => {
  // Create HTML elements
  let itemDiv = document.createElement('div');
  itemDiv.classList.add('task-item');

  let completedDiv = document.createElement('div');
  let descriptionDiv = document.createElement('div');
  let modifyBtnDiv = document.createElement('div');
  let starredDiv = document.createElement('div');
  let modifyDiv = document.createElement('div');
  let modifyForm = document.createElement('form');

  completedDiv.classList.add('completed-box');
  descriptionDiv.classList.add('description-box');
  modifyBtnDiv.classList.add('modifyBtn-box');
  starredDiv.classList.add('starred-box');
  modifyDiv.classList.add('modify-box');

  modifyForm.classList.add('modify-task-form');
  modifyForm.setAttribute('action', 'javascript:');
  modifyForm.setAttribute('autocomplete', 'off');
  modifyForm.setAttribute('novalidate', '');

  let checkboxDiv = document.createElement('div');
  let descriptionPara = document.createElement('p');
  let modifyIcon = document.createElement('i');
  let starredIcon = document.createElement('i');
  let deleteIcon = document.createElement('i');
  let modifyInput = document.createElement('input');

  checkboxDiv.classList.add('checkbox');
  descriptionPara.appendChild(document.createTextNode(task.description));
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
      completeAudio.play().catch(err => console.error(err));
    }

    task.completed === 1 ? task.completed = 0 : task.completed = 1;
    let taskUpdate = { completed: task.completed };

    updateTask(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then( serverResponse => {
      if (!serverResponse.success) {
        console.error(serverResponse);
      }
    }).catch(err => console.error(err));
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

    task.starred === 1 ? task.starred = 0 : task.starred = 1;
    let taskUpdate = { starred: task.starred };

    updateTask(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then( serverResponse => {
      if (!serverResponse.success) {
        console.error(serverResponse);
      }
    }).catch(err => console.error(err));
  }, false);

  deleteIcon.addEventListener('click', () => {
    deleteTask(`/tasks/${task.id}`).then( serverResponse => {
      if (serverResponse.success) {
        deleteAudio.play().catch(err => console.error(err));
        itemDiv.remove(); // No IE support
      } else {
        console.error(serverResponse);
      }
    }).catch(err => console.error(err));
  }, false);

  modifyInput.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
      let formData = new FormData(modifyForm);
      modifyInput.value = '';
      let description = formData.get('description').trim();

      if (description !== '') {
        let taskUpdate = { description: description };
        updateTask(`/tasks/${task.id}`, JSON.stringify(taskUpdate)).then((serverResponse) => {
          if (serverResponse.success) {
            descriptionPara.replaceChild(document.createTextNode(description), descriptionPara.firstChild);
          } else {
            console.error(serverResponse);
          }
        }).catch(err => console.error(err));
      }
    }
  }, false);
};

const clearInputs = (option) => {
  if (option === 'post') {
    formInput.value = '';
    if (postStarred.classList.contains('fas')) {
      postStarred.classList.replace('fas', 'far');
    }
  }
};

const fetchTasks = () => {
  getTasks('/tasks/all').then(tasks => {
    tasks.forEach(task => {
      displayTask(task);
    });
  }).catch(err => console.error(err));
};

const appendTask = (taskId) => {
  getTasks(`/tasks/${taskId}`).then(task => {
    displayTask(task[0]);
  }).catch(err => console.error(err));
};

// eslint-disable-next-line no-unused-vars
function submitTask() {
  let formData = new FormData(postTaskForm);
  formData.set('description', formData.get('description').trim()); // Trim input

  if (formData.get('description') !== '') {
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
  }
}

// Fetch all tasks
fetchTasks();

// Event listeners
logoutLink.addEventListener('click', () => localStorage.removeItem('loginStatus'), false); // Change login status
postStarred.addEventListener('click', () => toggleStar(postStarred), false);
