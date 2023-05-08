

let ul = document.querySelector('.links-container');

auth.onAuthStateChanged((user) => {
    if (user) {
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
        <li class="link-item"><a href="#" onClick="logoutUser()" class="link">Logout</a></li>
        `
    }
    else {
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Login</a></li>
        `
    }
})

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.link');
  
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.forEach(otherLink => otherLink.classList.remove('active'));
          link.classList.add('active');
      });
  });
});


