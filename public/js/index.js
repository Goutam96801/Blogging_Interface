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
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
      createBlog(blog);
    }
  });
};

displayBlogs();
// db.collection("blogs").get().then((blogs) => {
//     blogs.forEach(blog => {
//         if(blog.id != decodeURI(location.pathname.split("/").pop())){
//             createBlog(blog);
//         }
//     })
// })

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