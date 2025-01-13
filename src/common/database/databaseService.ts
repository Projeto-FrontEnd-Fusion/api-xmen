import { Pool, type QueryResultRow } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async <T extends QueryResultRow>(text: string, params?: any[]): Promise<T[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(text, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

export default pool;
