import pg from 'pg';

const {Client}= pg

// Create a new PostgreSQL client instance
const client = new Client({
    user: 'postgres', // PostgreSQL username
    host: 'localhost', // PostgreSQL server host
    database: 'nodestudy', // PostgreSQL database name
    password: 'vava635', // PostgreSQL password (if any)
    port: 5432 // PostgreSQL port (default is 5432)
});

// Connect to PostgreSQL server
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database:', err);
    });

export default client;