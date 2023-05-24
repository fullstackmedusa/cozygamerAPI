const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const multer = require('multer');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const { initializeApp } = require('firebase/app');


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHac1LlEAFux4CYMJZYPXdC5UmcxKUHgM",
    authDomain: "cozygamer-d078d.firebaseapp.com",
    projectId: "cozygamer-d078d",
    storageBucket: "cozygamer-d078d.appspot.com",
    messagingSenderId: "262582572616",
    appId: "1:262582572616:web:d4b7cf9533e08779daaa7d",
    measurementId: "G-J60THL0ST4"
  };
  
  
// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage(); // Get the storage instance

router.get('/', (req, res) => res.send('This is root!'));
// router.post('/games', controllers.createGame);
router.get('/games', controllers.getAllGames);
router.get('/games/:id', controllers.getGameById);
router.put('/games/:id', controllers.updateGame);
router.delete('/games/:id', controllers.deleteGame);


// Multer configuration
const upload = multer({ dest: 'uploads/' }); // Set the destination directory for uploaded files

// Upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    // Upload the file to Firebase Storage
    const storageRef = ref(storage, file.originalname);
    const snapshot = await uploadBytes(storageRef, fs.readFileSync(file.path));

    // Get the download URL of the uploaded file
    const image= await getDownloadURL(storageRef);

    // Remove the temporary file from the server
    fs.unlinkSync(file.path);
    //pass image url
    const game = await controllers.createGame(req.body, image)
    // Respond with the download URL
    return res.status(200).json({ game });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
});

module.exports = router;