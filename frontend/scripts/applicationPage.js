// Event handlers for application page:
// Import DB from indexedDB.js
import {Database} from './indexedDB.js';

// // Create a store
const store = new Database('applicationDB');

// Get elements from the applicationInfo Page DOM
const appPosition = document.getElementById('position');
const appLocation = document.getElementById('location');
const appContacts = document.getElementById('contacts');
const appDescription = document.getElementById('description');
const appDateApplied = document.getElementById('dateApplied');
const appResume = document.getElementById('resume');
const appCoverLetter = document.getElementById('coverLetter');
const appInterviewDate = document.getElementById('interview-date');
const appInterviewType = document.getElementById('interview-format-1');
const appInterviewQs = document.getElementById('interview-questions-1');

// Event listener for add application information??

// when double click on application box, href to application page
const appBoxElement = document.getElementById('application-box');
appBoxElement.addEventListener("dblclick", () => {
    // go to application page
    // load application info into page elements
});



