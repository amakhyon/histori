const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Require the upload middleware
const upload = require('./upload');



const ResumeParser = require('easy-resume-parser');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/upload.html'));
  });


// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
  
 

});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});