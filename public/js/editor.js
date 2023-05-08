const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const loadingScreen = document.querySelector('.loading-screen');

// Firebase Storage references
const storageRef = firebase.storage().ref();
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

// Event listener for banner image upload
document.querySelector('#banner-upload').addEventListener('change', () => {
    uploadImage(document.querySelector('#banner-upload'), "banner");
});

// Event listener for content image upload
uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

loadingScreen.style.display = 'none';

// Function to upload image to Firebase Storage
const uploadImage = async (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        loadingScreen.style.display = 'block';
        const imageRef = storageRef.child(`${uploadType}/${file.name}`);

        try {
            const snapshot = await imageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();

            if (uploadType === "image") {
                addImage(downloadURL, file.name);
            } else {
                bannerPath = downloadURL;
                document.querySelector('.banner').style.backgroundImage = `url("${bannerPath}")`;
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }

        loadingScreen.style.display = 'none'; // Hide loading screen
    } else {
        alert("Please upload an image file");
    }
};

// Function to add image to the article content
const addImage = (imagePath, alt) => {
    const curPos = articleField.selectionStart;
    const textToInsert = `\r![${alt}](${imagePath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Event listener for publish button click
publishBtn.addEventListener('click', async () => {
    if (articleField.value.length && blogTitleField.value.length) {
        const docName = generateDocName();

        const date = new Date(); // for published at info

        loadingScreen.style.display = 'block'; // Display loading screen
        try {
            // Access Firestore with db variable
            await db.collection("blogs").doc(docName).set({
                title: blogTitleField.value,
                article: articleField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
                author: auth.currentUser.email.split("@")[0]
            });
            location.href = `/${docName}`;
        } catch (error) {
            console.error(error);
        }

        loadingScreen.style.display = 'none'; // Hide loading screen
    }
});

// Function to generate a unique document name
const generateDocName = () => {
    if (blogID[0] === 'editor') {
        // Generating id
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }
        return `${blogTitle}-${id}`;
    } else {
        return decodeURI(blogID[0]);
    }
};

// Checking if the user is logged in or not

auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin");
    }
});

// Checking if the user is logged in or not
auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin");
    }
});

// Checking for existing blog edits
let blogID = location.pathname.split("/");
blogID.shift(); // Remove the first empty element from the array

const loadBlogData = async () => {
    if (blogID[0] !== "editor") {
        // We are in an existing blog edit route
        const docRef = db.collection("blogs").doc(decodeURI(blogID[0]));
        try {
            const doc = await docRef.get();
            if (doc.exists) {
                const data = doc.data();
                bannerPath = data.bannerImage;
                document.querySelector('.banner').style.backgroundImage = `url(${bannerPath})`;
                blogTitleField.value = data.title;
                articleField.value = data.article;
            } else {
                location.replace("/"); // Redirect to home route
            }
        } catch (err) {
            console.error(err);
        }
    }
};
loadBlogData();
