// Enable Babel polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const getMethod = async (url) => {
  const response = await fetch(url, {
    credentials: 'same-origin'
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    throw new Error(await response.text());
  }
};

export const postMethod = async (url, data) => {
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

export const updateMethod = async (url, data) => {
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

export const deleteMethod = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE'
  });

  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    return Promise.reject(await response.json());
  }
};
