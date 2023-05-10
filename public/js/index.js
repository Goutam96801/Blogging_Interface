const blogSection = document.querySelector('.blogs-section');
const loadingScreen = document.querySelector('.loading-screen');

const getBlogs = async () => {
  loadingScreen.style.display = 'block'; // show the loading image
  const blogs = await db.collection("blogs").get();
  loadingScreen.style.display = 'none'; // hide the loading image
  return blogs;
};

const displayBlogs = async () => {
  const blogs = await getBlogs();
  blogs.forEach(blog => {
    if (blog.id != decodeURI(location.pathname.split("/").pop())) {
      createBlog(blog);
    }
  });
};

displayBlogs();

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function handleSearch(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm !== '') {
    clearBlogs(); // Clear existing blogs

    const blogs = getBlogs().then(snapshot => {
      snapshot.forEach(blog => {
        const blogData = blog.data();
        if (blogData.title.toLowerCase().includes(searchTerm) || blogData.article.toLowerCase().includes(searchTerm)) {
          createBlog(blog);
        }
      });
    });
  }
}

function clearBlogs() {
  blogSection.innerHTML = '';
}

searchForm.addEventListener('submit', handleSearch);
