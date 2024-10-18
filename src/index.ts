import { Hono } from "hono";
import { ParquetReader, ParquetWriter } from "@dsnp/parquetjs";
import { Readable } from "stream";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, Hono with Cloudflare Workers!");
});

// Sample endpoint to read a parquet file
app.get("/data", async (ctx) => {
  const parquetData = await fetch("https://some.url/data.parquet");
  const buffer = await parquetData.arrayBuffer();
  const reader = await ParquetReader.openBuffer(Buffer.from(buffer));

  const cursor = reader.getCursor();
  const rows = [];
  let record = null;

  while ((record = await cursor.next())) {
    rows.push(record);
  }

  await reader.close();

  return ctx.json({ data: rows });
});

export default app;
