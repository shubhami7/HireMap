// Find the express.js module
const express = require('express');

// Create an express app
const app = express();

// Run the app on port 3021
app.listen(3021, () => {
    console.log("The server has started!");
});