// backend/src/server.js
const app = require("./app");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close((err) => {
    if (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM")); // docker stop
process.on("SIGINT", () => shutdown("SIGINT"));   // Ctrl+C
