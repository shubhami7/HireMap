// Import Database class
import {Database} from '../components/indexedDB.js';

// // Create and open a database for applications called appDB
const db = new Database("appDB");
await db.openDB();

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

// add event listeners to the trash can
const trashCan = document.getElementById("trash-can");
if (trashCan) {
    trashCan.addEventListener("dragover", dragOverTrash);
    trashCan.addEventListener("dragenter", dragEnterTrash);
    trashCan.addEventListener("dragleave", dragLeaveTrash);
    trashCan.addEventListener("drop", dragDropTrash);
}



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


function dragOverTrash(e) {
  e.preventDefault(); // Allows the drop
}

function dragEnterTrash(e) {
  trashCan.classList.add("drag-over-trash");
}

function dragLeaveTrash(e) {
  trashCan.classList.remove("drag-over-trash");
}

// drag and drop for trash
async function dragDropTrash(e) {
  e.preventDefault();
  trashCan.classList.remove("drag-over-trash");

  const appID = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(appID);

  // remove from DOM
  if (draggable) {
    draggable.remove();
  }

  // remove from IndexedDB
  try {
    await db.deleteApp(appID);
    alert('Application deleted successfully!');
} catch (error) {
    console.error('Error deleting application:', error);
}
}
// add job

const modal = document.getElementById("add-popup");
const btn = document.getElementById("add-button");

const span = document.getElementsByClassName("close")[0];
const submitBtn = document.getElementById("submit");

// when the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.style.display = "block";
}) 

// when the user clicks on (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = "none";
})


// when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let appQuery;
// add application to indexedDB when submit button is clicked
submitBtn.addEventListener('click', async () => {

  const companyName = document.getElementById("companyName").value;
  const position = document.getElementById("position").value;
  const status = document.getElementById("status").value;

  const applicationData = {
    id: new Date().getTime(),
    companyName: companyName,
    position: position,
    status: status,
    dateApplied: document.getElementById("dateApplied").value,
    deadline: document.getElementById("deadline").value
  };

  console.log('application data: ', applicationData);

  try {
    // save the application to IndexedDB using the addApp method
    
    db.addApp(applicationData);
  
    // create a new application box
    const applicationBox = document.createElement("div");
    applicationBox.className = "application-box";
    applicationBox.id = applicationData.id;
    applicationBox.draggable = true; 
    applicationBox.innerHTML = companyName + "<br>• " + position;

    applicationBox.addEventListener("dragstart", dragStart);
    applicationBox.addEventListener("dragend", dragEnd);

    const statusColumn = document.getElementById(status);
    if (statusColumn) {
      statusColumn.appendChild(applicationBox);
    }

    appQuery = companyName;
    applicationBox.addEventListener('dblclick', () => {
      window.location.href='applicationInfo.html';
    });

    // clear form fields and close the modal
    document.getElementById("companyName").value = "";
    document.getElementById("position").value = "";
    document.getElementById("dateApplied").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("status").value = "interested"; 
    modal.style.display = "none";

  }

  catch (error) {
    console.log('Error adding new application.', error);
  }

});


// add pop-up for new reminder
const reminder = document.getElementById('reminder-popup');
const remindButton = document.getElementById('new-reminder-button');
const remindSpan = document.getElementsByClassName('close-reminder')[0];
const remindSubmit = document.getElementById('reminder-submit');

// when the user clicks on the button, open the modal
remindButton.addEventListener('click', () => {
  reminder.style.display = "flex";
}); 

// when the user clicks on (x), close the modal
remindSpan.addEventListener('click', () => {
  reminder.style.display = "none";
});


// when the user clicks outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == reminder) {
    reminder.style.display = "none";
  }
});


// add code later to save submitted information
remindSubmit.addEventListener('click', () => {
  reminder.style.display = "none";
});

export {appQuery};


  // const appBoxElement = document.getElementById('amazon');
  // console.log(appBoxElement);
  // appBoxElement.addEventListener("dblclick", () => {
  //     // go to application page
  //     // load application info into page elements
  //     window.location.href='application.html';
  //     const curApp = db.getAppByID(appBoxElement.id);
  //     appCompany.value = curApp.innerText;
  // });

  // let name = '';

  // boxes.forEach(box => {
  //   name = box.innerText;
  //   console.log(name);
  //   box.addEventListener("ondblclick", () => {
  //     window.location.href='application.html';
  //     window.onload = () => {
        
  //     }
  //   });
  // });
