const openDB = require('./openDB');

const seedDB = async () => {
    const db = await openDB();

    try {
        const createAppsTable = `
            CREATE TABLE IF NOT EXISTS apps
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                type TEXT NOT NULL,
                name TEXT NOT NULL,
                link TEXT NOT NULL,
                priority INTEGER NOT NULL
            );
        `;

        await db.exec(createAppsTable);
    } catch (err) {
        if (err) {
            console.error('There was an error when creating the apps table: \n', err);
        }
    }
};

module.exports = seedDB;
