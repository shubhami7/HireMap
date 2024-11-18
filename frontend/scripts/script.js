// Import Database class
import {Database} from '../components/indexedDB.js';

// // Create and open a database for applications called appDB
const db = new Database("appDB");
const appDB = await db.openDB();

// Add event listeners to each application box
const boxes = document.querySelectorAll(".application-box");
const columns = document.querySelectorAll(".status-column");

boxes.forEach(box => {
  box.addEventListener("dragstart", dragStart);
  box.addEventListener("dragend", dragEnd);
});

columns.forEach(column => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", dragDrop);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
}

function dragEnd(e) {
  e.target.style.display = "block";
}

function dragOver(e) {
  e.preventDefault(); // Allows the drop
}

function dragEnter(e) {
  e.preventDefault();
  const column = e.target.closest('.status-column');
  if (column) {
    column.classList.add("drag-over"); // Add a visual highlight to the column
  }
}

function dragLeave(e) {
  const column = e.target.closest('.status-column');
  if (column) {
    column.classList.remove("drag-over"); // Remove the highlight
  }
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);
  const column = e.target.closest('.status-column');
  if (column) {
    column.appendChild(draggable); // Append the dragged element to the new column
    column.classList.remove("drag-over"); // Remove the highlight
  }
}

// add job

// Get the modal
var modal = document.getElementById("add-popup");

// Get the button that opens the modal
var btn = document.getElementById("add-button");

// Get the <span> and 'submit' element that closes the modal
var span = document.getElementsByClassName("close")[0];
var submitBtn = document.getElementById("submit");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle submit button click to add application box
submitBtn.onclick = function() {
  
  // Get input values
  var companyName = document.getElementById("companyName").value;
  var position = document.getElementById("position").value;
  var status = document.getElementById("status").value;

  // create a new application box
  var applicationBox = document.createElement("div");
  applicationBox.className = "application-box";
  applicationBox.draggable = true; // enable drag-and-drop
  applicationBox.innerHTML = "Company: " + companyName + "<br><br>Position: " + position;

  // append the new box to the specified status column
  var statusColumn = document.getElementById(status);
  if (statusColumn) {
    statusColumn.appendChild(applicationBox);
  }

  // Clear form fields and close modal
  document.getElementById("companyName").value = "";
  document.getElementById("position").value = "";
  document.getElementById("dateApplied").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("status").value = "interested"; // Reset to default status
  modal.style.display = "none";
}

// still need to add code to make store when the page is refreshed -> local storage



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
// const appBoxElement = document.getElementById('application-box');
appBoxElement.addEventListener("dblclick", () => {
    // go to application page
    // load application info into page elements
});

// Add event listeners for search bar
// const searchBarElement = document.getElementById("search-bar");
// searchBarElement.addEventListener('onkeyup', () => {

// });
