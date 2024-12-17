# Project Name

A Node.js-based project that serves a frontend application and supports image upload functionality using Firebase Storage. The project includes:

- A backend server built with Express.js.
- A public folder for static frontend files.
- Firebase integration for authentication, storing blogs uploading and retrieving images.

---

## Folder Structure

```
root/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Project dependencies and scripts
│   └── node_modules/      # Installed dependencies (after `npm install`)
├── public/
│   ├── index.html         # Homepage
│   ├── editor.html        # Blog editor page
│   ├── dashboard.html     # Admin dashboard
│   ├── blog.html          # Blog display page
│   ├── 404.html           # Not found page
│   ├── js/                # JavaScript files for frontend functionality
│   ├── css/               # CSS files for styling
│   └── images/            # Assests
```

---

## Features

- **Static Frontend**: HTML, CSS, and JS files served from the `public` folder.
- **Image Upload**: Supports uploading images to Firebase Storage and returning a downloadable URL.
- **Dynamic Routing**: Routes for homepage, blog pages, and editor pages.
- **Error Handling**: 404 page for undefined routes.

---

## Requirements

- [Node.js](https://nodejs.org/) (version 16 or higher)
- Firebase project setup (for image upload functionality)

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure Firebase:
   - Replace the Firebase configuration in `js/firebase.js` with your project's credentials:
     ```javascript
     var firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

5. Start the server:
   ```bash
   node server.js
   ```

6. Open your browser and go to `http://localhost:3000`.

---

## Live Link
[text](https://blogging-interface.onrender.com/)


## API Endpoints

### `GET /`
Serves the `index.html` file.

### `GET /editor`
Serves the `editor.html` file.

### `POST /upload`
Uploads an image to Firebase Storage and returns the download URL.

- **Request:**
  - `image`: Form-data file upload.
- **Response:**
  - `downloadURL`: URL of the uploaded image.

### `GET /admin`
Serves the `dashboard.html` file.

### `GET /:blog`
Serves the `blog.html` file for a given blog.

### `GET /:blog/editor`
Serves the `editor.html` file for editing a blog.

### `404 Error`
Serves the `404.html` file for unknown routes.

---

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firebase Authentication.
2. Enable Firebase Storage.
3. Update the Firebase configuration in `server.js`.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **File Upload**: Firebase Storage

---

## Known Issues

- Ensure the Firebase SDK is correctly initialized before uploading images.
- Use a valid Firebase project configuration for the backend.

---

## License
This project is licensed under the MIT License.
