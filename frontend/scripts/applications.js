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

async function loadDeletedApplications() {
  try {
    console.log("Fetching deleted applications...");
    const response = await fetch('/api/applications/deleted');
    const applications = await response.json();
    console.log("Deleted applications fetched:", applications);

    const deletedColumn = document.getElementById('deleted-column');
    deletedColumn.innerHTML = ''; // Clear existing content

    applications.forEach((app) => {
      const applicationBox = document.createElement('div');
      applicationBox.className = 'application-box';
      applicationBox.id = `app${app.id}`;

      applicationBox.innerHTML = `
        <div class="application-content">
          <h4>${app.name}</h4>
          <p>Status: Deleted</p>
          <button class="restore-btn" onclick="restoreApplication('${app.id}')">Restore</button>
          <button class="delete-btn" onclick="permanentlyDelete('${app.id}')">Delete Permanently</button>
        </div>
      `;

      deletedColumn.appendChild(applicationBox);
    });
  } catch (error) {
    console.error('Error loading deleted applications:', error);
  }
}


