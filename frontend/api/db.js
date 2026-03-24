import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL + '?sslmode=verify-full',
  ssl: { rejectUnauthorized: true }
});

export default pool;
