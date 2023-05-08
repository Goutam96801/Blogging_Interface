// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const blogSection = document.querySelector('.blogs-section');
const loadingScreen = document.querySelector('.loading-screen');


// Update the UI based on the user's login status
auth.onAuthStateChanged(async (user) => {
    try {
        if (user) {
            getUserWrittenBlogs();
            login.style.display = "none";

        } else {
            setupLoginButton();
        }
    } catch (error) {
        console.log("Error");
        loadingScreen.style.display = 'none';
    }
});

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectURL) {
                login.style.display = "none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signUpOptions: {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            defaultCountry: 'US',
            defaultNationalNumber: '',
            disablePhoneNumberVerification: false,
        }
    });
};

// Fetch user-written blogs
const getUserWrittenBlogs = async () => {
    loadingScreen.style.display = 'block'; // Show the loading screen
    try {
        const blogs = await db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')[0]).get();
        blogs.forEach((blog) => {
            createBlog(blog);
        });
        loadingScreen.style.display = 'none'; // Hide the loading screen
    } catch (error) {
        console.log("Error getting blogs");
        loadingScreen.style.display = 'none'; // Hide the loading screen (in case of error)
    }
};

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card" style="padding:20px">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
        <a href="/${blog.id}" class="btn grey">edit</a>
        <a href="#" onClick="deleteBlog('${blog.id}', '${data.bannerImage}')"
            class="btn danger">delete</a>
    </div>
    `;
};
const deleteBlog = async (id) => {
    try {
        const blogRef = db.collection("blogs").doc(id);
        const blogDoc = await blogRef.get();

        if (blogDoc.exists) {
            const blogData = blogDoc.data();
            const bannerImageURL = blogData.bannerImage;

            await blogRef.delete();
            await deleteImageFromStorage(bannerImageURL);

            location.reload();
        }
    } catch (error) {
        console.log("Error deleting the blog", error);
    }
};

const deleteImageFromStorage = async (imageUrl) => {
    try {
        // Get the reference to the image file in Firebase Storage
        const imageRef = firebase.storage().refFromURL(imageUrl);
        // Delete the image file from Firebase Storage
        await imageRef.delete();
        console.log("Image deleted from Firebase Storage");
    } catch (error) {
        console.log("Error deleting the image from Firebase Storage", error);
    }
};

