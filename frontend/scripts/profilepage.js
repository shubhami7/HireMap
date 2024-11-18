//Name/description input js
//--------------------------------------------------------------------------------
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

//resume and cover letter upload js
//---------------------------------------------------------------------------------------------------------------------------------------------------

document
  .getElementById("documentsForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const resumeInput = document.getElementById("resumeInput");
    const coverLetterInput = document.getElementById("coverLetterInput");

    const resumeFile = resumeInput.files[0];
    const coverLetterFile = coverLetterInput.files[0];

    if (resumeFile) {
      const reader = new FileReader();
      reader.readAsDataURL(resumeFile);
      reader.onload = function (event) {
        const base64Resume = event.target.result;
        localStorage.setItem("uploadedResume", base64Resume);
        document.getElementById("uploadStatus").textContent =
          "Resume uploaded and saved to localStorage!";
      };
      reader.onerror = function () {
        document.getElementById("uploadStatus").textContent =
          "Error reading the resume file.";
      };
    } else {
      document.getElementById("uploadStatus").textContent =
        "No resume file selected.";
    }

    if (coverLetterFile) {
      const reader = new FileReader();
      reader.readAsDataURL(coverLetterFile);
      reader.onload = function (event) {
        const base64CoverLetter = event.target.result;
        localStorage.setItem("uploadedCoverLetter", base64CoverLetter);
        document.getElementById("uploadStatus").textContent +=
          " Cover Letter uploaded and saved to localStorage!";
      };
      reader.onerror = function () {
        document.getElementById("uploadStatus").textContent +=
          " Error reading the cover letter file.";
      };
    } else {
      document.getElementById("uploadStatus").textContent +=
        " No cover letter file selected.";
    }
  });

// Button to view the stored resume
document.getElementById("viewResume").addEventListener("click", function () {
  const storedResume = localStorage.getItem("uploadedResume");

  if (storedResume) {
    const link = document.createElement("a");
    link.href = storedResume;
    link.download = "Resume"; // Default download name
    link.click();
  } else {
    document.getElementById("uploadStatus").textContent =
      "No resume found in localStorage.";
  }
});

// Button to view the stored cover letter
document
  .getElementById("viewCoverLetter")
  .addEventListener("click", function () {
    const storedCoverLetter = localStorage.getItem("uploadedCoverLetter");

    if (storedCoverLetter) {
      const link = document.createElement("a");
      link.href = storedCoverLetter;
      link.download = "Cover_Letter"; // Default download name
      link.click();
    } else {
      document.getElementById("uploadStatus").textContent =
        "No cover letter found in localStorage.";
    }
  });
