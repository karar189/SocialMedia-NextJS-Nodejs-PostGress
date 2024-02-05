// api/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "social1",
  password: "admin1899",
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
