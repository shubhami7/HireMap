import {Database} from '../components/indexedDB.js';
import { appQuery } from './script.js';

// // Create and open a database for applications called appDB
const db = new Database("appDB");
const appDB = await db.openDB();



//// when double click on application box, href to application page
// window.onload = function() {
//     const curApp = db.getAppByID()
  
//   }
// Get elements from application info DOM
console.log("loading...");
const appPosition = document.getElementById('pos');
const appLocation = document.getElementById('loc');
const appContacts = document.getElementById('contacts');
const appDescription = document.getElementById('description');
const appDateApplied = document.getElementById('dateApplied');
const appResume = document.getElementById('resume');
const appCoverLetter = document.getElementById('coverLetter');
const appInterviewDate = document.getElementById('interview-date');
const appInterviewType = document.getElementById('interview-format-1');
const appInterviewQs = document.getElementById('interview-questions-1');
const appCompany = document.getElementById('company-name');

const curApp = db.getAppByID(appQuery);
console.log(appQuery);
appCompany.value = appQuery;
appPosition.value = curApp.position;
appLocation.value = "add location. . .";
appContacts.value = "add contacts . . .";
appDescription.value = "add description . . . ";

      // go to application page
      // load application info into page elements

  
//   // save resume and cover letter in indexed db 
//   const resumeElement = document.getElementById("resume");
//   resumeElement.addEventListener("change", () => {
//     const path = resumeElement.value;
//     db.addApp("resume", path);
//     console.log("saved");
//   });
  
//   // Add event listeners for search bar
  // const searchBarElement = document.getElementById("search-bar");
  // searchBarElement.addEventListener('onkeyup', () => {
  
  // });