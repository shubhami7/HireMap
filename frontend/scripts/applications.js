
async function fetchAppData(applicationId) {

  try {

    const response = await fetch(`http://localhost:3021/application/application/${applicationId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch application details. Status: ${response.status}`);
    }

    const applicationData = await response.json();
    console.log("fetched data: ", applicationData);

    appDetails(applicationData);

    // Fetch reminders
    const reminderResponse = await fetch('http://localhost:3021/reminder');
    if (!reminderResponse.ok) {
      throw new Error("Failed to fetch reminders");
    }
    const reminders = await reminderResponse.json();
    console.log("Fetched reminders: ", reminders);

    // Render the reminders
    reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
    reminders.forEach(renderReminderWithoutDelete);


  } catch (error) {
    console.error("Error fetching application:", error);
  }

}

function appDetails(data) {

  console.log(data);

  document.getElementById("company-name").textContent = data.companyName;
  document.getElementById("jobPos").value = data.position;
  document.getElementById("jobLoc").value = data.location;
  document.getElementById("jobCon").value = data.contacts;
  document.getElementById("jobDesc").value = data.description;
  document.getElementById("applied").value = data.dateApplied;
}

function getApplicationIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id'); 
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the application ID from the URL
  const applicationId = getApplicationIdFromURL();
  console.log('Fetched Application ID:', applicationId);


  if (applicationId) {
      // Fetch and display the application data
      fetchAppData(applicationId);
  } else {
      alert("Application ID not found in the URL.");
  }
});

function renderReminderWithoutDelete(reminder) {
  const reminderContainer = document.createElement("div");
  reminderContainer.className = "reminder-container";
  reminderContainer.dataset.id = reminder.id;

  const reminderRow = document.createElement("div");
  reminderRow.className = "reminder-row";

  const reminderTextDiv = document.createElement("div");
  reminderTextDiv.className = "reminder-text";

  const reminderName = document.createElement("p");
  reminderName.className = "reminder-name";
  reminderName.textContent = reminder.description;

  const reminderDateP = document.createElement("p");
  reminderDateP.className = "reminder-date";

  const reminderDate = new Date(reminder.date);
  const reminderToDate = reminderDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
  reminderDateP.textContent = `Deadline: ${reminderToDate}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (reminderDate < today) {
    reminderDateP.style.color = 'red';
  }

  reminderTextDiv.appendChild(reminderName);
  reminderTextDiv.appendChild(reminderDateP);

  reminderRow.appendChild(reminderTextDiv);
  reminderContainer.appendChild(reminderRow);

  const currReminders = document.getElementById("add-reminder");
  currReminders.appendChild(reminderContainer);

}









// import { Database } from "../components/indexedDB.js";
// import { appQuery } from "./script.js";


// // Log that the script is loaded
// console.log("loading...");

// // Get elements from the application info DOM
// const appPosition = document.getElementById("pos");
// const appLocation = document.getElementById("loc");
// const appContacts = document.getElementById("contacts");
// const appDescription = document.getElementById("description");
// const appDateApplied = document.getElementById("dateApplied");
// const appResume = document.getElementById("resume");
// const appCoverLetter = document.getElementById("coverLetter");
// const appInterviewDate = document.getElementById("interview-date");
// const appInterviewType = document.getElementById("interview-format-1");
// const appInterviewQs = document.getElementById("interview-questions-1");
// const appCompany = document.getElementById("company-name");

// // Fetch the application data from IndexedDB based on appQuery (e.g., company name or ID)
// const curApp = await db.getAppByID(appQuery);

// if (curApp) {
//   console.log("Application data loaded:", curApp);
//   // Populate form fields with application data
//   appCompany.value = curApp.companyName || "Unknown Company";
//   appPosition.value = curApp.position || "Position not specified";
//   appLocation.value = curApp.location || "Add location...";
//   appContacts.value = curApp.contacts || "Add contacts...";
//   appDescription.value = curApp.description || "Add description...";
//   appDateApplied.value = curApp.dateApplied || "";
//   appResume.value = curApp.resume || "";
//   appCoverLetter.value = curApp.coverLetter || "";
//   appInterviewDate.value = curApp.interviewDate || "";
//   appInterviewType.value = curApp.interviewType || "";
//   appInterviewQs.value = curApp.interviewQuestions || "";
// } else {
//   console.log("No application data found for:", appQuery);
// }

// // Save updated data back to IndexedDB when user modifies the form
// document.getElementById("save-button").addEventListener("click", async () => {
//   const updatedApp = {
//     id: curApp.id, // Ensure we update the existing record
//     companyName: appCompany.value,
//     position: appPosition.value,
//     location: appLocation.value,
//     contacts: appContacts.value,
//     description: appDescription.value,
//     dateApplied: appDateApplied.value,
//     resume: appResume.value,
//     coverLetter: appCoverLetter.value,
//     interviewDate: appInterviewDate.value,
//     interviewType: appInterviewType.value,
//     interviewQuestions: appInterviewQs.value,
//   };

//   try {
//     await db.updateApp(curApp.id, updatedApp);
//     console.log("Application updated successfully in IndexedDB!");
//   } catch (err) {
//     console.error("Error updating application:", err);
//   }
// });

// // Add event listeners for file uploads (resume and cover letter)
// appResume.addEventListener("change", async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = async () => {
//       curApp.resume = reader.result;
//       await db.updateApp(curApp.id, curApp);
//       console.log("Resume updated in IndexedDB!");
//     };
//     reader.readAsDataURL(file);
//   }
// });

// appCoverLetter.addEventListener("change", async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = async () => {
//       curApp.coverLetter = reader.result;
//       await db.updateApp(curApp.id, curApp);
//       console.log("Cover letter updated in IndexedDB!");
//     };
//     reader.readAsDataURL(file);
//   }
// });




