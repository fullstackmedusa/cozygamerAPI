const express = require('express');
const routes = require('./routes');
const db = require('./db');
const logger = require('morgan');
const firebase = require('firebase/app'); // Import the Firebase module
require('firebase/storage');
const storage = require('firebase/storage');

const app = express();

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
firebase.initializeApp(firebaseConfig);

app.use(express.json());
app.use(logger('dev'))
// app.use() middleware here ^ ///////////////////

app.use('/api', routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
