// Function to handle form submission
function submitTip() {
    const id = 1;
    const author = document.getElementById("person-name").value;
    const company = document.getElementById("company-name").value;
    const interviewStage = document.getElementById("category").value;
    const info = document.getElementById("tip-content").value;

    if (!author || !company || !info) {
        alert("Please fill out all fields!");
        return;
    }

    // Create a new tip container
    const newTip = document.createElement("div");
    newTip.classList.add("tip");
    newTip.innerHTML = `
        <p><strong>${author}</strong> from <em>${company}</em></p>
        <p>${info}</p>
    `;

    // Append the new tip to the corresponding categorys
    const categoryContainer = document.getElementById(interviewStage);

    // Create a new row if none exist or the last row is full
    let lastRow = categoryContainer.lastElementChild;
    if (!lastRow || lastRow.children.length >= 3) {
        lastRow = document.createElement("div");
        lastRow.classList.add("tips-row");
        categoryContainer.appendChild(lastRow);
    }

    // Add the tip to the last row
    lastRow.appendChild(newTip);

    // Reset the form and close the modal
    closeTipForm();
    //document.getElementById("tip-form-modal").reset();

    // Send the tip data to the server
    fetch('http://localhost:3021/tip', {
        method: 'POST',
        headers: {
            'Content-Type': 'tips/json'
        },
        body: JSON.stringify({
            id,
            author,
            company,
            info,
            interviewStage
        })
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorResponse = await response.json().catch(() => null);
                throw new Error(errorResponse?.error || 'Unknown error occurred');
            }
            return response.json(); // Parse JSON if response is OK
        })
        .then(data => {
            alert('Tip created successfully!');
            console.log(data);
        })
        .catch(error => {
            console.error('Error submitting tip:', error);
            alert('Error submitting tip: ' + error.message);
        });
}

// Function to open the form modal
function openTipForm() {
    document.getElementById("tip-form-modal").classList.remove("hidden");
}

// Function to close the form modal
function closeTipForm() {
    document.getElementById("tip-form-modal").classList.add("hidden");
    document.getElementById("person-name").value = "";
    document.getElementById("company-name").value = "";
    document.getElementById("tip-content").value = "";
    document.getElementById("category").value = "general-tips";
}

function findAll() {
    fetch('http://localhost:3021/tip')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(tips => {
            if (!Array.isArray(tips)) {
                throw new Error('Invalid response format: Expected an array of tips.');
            }
            tips.forEach(tip => {
                const categoryContainer = document.getElementById(tip.interviewStage);

                // Create a new tip container
                const newTip = document.createElement("div");
                newTip.classList.add("tip");
                newTip.innerHTML = `
                    <p><strong>${tip.author}</strong> from <em>${tip.company}</em></p>
                    <p>${tip.info}</p>
                `;

                // Create a new row if none exist or the last row is full
                let lastRow = categoryContainer.lastElementChild;
                if (!lastRow || lastRow.children.length >= 3) {
                    lastRow = document.createElement("div");
                    lastRow.classList.add("tips-row");
                    categoryContainer.appendChild(lastRow);
                }

                // Add the tip to the last row
                lastRow.appendChild(newTip);
            });
        })
        .catch(error => {
            console.error('Error loading tips:', error);
            alert('Could not load tips: ' + error.message);
        });
}

// Call loadTips on page load
document.addEventListener('DOMContentLoaded', findAll);

