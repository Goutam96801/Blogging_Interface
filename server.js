const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

// Image upload endpoint
// upload link
app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image name
  let imageName = date.getDate() + date.getTime() + file.name;
  // Firebase Storage reference
  let storageRef = firebase.storage().ref('uploads/' + imageName);

  // Upload the file to Firebase Storage
  storageRef.put(file).then(() => {
    // Get the download URL of the uploaded image
    storageRef.getDownloadURL().then(downloadURL => {
      res.json(downloadURL);
    }).catch(error => {
      console.error('Error getting download URL', error);
      res.status(500).send('Error getting download URL');
    });
  }).catch(error => {
    console.error('Error uploading image', error);
    res.status(500).send('Error uploading image');
  });
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/:blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/:blog/editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
