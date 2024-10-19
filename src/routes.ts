import { Hono, type Context } from "hono";
import { Database } from "duckdb";
import { QUERIES } from "./db";

interface Employee {
  employee_name: string;
  job_title: string;
  base_pay: number;
  overtime_pay: number;
  other_pay: number;
  benefits: number;
  total_pay: string;
  total_pay_and_benefits: string;
  year: number;
  notes: string;
  agency: string;
  status: string;
}

export function setupRoutes(app: Hono, db: Database): void {
  app.get("/", (c) => c.text("DuckDB Hono API entrypoint"));

  const executeQuery = async <T>(query: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      db.all(query, (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        resolve(rows as T[]);
      });
    });
  };

  const sendJsonResponse = <T>(c: Context, data: T) => {
    const jsonString = JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    );
    return c.json(JSON.parse(jsonString));
  };

  app.get("/employees", async (c) => {
    const rows = await executeQuery<Employee>(QUERIES.allEmployees);
    return sendJsonResponse(c, rows);
  });
}
