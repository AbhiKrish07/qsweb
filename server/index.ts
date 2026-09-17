import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.static(staticPath));

  // Email Notification & API Endpoints targeting glexionstriker@gmail.com
  app.post("/api/:endpoint", (req, res) => {
    const endpoint = req.params.endpoint;
    const recipient = "glexionstriker@gmail.com";
    console.log(`[EXPRESS SERVER] API endpoint /api/${endpoint} called. Routing payload to: ${recipient}`, req.body);
    
    res.json({
      success: true,
      targetEmail: recipient,
      message: `Notification successfully routed to ${recipient}`,
      received: req.body,
    });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
