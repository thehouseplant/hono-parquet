import { Database } from "duckdb";

export function initializeDatabase(db: Database): void {
  db.exec(``);
}

export const QUERIES = {};
