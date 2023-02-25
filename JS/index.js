const toggleButton = document.querySelector('.navbar label');
const menu = document.querySelector('.list');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('active');
});
