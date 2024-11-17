// Name Form Handling
const nameButton = document.getElementById("namesubmit");
const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const displayName = document.getElementById("displayName");

// Description Form Handling
const descriptionForm = document.getElementById("descriptionForm");
const paragraphInput = document.getElementById("paragraphInput");

// Function to handle name submission and display
function handleNameChange(event) {
  event.preventDefault();
  const enteredName = nameInput.value;
  localStorage.setItem("userName", enteredName); // Store name in localStorage
  displayUserName(); // Update the display immediately
}

// Function to load and display the user's name from localStorage
function displayUserName() {
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    displayName.textContent = storedName;
  }
}

// Function to handle description submission and save
function handleDescriptionChange(event) {
  event.preventDefault();
  const enteredDescription = paragraphInput.value;
  localStorage.setItem("userDescription", enteredDescription);
  displayUserDescription();
}

// Function to load and display the user's description from localStorage
function displayUserDescription() {
  const storedDescription = localStorage.getItem("userDescription");
  if (storedDescription) {
    paragraphInput.value = storedDescription;
  }
}

// Event listeners for form submissions
nameForm.addEventListener("submit", handleNameChange);
descriptionForm.addEventListener("submit", handleDescriptionChange);

// Load stored name and description when the page loads
window.onload = () => {
  displayUserName();
  displayUserDescription();
};
