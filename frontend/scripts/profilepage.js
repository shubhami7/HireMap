import { Database } from "../components/indexedDB.js";

// Initialize the IndexedDB
const db = new Database("appDB");
await db.openDB();

// Name Form Handling
const nameButton = document.getElementById("namesubmit");
const nameInput = document.getElementById("nameInput");
const nameForm = document.getElementById("nameForm");
const displayName = document.getElementById("displayName");

// Description Form Handling
const descriptionForm = document.getElementById("descriptionForm");
const paragraphInput = document.getElementById("paragraphInput");

// Function to handle name submission and save it in IndexedDB
async function handleNameChange(event) {
  event.preventDefault();
  const enteredName = nameInput.value;

  // Save name in IndexedDB
  await db.updateApp("profileName", { id: "profileName", name: enteredName });
  displayUserName(); // Update the display immediately
}

// Function to load and display the user's name from IndexedDB
async function displayUserName() {
  const storedNameEntry = await db.getAppByID("profileName");
  if (storedNameEntry && storedNameEntry.name) {
    displayName.textContent = storedNameEntry.name;
  }
}

// Function to handle description submission and save it in IndexedDB
async function handleDescriptionChange(event) {
  event.preventDefault();
  const enteredDescription = paragraphInput.value;

  // Save description in IndexedDB
  await db.updateApp("profileDescription", {
    id: "profileDescription",
    description: enteredDescription,
  });
  displayUserDescription(); // Update the display immediately
}

// Function to load and display the user's description from IndexedDB
async function displayUserDescription() {
  const storedDescriptionEntry = await db.getAppByID("profileDescription");
  if (storedDescriptionEntry && storedDescriptionEntry.description) {
    paragraphInput.value = storedDescriptionEntry.description;
  }
}

// Event listeners for form submissions
nameForm.addEventListener("submit", handleNameChange);
descriptionForm.addEventListener("submit", handleDescriptionChange);

// Load stored name and description when the page loads
window.onload = async () => {
  await displayUserName();
  await displayUserDescription();
};

// Resume and Cover Letter Upload Handling
document
  .getElementById("documentsForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const resumeInput = document.getElementById("resumeInput");
    const coverLetterInput = document.getElementById("coverLetterInput");

    const resumeFile = resumeInput.files[0];
    const coverLetterFile = coverLetterInput.files[0];

    if (resumeFile) {
      const reader = new FileReader();
      reader.readAsDataURL(resumeFile);
      reader.onload = async function (event) {
        const base64Resume = event.target.result;

        // Save resume in IndexedDB
        await db.updateApp("resume", { id: "resume", data: base64Resume });
        document.getElementById("uploadStatus").textContent =
          "Resume uploaded and saved to IndexedDB!";
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
      reader.onload = async function (event) {
        const base64CoverLetter = event.target.result;

        // Save cover letter in IndexedDB
        await db.updateApp("coverLetter", {
          id: "coverLetter",
          data: base64CoverLetter,
        });
        document.getElementById("uploadStatus").textContent +=
          " Cover Letter uploaded and saved to IndexedDB!";
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
document.getElementById("viewResume").addEventListener("click", async function () {
  const storedResume = await db.getAppByID("resume");

  if (storedResume && storedResume.data) {
    const link = document.createElement("a");
    link.href = storedResume.data;
    link.download = "Resume"; // Default download name
    link.click();
  } else {
    document.getElementById("uploadStatus").textContent =
      "No resume found in IndexedDB.";
  }
});

// Button to view the stored cover letter
document
  .getElementById("viewCoverLetter")
  .addEventListener("click", async function () {
    const storedCoverLetter = await db.getAppByID("coverLetter");

    if (storedCoverLetter && storedCoverLetter.data) {
      const link = document.createElement("a");
      link.href = storedCoverLetter.data;
      link.download = "Cover_Letter"; // Default download name
      link.click();
    } else {
      document.getElementById("uploadStatus").textContent =
        "No cover letter found in IndexedDB.";
    }
  });

// Delete application (flag as deleted)
async function deleteApplication(applicationId) {
  try {
    const response = await fetch(`http://localhost:3021/application/${applicationId}/delete`, {
      method: 'PUT', // Using PUT method to flag it as deleted
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_deleted: true }) // Flagging as deleted
    });

    if (response.ok) {
      alert("Application moved to trash!");

      // Optionally, update the DOM by removing the application from the page or triggering a UI update
      const applicationBox = document.getElementById(`app${applicationId}`);
      if (applicationBox) {
        applicationBox.remove(); // Remove the application from the current view
      }

      // Optionally, you could fetch the list of deleted applications to update the "Deleted" section
      loadDeletedApplications(); // This will reload and update the "deleted applications" section
    } else {
      alert("Failed to delete application.");
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    alert("An error occurred while trying to delete the application.");
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  // Fetch all applications
  const response = await fetch("http://localhost:3021/api/applications");
  const applications = await response.json();
  
  const homepageContainer = document.getElementById("application-content");
  homepageContainer.innerHTML = ""; // Clear the container before rendering

  applications.forEach(app => {
      if (!app.is_deleted) {
          const appElement = document.createElement("div");
          appElement.id = app.id;
          appElement.classList.add("application-card");

          appElement.innerHTML = `
              <h3>${app.position}</h3>
              <p>${app.companyName}</p>
              <p>${app.status}</p>
              <button class="delete-btn">Delete</button>
          `;

          homepageContainer.appendChild(appElement);

          const deleteBtn = appElement.querySelector(".delete-btn");
          deleteBtn.addEventListener("click", function() {
              deleteApplication(app.id); // Handle soft delete
          });
      }
  });
  
  // Fetch deleted applications for profile page
  const deletedResponse = await fetch("http://localhost:3021/api/applications/deleted");
  const deletedApplications = await deletedResponse.json();
  
  const profileContainer = document.getElementById("profile-container");
  profileContainer.innerHTML = ""; // Clear the container before rendering

  deletedApplications.forEach(app => {
      const appElement = document.createElement("div");
      appElement.id = app.id;
      appElement.classList.add("application-card");

      appElement.innerHTML = `
          <h3>${app.position}</h3>
          <p>${app.companyName}</p>
          <p>${app.status}</p>
          <button class="delete-btn">Delete</button>
          <button class="restore-btn">Restore</button>
      `;

      profileContainer.appendChild(appElement);

      // Restore functionality
      const restoreBtn = appElement.querySelector(".restore-btn");
      restoreBtn.addEventListener("click", function() {
          restoreApplication(app.id);
      });

      const deleteBtn = appElement.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
          deleteApplication(app.id);
      });
  });
});

// Soft delete an application
async function deleteApplication(appID) {
  try {
      const response = await fetch(`http://localhost:3021/api/applications/soft-delete/${appID}`, {
          method: "PUT",
      });

      if (!response.ok) {
          throw new Error(`Failed to delete application: ${response.statusText}`);
      }

      alert("Application deleted successfully!");
      location.reload(); // Refresh the page to reflect changes
  } catch (error) {
      console.error("Error deleting application:", error);
  }
}

// Restore an application
async function restoreApplication(appID) {
  try {
      const response = await fetch(`http://localhost:3021/api/applications/restore/${appID}`, {
          method: "PUT",
      });

      if (!response.ok) {
          throw new Error(`Failed to restore application: ${response.statusText}`);
      }

      alert("Application restored successfully!");
      location.reload(); // Refresh the page to reflect changes
  } catch (error) {
      console.error("Error restoring application:", error);
  }
}
