import mysql from 'mysql2/promise';


// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  database: process.env.NEXT_PUBLIC_DB_NAME,
});

export default connection;