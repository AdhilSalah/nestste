const sqlite3 = require('sqlite3');  // Import sqlite3
const { open } = require('sqlite'); // Import open from sqlite package

async function openDatabase() {
    try {
        // Open the database (SQLite will create it if it doesn't exist)
        const db = await open({
            filename: './database.db',      // Path to your SQLite database file
            driver: sqlite3.Database,       // Use sqlite3.Database as the driver
        });

        console.log('Database opened or created successfully');

        // Create the 'users' table if it doesn't already exist
        await db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                age INTEGER NOT NULL,
                roles TEXT NOT NULL
            )
        `);

        // Insert sample data into the 'users' table
        const insertData = [
            { name: 'Alice', age: 30, roles: ['user.read'] },
            { name: 'Bob', age: 25, roles: ['user.read', 'user.write'] },
        ];

        for (const user of insertData) {
            await db.run(
                'INSERT INTO users (name, age, roles) VALUES (?, ?, ?)',
                [user.name, user.age, JSON.stringify(user.roles)]
            );
        }

        console.log('Sample data inserted successfully');

        // Query and display the data
        const rows = await db.all('SELECT * FROM users');
        rows.forEach(row => {
            console.log({
                id: row.id,
                name: row.name,
                age: row.age,
                roles: JSON.parse(row.roles), // Parse the JSON string back into an array
            });
        });

        // Close the database connection
        await db.close();
        console.log('Database connection closed successfully');
    } catch (err) {
        console.error('Error handling the database:', err);
    }
}

openDatabase();
