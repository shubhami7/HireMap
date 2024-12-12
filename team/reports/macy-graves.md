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
- **Task1**: Integrating indexed db with the front end by adding the file to the scripts. This allows me to use it with my features.
- **Link to Commit**: [Commit on Application Info Page for IndexedDB](https://github.com/edwintran235/326-team9/commit/488f3471dd716485acf00b5e1417ea1c1b4d5a09)

- **Task2**: Set up resume and cover letter upload buttons and file manager on application information page.
- **Link to Commit**: [Commit on Application Info Page](https://github.com/edwintran235/326-team9/commit/85b3c268c4ebd1dee098408197ae5b5df486ef7a)

- **Task3**: Create sequence markdown file for my milestone 3 feature.
- **Link to Commit**: [Commit on m3](https://github.com/edwintran235/326-team9/commit/85b3c268c4ebd1dee098408197ae5b5df486ef7a)

- **Task4**: Update my reports.
- **Link to Commit**: [Commit on reports](https://github.com/edwintran235/326-team9/commit/cff56d3dbef79763d5a7896aec845746257017fe)


## November 18, 2024
- **Task1**: Add search bar to the application information and home pages. Add styling.
- **Link to Commit**: [Commit on Application Info and Home Page](https://github.com/edwintran235/326-team9/commit/0a145ba35f725e3e66c5b7b22097d0ecfaf8b561)

- **Task2**: Fix bugs with IndexedDB. Integrate with Application info. 
- **Link to Commit**: [Commit on Application Info Page](https://github.com/edwintran235/326-team9/commit/be9cddbe94834233ed726263114480e6b6e4a1ec)

- **Task3**: Update my feature sequence diagram.
- **Link to Commit**: [Commit on m3](https://github.com/edwintran235/326-team9/commit/5139b45ea3192397f497d795db426a435965c23c)


## November 25, 2024
- **Task1**: Set up backend file structure and create a README.
- **Link to Commit**: [Commit on backend](https://github.com/edwintran235/326-team9/commit/39817f02083eff0be950b3ecf87ffc2b02050cd0)

- **Task2**: Start working with express to create a server that runs locally.
- **Link to Commit**: [Commit on index.js](https://github.com/edwintran235/326-team9/commit/0ddc2a76b0fbf4e87c592cc127f71f072a30537b)

- **Task3**: With all of the necessary imports, set up sequelize and create a new sqlite database.
- **Link to Commit**: [Commit on index.js](https://github.com/edwintran235/326-team9/commit/89d4e5c86a7564ad495969d9b0c4d869e80412f5)


## December 1, 2024
- **Task1**: Get the server running properly to open the database successfully. Update the README with instructions on how to start the server. Add a start script to the package.json.
- **Link to Commit**: [Commit on package.json and README](https://github.com/edwintran235/326-team9/commit/b4d1e7deb70890bbbd5453f0fe4771a3f6a9adaa)


## December 3, 2024
- **Task1**: Change sequelize version to v6 so that it is compatible with SQLite3 and does not have any deprecated features. Create a user model and post it to create a table in the database.
- **Link to Commit**: [Commit on user.js and database.js](https://github.com/edwintran235/326-team9/commit/40aec9d629775ba730e17e340a6ab3be23c5463e)

- **Task2**: Create the Applications Schema and post a table to the database.
- **Link to Commit**: [Commit on user.js and index.js](https://github.com/edwintran235/326-team9/commit/00ac4dd1ef6f82acf9b653d4d36045b3601a5619)


## December 4, 2024
- **Task1**: Create schemas for all entities: users, applications, tips, and interviews.
- **Link to Commit**: [Commit on user.js](https://github.com/edwintran235/326-team9/commit/ccacefd20cf75cb3b53a56c714bfc3e2607f40c2)

- **Task2**: Add basic GET, POST, PUT, DELETE routes for applications and users for my teammates to use in their features.
- **Link to Commit**: [Commit on user.js](https://github.com/edwintran235/326-team9/commit/fde17bb38f2b33e10b1c42cf4b41d207e96cd685)

- **Task3**: Update README with file structure and database information.
- **Link to Commit**: [Commit on README](https://github.com/edwintran235/326-team9/commit/923859c0f6be631cd0f82b35fe9d3b39afa60e0c)


## December 5, 2024
- **Task1**: Merge RESTful API to main.
- **Link to Commit**: [Commit on backend](https://github.com/edwintran235/326-team9/commit/34a5415783acb6337b0c93a63a607605e6b6ed70)
 

## December 9, 2024
- **Task1**: Fix bug in database creation. Add an option to sequelize.sync() such that if new columns are added to tables, the table is updated.
- **Link to Commit**: [Commit on index.js](https://github.com/edwintran235/326-team9/commit/df8e0b507ff10ac1e955bbb2e5264bec6278c585)

## December 11, 2024
- **Task1**: Record the demo video and upload to github and update my reports file.
- **Link to Commit**: [Commit on demo and macy-graves.md](https://github.com/edwintran235/326-team9/commit/d1fc3d87091ffede9a9fc0d8fb703ceac69519c1)