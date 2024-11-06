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
                    db.createObjectStore('applications', {keypath: 'id'});
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

    // TODO: 
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

        // Open the db, create a transaction on the object store
        const db = await this.openDB();
        const tx = db.transaction('applications', 'readonly');
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
              rej(`Error while deleting: ${error}`);
            };
          });
    }
    
    // Create method to update an application by its id

}
