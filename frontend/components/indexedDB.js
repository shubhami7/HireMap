// Set up IndexedDB class for client-side data storage
export class Database {
    constructor(name) {
        this.name = name;
    }

    // Create method for opening the db
    async openDB() {
        // return a promise that resolves with the db or rejects
        return new Promise((res, rej) => {

            // reject if database doesn't have a name
            if (this.name === '') {
                rej('Database needs a name.');
                return;
            }

            // attempt to open database using indexedDB
            const req = window.indexedDB.open(this.name, 1);

            // upgrade db if needed
            req.onupgradeneeded = (event) => {
                let db = event.target.result;
                if(!db.objectStoreNames.contains('applications')) {
                    db.createObjectStore('applications', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }
                // TODO: create more object stores if needed
            };

            // resolve with database when successfully opened
            req.onsuccess = (event) => {
                console.log("Database successfully opened.");
                res(event.target.result);
            };

            // reject with error message if db cannot be opened
            req.onerror = (event) => {
                console.log(`Could not open database: ${event.target.error.message}`);
                rej(event.target.error);
            };
        });
    } 

    // Create method for adding an application
    async addApp(app) {

        // Open the db, create a transaction on the objectStore
        const db = await this.openDB();
        const tx = db.transaction('applications', 'readwrite');
        const store = tx.objectStore('applications');
        // add the new application to the object store
        store.add(app);

        // return a promise that resolves when transaction is successful and rejects with msg
        return new Promise((res, rej) => {
            tx.oncomplete = () => {
                res('Application added successfully!');
            };
            tx.onerror = (err) => {
                rej(`Failed to add application: ${err.message}`);
            };
        });
    }

    // Create method to get all applications
    async getApps() {

        // Open the db, create a transaction on the object store
        const db = await this.openDB();
        const tx = db.transaction('applications', 'readonly');
        const store = tx.objectStore('applications');
        // retrieve all of the applications
        const req = store.getAll();
    
        // return a promise that resolves with all of the applications or rejects with msg
        return new Promise((res, rej) => {
          req.onsuccess = () => {
            res(req.result);
          };
          req.onerror = (error) => {
            rej(`Failure to get all tasks: ${error.message}`);
          };
        });
    }

    // Create method to get one application by id
    async getAppByID(app) {

        // Open the db, create a transaction on the object store
        const db = await this.openDB();
        const tx = db.transaction('applications', 'readonly');
        const store = tx.objectStore('applications');
        // retrieve the application using id parameter
        const req = store.get(app);

        // return a promise that resolves with the desired applications or rejects with msg
        return new Promise((res, rej) => {
            req.onsuccess = () => {
              res(req.result);
            };
            req.onerror = (error) => {
              rej(`Failure to get desired task: ${error.message}`);
            };
        });
    }

    // Create method to delete application by its name/id
    async deleteApp(app) {

        const appIDNum = Number(appId);

        if (isNaN(appIDNum)) {
            return Promise.reject('Invalid application ID');
        }

        // Open the db, create a transaction on the object store
        const db = await this.openDB();
        const tx = db.transaction('applications', 'readwrite');
        const store = tx.objectStore('applications');
        // retrieve the application using id parameter
        const req = store.delete(app);

        // return a promise that returns a status message
        return new Promise((res, rej) => {
            req.onsuccess = () => {
              res("Application deleted successfully!");
            };
            req.onerror = (error) => {
              if (error.name === "NotFoundError") {
                res("Application does not exist.");
              }
              rej(`Error while deleting: ${error.message}`);
            };
          });
    }

    // TODO:
    // Create method to update an application by its id
async updateApp(id, updatedData) {
    const db = await this.openDB();
    const tx = db.transaction('applications', 'readwrite');
    const store = tx.objectStore('applications');
    const existingApp = await new Promise((res, rej) => {
        const req = store.get(id);
        req.onsuccess = () => res(req.result);
        req.onerror = (error) => rej(`Failed to retrieve application: ${error.message}`);
    });

    if (!existingApp) {
        throw new Error(`Application with id ${id} not found.`);
    }
    const updatedApp = { ...existingApp, ...updatedData };
    store.put(updatedApp, id);
    return new Promise((res, rej) => {
        tx.oncomplete = () => res('Application updated successfully!');
        tx.onerror = (error) => rej(`Failed to update application: ${error.message}`);
    });
}

/**
 * Example Usage of the `updateApp` Method in the `Database` Class
 *
 * 1. Create a Database instance for managing job applications.
 *    - The database is initialized with the name 'JobApplications'.
 *    - If the database does not exist, it will be created.
 * 
 * 2. Define the updated data for an existing application.
 *    - The data to be updated includes:
 *      a) Job Position: Updated to 'Senior Software Engineer'.
 *      b) Application Status: Updated to 'Interviewing', indicating progress in the hiring process.
 *      c) Interview Date: Updated to '2024-11-20', representing the scheduled date for the interview.
 * 
 * 3. Call the `updateApp` method to update an application.
 *    - Parameters:
 *      a) `id` ('12345'): The unique identifier for the application to update.
 *      b) `updatedData`: The object containing the fields to update.
 * 
 * 4. Handle the Promise returned by the `updateApp` method.
 *    - If the operation is successful, log a success message to the console.
 *    - If an error occurs, log the error message to the console.
 */
}
