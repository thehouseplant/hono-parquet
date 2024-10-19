import { Database } from "duckdb";

export function initializeDatabase(db: Database): void {
  db.exec(``);
}

export const QUERIES = {
  allEmployees: `SELECT * FROM './data/university-of-california-2023.parquet`,
};
