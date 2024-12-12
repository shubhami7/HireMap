// Add logout functionality
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Remove user token and redirect to login page
      sessionStorage.removeItem('userToken');
      window.location.href = 'login.html';
    });
  }
});

// Add event listeners to each application box
const boxes = document.querySelectorAll(".application-box");
const columns = document.querySelectorAll(".status-column");

boxes.forEach((box) => {
  box.addEventListener("dragstart", dragStart);
  box.addEventListener("dragend", dragEnd);
});

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", dragDrop);
});

// Add event listeners to the trash can
const trashCan = document.getElementById("trash-can");
if (trashCan) {
  trashCan.addEventListener("dragover", dragOverTrash);
  trashCan.addEventListener("dragenter", dragEnterTrash);
  trashCan.addEventListener("dragleave", dragLeaveTrash);
  trashCan.addEventListener("drop", dragDropTrash);
}

// Drag and Drop Logic
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
  const column = e.target.closest(".status-column");
  if (column) {
    column.classList.add("drag-over");
  }
}

function dragLeave(e) {
  const column = e.target.closest(".status-column");
  if (column) {
    column.classList.remove("drag-over");
  }
}

async function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  const column = e.target.closest(".status-column");
  if (column) {
    column.appendChild(draggable);
    column.classList.remove("drag-over");

    const newStatus = column.id;

    try {
      const response = await fetch(`http://localhost:3021/application/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      console.log(`Application ${id} updated to status: ${newStatus}`);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }
}

function dragOverTrash(e) {
  e.preventDefault();
}

function dragEnterTrash(e) {
  trashCan.classList.add("drag-over-trash");
}

function dragLeaveTrash(e) {
  trashCan.classList.remove("drag-over-trash");
}

async function dragDropTrash(e) {
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  try {
    const response = await fetch(`http://localhost:3021/applications/soft-delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDeleted: true, dateDeleted: new Date() }),
    });

    if (response.ok) {
      if (draggable) {
        draggable.remove();
      }
      alert("Application soft-deleted successfully!");
    } else {
      const result = await response.json();
      alert(result.message || "Error soft-deleting application.");
    }
  } catch (error) {
    console.error("Error soft-deleting application:", error);
  }
}

// Add Job Functionality
const modal = document.getElementById("add-popup");
const btn = document.getElementById("add-button");
const span = document.getElementsByClassName("close")[0];
const submitBtn = document.getElementById("submit");

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

submitBtn.addEventListener("click", async () => {
  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const location = document.getElementById("jobLocation").value;
  const contacts = document.getElementById("jobContacts").value;
  const status = document.getElementById("status").value;

  const applicationData = {
    companyName: companyName,
    position: position,
    location: location,
    contacts: contacts,
    status: status,
    dateApplied: document.getElementById("dateApplied").value,
    deadline: document.getElementById("deadline").value,
    previousStatus: null,
    dateDeleted: null,
    hasStar: null,
  };

  try {
    console.log("data to backend ", JSON.stringify(applicationData));

    const response = await fetch("http://localhost:3021/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    const newApplication = await response.json();
    renderApplication(newApplication);

    document.getElementById("companyName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("jobLocation").value = "";
    document.getElementById("jobContacts").value = "";
    document.getElementById("jobDescription").value = "";
    document.getElementById("dateApplied").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("status").value = "interested";
    modal.style.display = "none";
  } catch (error) {
    console.log("Error adding new application!", error);
  }
});

function renderApplication(application) {
  const applicationBox = document.createElement("div");
  applicationBox.className = "application-box";
  applicationBox.id = application.id;
  applicationBox.draggable = true;

  applicationBox.dataset.dateApplied = application.dateApplied || "";
  applicationBox.dataset.companyName = application.companyName.toLowerCase() || "";

  applicationBox.innerHTML = `
    <span class="star-icon" title="Mark as priority">☆</span>
    ${application.companyName}<br><br>• ${application.position}<br>• ${application.location}
  `;

  const starIcon = applicationBox.querySelector(".star-icon");
  starIcon.addEventListener("click", () => {
    const statusColumn = applicationBox.closest(".status-column");
    if (statusColumn) {
      const isStarred = starIcon.textContent === "★";
      starIcon.textContent = isStarred ? "☆" : "★";
      applicationBox.classList.toggle("priority", !isStarred);

      const boxes = Array.from(statusColumn.querySelectorAll(".application-box"));
      const priorityBoxes = boxes.filter(box => box.querySelector(".star-icon").textContent === "★");
      const nonPriorityBoxes = boxes.filter(box => box.querySelector(".star-icon").textContent === "☆");

      boxes.forEach((box) => statusColumn.removeChild(box));

      priorityBoxes.forEach((box) => statusColumn.appendChild(box));
      nonPriorityBoxes.forEach((box) => statusColumn.appendChild(box));
    }
  });

  applicationBox.addEventListener("dragstart", dragStart);
  applicationBox.addEventListener("dragend", dragEnd);

  const statusColumn = document.getElementById(application.status);
  const deleteStatus = application.isDeleted;
  if (statusColumn && (deleteStatus !== true)) {
    statusColumn.appendChild(applicationBox);
  }

  applicationBox.addEventListener("dblclick", () => {
    window.location.href = `applicationInfo.html?id=${application.id}`;
  });
}

// Reminder Modal
const reminder = document.getElementById("reminder-popup");
const remindButton = document.getElementById("new-reminder-button");
const remindSpan = document.getElementsByClassName("close-reminder")[0];
const remindSubmit = document.getElementById("reminder-submit");

remindButton.addEventListener("click", () => {
  reminder.style.display = "flex";
});

remindSpan.addEventListener("click", () => {
  reminder.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == reminder) {
    reminder.style.display = "none";
  }
});

function reminderDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-reminder");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const reminderToDelete = e.target.closest(".reminder-container");
      const reminderId = reminderToDelete.dataset.id;

      if (reminderToDelete) {
        try {
          const response = await fetch(`http://localhost:3021/reminder/${reminderId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete reminder");
          }

          reminderToDelete.remove();
        } catch (error) {
          console.log("Error deleting reminder!", error);
        }
      }
    });
  });
}

reminderDeleteListeners();

const reminderSort = [];

remindSubmit.addEventListener("click", async () => {
  const reminderText = document.getElementById("reminder-des").value;
  const reminderDate = document.getElementById("remind-date").value;

  const reminderData = {
    description: reminderText,
    date: reminderDate,
  };

  try {
    console.log("data to backend ", JSON.stringify(reminderData));

    const response = await fetch("http://localhost:3021/reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create reminder");
    }

    const newReminder = await response.json();
    sortAndRender(newReminder);

    document.getElementById("reminder-des").value = "";
    document.getElementById("remind-date").value = "";

    reminder.style.display = "none";
  } catch (error) {
    console.log("Error adding new reminder!", error);
  }
});

// render reminders after reload
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const reminderResponse = await fetch("http://localhost:3021/reminder");
    const applicationResponse = await fetch("http://localhost:3021/application");

    if (!reminderResponse.ok) {
      throw new Error("Failed to load reminders");
    }
    if (!applicationResponse.ok) {
      throw new Error("Failed to load applications");
    }

    const reminders = await reminderResponse.json();
    reminders.forEach(sortAndRender);

    const applications = await applicationResponse.json();
    applications.forEach(renderApplication);
  } catch (error) {
    console.log("Error fetching reminders!", error);
  }
});

function sortAndRender(reminder) {
  reminderSort.push(reminder);
  reminderSort.sort((a, b) => new Date(a.date) - new Date(b.date));

  const currReminders = document.getElementById("add-reminder");
  if (!currReminders) {
    console.error('No element with id "add-reminder" found');
    return;
  }
  currReminders.innerHTML = "";

  reminderSort.forEach((sortedReminder) => {
    const reminderElement = renderReminder(sortedReminder);
    currReminders.appendChild(reminderElement);
  });

  reminderDeleteListeners();
}

function renderReminder(reminder) {
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

  const reminderDateObj = new Date(reminder.date);
  const reminderToDate = reminderDateObj.toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
  reminderDateP.textContent = `Deadline: ${reminderToDate}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (reminderDateObj < today) {
    reminderDateP.style.color = "red";
  }

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-reminder";
  deleteButton.textContent = "🗑 Delete";

  reminderTextDiv.appendChild(reminderName);
  reminderTextDiv.appendChild(reminderDateP);
  reminderTextDiv.appendChild(deleteButton);

  reminderRow.appendChild(reminderTextDiv);

  reminderContainer.appendChild(reminderRow);

  return reminderContainer;
}

// Dropdown event listener for sorting
const sortDropdown = document.getElementById("sort-options");

sortDropdown.addEventListener("change", () => {
  const sortOption = sortDropdown.value;

  const statusColumns = document.querySelectorAll(".status-column");

  statusColumns.forEach((column) => {
    const applications = Array.from(column.querySelectorAll(".application-box"));

    applications.sort((a, b) => {
      if (sortOption === "company") {
        return a.dataset.companyName.localeCompare(b.dataset.companyName);
      } else if (sortOption === "date") {
        return new Date(a.dataset.dateApplied) - new Date(b.dataset.dateApplied);
      }
      return 0;
    });

    applications.forEach((app) => column.removeChild(app));
    applications.forEach((app) => column.appendChild(app));
  });
});

// Popup
const popup = document.getElementById("popup-container");
const overlay = document.getElementById("popup-overlay");
const closeBtn = document.getElementById("popup-close");
const doNotShowCheckbox = document.getElementById("do-not-show");
const greetingElement = document.getElementById("popup-greeting");

document.addEventListener("DOMContentLoaded", () => {
  showPopup();
});

async function showPopup() {
  const doNotShowToday = localStorage.getItem("doNotShowToday");

  if (!doNotShowToday || new Date().toDateString() !== doNotShowToday) {
    try {
      const currentHour = new Date().getHours();
      let greeting;
      if (currentHour < 12) {
        greeting = "Good Morning!";
      } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
      } else {
        greeting = "Good Evening!";
      }
      greetingElement.textContent = greeting;

      const response = await fetch("http://localhost:3021/reminder");
      if (!response.ok) {
        throw new Error("Failed to fetch reminders.");
      }

      const reminders = await response.json();
      reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
      const latestReminders = reminders.slice(0, 3);

      const reminderList = document.getElementById("reminder-list");
      reminderList.innerHTML = "";
      latestReminders.forEach((reminder) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          ${reminder.description} - ${new Date(reminder.date).toLocaleDateString("en-US", {timeZone: "UTC"})} 
        `;
        reminderList.appendChild(listItem);
      });

      popup.style.display = "block";
      overlay.style.display = "block";

      document.getElementById("popup-close").addEventListener("click", closePopup);
      document.getElementById("do-not-show").addEventListener("change", (e) => {
        if (e.target.checked) {
          localStorage.setItem("doNotShowToday", new Date().toDateString());
        }
      });
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  }
}

function closePopup() {
  popup.style.display = "none";
  overlay.style.display = "none";

  if (doNotShowCheckbox.checked) {
    localStorage.setItem("doNotShowToday", new Date().toDateString());
  }
}

overlay.addEventListener("click", closePopup);
document.addEventListener("DOMContentLoaded", showPopup);
