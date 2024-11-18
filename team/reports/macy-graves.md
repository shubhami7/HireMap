## Contribution Log for Macy Graves

### October 21, 2024
**Task1**: Reviewed and edited the `ui-diagrams` file.
- **Details**: Ensured the descriptions of the diagrams were complete and formatted nicely.
- **Link to Commit**: [Commit on UI-Diagrams Review](https://github.com/edwintran235/326-team9/commit/b95ac80dfd5ffd18785e55e27574ab46ca96c838)

**Task2**: Complete Use Cases in the `ui-diagrams` file.
- **Details**: Created use cases for each ui-diagram.
- **Link to Commit**: [Commit on UI-Diagrams Review](https://github.com/edwintran235/326-team9/commit/b53a0bb0509b3f44edfe744892784dfcc50b9073)

### October 30, 2024
**Task1**: Created branch for Application Information Page and a `applicationInfo.html` file.
- **Details**: Created a branch with a barebones html file that will represent the page that users are directed to when clicking on a certain application on the homepage.
- **Link to Commit**: [Commit on Application Information Page](https://github.com/edwintran235/326-team9/commit/5df899a0e5e5b96438a3a068c00f9f82d9304a43)

**Task2**: Created basic structure, layout and styling for `applicationInfo.html`.
- **Details**: Added the header, navigation bar, and notifications column. Created and formatted a column for all of the application info.
- **Link to Commit**: [Commit on Application Information Page](https://github.com/edwintran235/326-team9/commit/1dd42c28ad914e9bd3bb149ab3bdeee94f65446d)

**Task3**: Met with the team to go over frontend implementation.
- **Details**: Volunteered to implement IndexedDB for Sunday.

### October 31, 2024
**Task1**: Created a branch and started working on the application information form feature.
- **Details**: Created inputs and labels for all of the information that will be displayed on the `applicationInfo.html` page. This includes the file upload for the resume and cover letter.
- **Link to Commit**: [Commit on Application Information Page](https://github.com/edwintran235/326-team9/commit/bd82399eb5e8f5d7d30ed653135cc5042b0d24c4)

## November 6, 2024
**Task1**: Created a branch and started setting up a class for IndexedDB.
- **Details**: Created a class such that it can be imported to open a new database, add data to the database, get data from the database, and delete data from the database. All of this work is on a file called `indexedDB.js`.
- **Link to Commit**: [Commit on IndexedDB Class](https://github.com/edwintran235/326-team9/commit/5c08af53d5fc34a72f6f21a19eb5fdb67b2b12ea)

**Task2**: Created a method for getting all applications, getting one, and deleting one.
- **Details**: Within the indexedDB class, after the db is opened successfully, the user can call three methods on the database. Each of these represent the proper CRUD operations that we will need when working with our data. We can store an application, get an application or all applications, and delete an application. These functions are asynchronous with the proper error handling.
- **Link to Commit**: [Commit on addApp()](https://github.com/edwintran235/326-team9/commit/5c08af53d5fc34a72f6f21a19eb5fdb67b2b12ea)
- **Link to Commit**: [Commit on getAppById()](https://github.com/edwintran235/326-team9/commit/7d73bbb53605d49bad0e10f056a6f6bed4cb27d6)
- **Link to Commit**: [Commit on getAll()](https://github.com/edwintran235/326-team9/commit/70e5d276aed90e906d8914f0ef95f99def5e4e62)
- **Link to Commit**: [Commit on deleteApp()](https://github.com/edwintran235/326-team9/commit/0ff7ed57be262d145672ce7b81da133237b5c5de)

## November 17, 2024
