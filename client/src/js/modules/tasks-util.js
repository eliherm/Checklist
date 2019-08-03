export const toggleStar = (star) => {
  if (star.classList.contains('fas')) {
    star.classList.replace('fas', 'far');
  } else {
    star.classList.replace('far', 'fas');
  }
};
