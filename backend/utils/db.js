import mysql from 'mysql2';

// const {Client}= mysql

// Create a new PostgreSQL client instance
const client = mysql.createConnection({
    user: 'root', // PostgreSQL username
    host: 'localhost', // PostgreSQL server host
    database: 'testne', // PostgreSQL database name
    password: 'root@123', // PostgreSQL password (if any)
    port: 3306 // PostgreSQL port (default is 5432)
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
    

export default client;