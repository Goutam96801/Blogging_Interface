// Get form elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const dateInput = document.querySelector('#date');
const contentInput = document.querySelector('#content');

// Get blog post data from localStorage
const blogPost = JSON.parse(localStorage.getItem('blogPost'));

// If blog post data exists, fill in form fields
if (blogPost) {
  titleInput.value = blogPost.title;
  authorInput.value = blogPost.author;
  dateInput.value = blogPost.date;
  contentInput.value = blogPost.content;
}

// Save blog post data to localStorage on form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const blogPost = {
    title: titleInput.value,
    author: authorInput.value,
    date: dateInput.value,
    content: contentInput.value,
  };
  localStorage.setItem('blogPost', JSON.stringify(blogPost));
  alert('Blog post saved!');
});
