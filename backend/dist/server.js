"use strict";

var express = require('express');
var path = require('path');
var fileupload = require('express-fileupload');
var port = process.env.PORT || 3000;
var app = express();
app.use(express["static"](path.join(__dirname, '../public')));
app.use(fileupload());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.get('/editor', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'editor.html'));
});

// Image upload endpoint
// upload link
app.post('/upload', function (req, res) {
  var file = req.files.image;
  var date = new Date();
  // image name
  var imageName = date.getDate() + date.getTime() + file.name;
  // Firebase Storage reference
  var storageRef = firebase.storage().ref('uploads/' + imageName);

  // Upload the file to Firebase Storage
  storageRef.put(file).then(function () {
    // Get the download URL of the uploaded image
    storageRef.getDownloadURL().then(function (downloadURL) {
      res.json(downloadURL);
    })["catch"](function (error) {
      console.error('Error getting download URL', error);
      res.status(500).send('Error getting download URL');
    });
  })["catch"](function (error) {
    console.error('Error uploading image', error);
    res.status(500).send('Error uploading image');
  });
});
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});
app.get('/:blog', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'blog.html'));
});
app.get('/:blog/editor', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'editor.html'));
});
app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});