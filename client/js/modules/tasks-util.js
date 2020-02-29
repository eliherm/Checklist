import validator from 'validator';

export const toggleStar = (star) => {
  if (star.classList.contains('fas')) {
    star.classList.replace('fas', 'far');
  } else {
    star.classList.replace('far', 'fas');
  }
};

export const validatePost = (description) => {
  description = validator.trim(description);
  if (validator.isEmpty(description)) {
    return { isValid: false, description: null };
  }
  description = validator.escape(description);
  return { isValid: true, description };
};
