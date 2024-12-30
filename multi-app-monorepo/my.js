const sqlite3 = require('sqlite3');  // Import sqlite3
const { open } = require('sqlite');   // Import open from sqlite package

async function openDatabase() {
    try {
        // Open the database (SQLite will create it if it doesn't exist)
        const db = await open({
            filename: './database.db',      // Path to your SQLite database file
            driver: sqlite3.Database,       // Use sqlite3.Database as the driver
        });

        console.log('Database opened or created successfully');

        // Example: Create a table if it doesn't exist
        await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');

        // Insert some data
        await db.run('INSERT INTO users (name, age) VALUES (?, ?)', ['Alice', 30]);
        await db.run('INSERT INTO users (name, age) VALUES (?, ?)', ['Bob', 25]);

        // Query the data
        const rows = await db.all('SELECT * FROM users');
        console.log(rows);

        // Close the database connection
        await db.close();
    } catch (err) {
        console.error('Error opening or creating the database:', err);
    }
}

openDatabase();
