const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload')
const port = 3000


const app = express();
app.use(express.static("public"));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/editor.html"));
})

//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv("path", (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)

        }
    })
})
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/dashboard.html"));
})

app.get("/:blog", (req, res) => { 
    res.sendFile(path.join(__dirname, "/public/blog.html"));
})

app.get("/:blog/editor", (Req, res) => {
    res.sendFile(path.join(__dirname, "/public/editor.html"));
})

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, "/public/404.html"));
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`); 
})