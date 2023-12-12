const express = require('express'); 
  
const app = express(); 
const PORT = 3000; 

app.get('/', (req, res)=>{ 
    res.status(200); 

    res.send("Welcome to root URL of Server"); 
});

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) ;
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);





// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const fs = require('fs');
const path = require('path');


function checkFileContent(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Check if the file content includes the target content
    console.log(data);
    
    app.get('/view', (req,res)=>{
        res.send(data); 
    })
  });
}

// File path and target content to check for
const filePath = '../webpage/details.txt';
const targetContent = 'Dumpster ID: 1234'; // Adjust this to your specific target content

// Interval in milliseconds (e.g., check every 50 seconds)
const interval = 50000;

// Set up an interval to periodically check the file
setInterval(() => {
  checkFileContent(filePath);
}, interval);





// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });

app.get('/bg.jpg', function(req, res) {
    res.sendFile(__dirname + "/" + "bg.jpg");
});


app.get('/webpage', (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html')); 
});

app.get('/script.js', (req,res)=>{
    res.sendFile(__dirname + "/" + "script.js");
});
