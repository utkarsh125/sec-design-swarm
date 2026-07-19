import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = Number(process.env["PORT"]) || 3001;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`HTTP server running on http://localhost:${info.port}`);
});
