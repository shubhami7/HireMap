// Set up IndexedDB class for client-side data storage
export class Database {
    constructor(name) {
        this.name;
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
            const req = indexedDB.open(this.name, 1);

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
    // Create method to get one application
    // Create method to delete application by its name/id
    // Create method to update an application by its id

}
