This feature is the 'add' button feature to add a new application. When this button is clicked, the user will be prompted with a pop-up box where they can input the following: company name, postion, date applied, application deadline, status. 
When the user submits the information, it will be stored using indexedDB and will create a new application box in the designated status column. 


click add button --> pop-up
input text in pop-up --> save to indexedDB
click submit --> job appears in status column
job in status column --> drag to new column as application progresses
drag job --> update status column

graph TD
    A[Click Add Button] --> B[Pop-up Opens]
    B --> C[Input Text in Pop-up]
    C --> D[Save to IndexedDB]
    D --> E[Click Submit]
    E --> F[Job Appears in Status Column]
    F --> G[Job in Status Column]
    G --> H[Drag Job to New Column as Application Progresses]
    H --> I[Update Status Column]