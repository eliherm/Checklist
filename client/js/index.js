const navList = document.querySelector('.nav-ul');
const navLinks = navList.querySelectorAll('li');
let logoutLink = null;

if (localStorage.getItem('loginStatus') === 'true') {
  // Remove current links
  navLinks.forEach(link => {
    link.remove();
  });

  let navLinksArray = ['tasks', 'account', 'logout'];

  // Add new links
  navLinksArray.forEach(link => {
    let listItem = document.createElement('li');
    let anchor = document.createElement('a');

    anchor.setAttribute('href', `/${link}`);

    anchor.appendChild(document.createTextNode(link.substring(0, 1).toUpperCase() + link.substring(1))); // Capitalize link names
    listItem.appendChild(anchor);

    if (link === 'logout') {
      logoutLink = listItem;
    }

    navList.appendChild(listItem);
  });
}

// Logout event listener
if (logoutLink) {
  logoutLink.addEventListener('click', () => localStorage.removeItem('loginStatus'), false);
}
