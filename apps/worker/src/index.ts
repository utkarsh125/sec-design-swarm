import { Worker } from "bullmq";
import { Redis } from "ioredis";

const connection = new Redis(process.env["REDIS_URL"] || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "design-review",
  async (job) => {
    // Job processing will be implemented during feature development
    console.log(`Processing job ${job.id}: ${job.name}`);
  },
  { connection }
);

worker.on("ready", () => {
  console.log("Worker is ready and waiting for jobs");
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});

console.log("Worker started, connecting to Redis...");
