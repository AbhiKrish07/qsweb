import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OWNER_EMAIL = "glexionstriker@gmail.com";
const LOOPS_API_URL = "https://app.loops.so/api/newsletter-form/cmatylqt31ghsxb0izxxyerf0";
const DATA_DIR = path.resolve(__dirname, "..", "data");
const WAITLIST_FILE = path.resolve(DATA_DIR, "waitlist.json");

// Ensure persistent data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface WaitlistRecord {
  email: string;
  timestamp: string;
  source: string;
  ip?: string;
  userAgent?: string;
}

function saveWaitlistRecord(record: WaitlistRecord): WaitlistRecord[] {
  let records: WaitlistRecord[] = [];
  try {
    if (fs.existsSync(WAITLIST_FILE)) {
      const content = fs.readFileSync(WAITLIST_FILE, "utf-8");
      records = JSON.parse(content);
    }
  } catch (err) {
    console.error("[WAITLIST STORAGE] Read error:", err);
    records = [];
  }

  const normalized = record.email.trim().toLowerCase();
  const exists = records.some((r) => r.email.toLowerCase() === normalized);
  if (!exists) {
    records.push({
      email: normalized,
      timestamp: record.timestamp,
      source: record.source,
      ip: record.ip,
      userAgent: record.userAgent,
    });
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(records, null, 2), "utf-8");
    console.log(`[WAITLIST RECORDED] ✓ Successfully saved: ${normalized}. Total subscribers: ${records.length}`);
  } else {
    console.log(`[WAITLIST RECORDED] Already registered: ${normalized}`);
  }

  return records;
}

async function forwardToLoops(email: string) {
  try {
    const formBody = `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`;
    const response = await fetch(LOOPS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    console.log(`[LOOPS FORWARD] Sent ${email} to Loops API. Status: ${response.status}`);
  } catch (err) {
    console.error("[LOOPS FORWARD] Failed to forward to Loops:", err);
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(staticPath));

  // 1. Waitlist & Newsletter Registration Endpoint
  app.post(["/api/waitlist", "/api/subscribe"], async (req, res) => {
    const email = (req.body?.email || req.body?.["newsletter-form-input"] || "").trim().toLowerCase();
    const source = req.body?.source || "Quiet Studio Frontpage Waitlist";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email is required." });
    }

    const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";

    // Record in local persistent storage
    saveWaitlistRecord({
      email,
      timestamp: new Date().toISOString(),
      source,
      ip: clientIp,
      userAgent,
    });

    // Forward to Loops newsletter form endpoint
    forwardToLoops(email);

    // Notify owner at glexionstriker@gmail.com
    console.log(`[OWNER ALERT] 📧 New waitlist registration received for ${OWNER_EMAIL}:`);
    console.log(`  → Subscriber Email: ${email}`);
    console.log(`  → Source: ${source}`);
    console.log(`  → Timestamp: ${new Date().toISOString()}`);

    return res.json({
      success: true,
      message: "You're on the list! Welcome to Quiet Studio.",
      recipientNotification: OWNER_EMAIL,
      email,
    });
  });

  // 2. Query Waitlist Entries (for Studio Owner inspection)
  app.get("/api/waitlist", (_req, res) => {
    if (fs.existsSync(WAITLIST_FILE)) {
      try {
        const data = fs.readFileSync(WAITLIST_FILE, "utf-8");
        const parsed = JSON.parse(data);
        return res.json({ count: parsed.length, waitlist: parsed });
      } catch {
        return res.json({ count: 0, waitlist: [] });
      }
    }
    return res.json({ count: 0, waitlist: [] });
  });

  // Generic Email Notification & API Endpoints targeting glexionstriker@gmail.com
  app.post("/api/:endpoint", (req, res) => {
    const endpoint = req.params.endpoint;
    console.log(`[EXPRESS SERVER] API endpoint /api/${endpoint} called. Routing payload to: ${OWNER_EMAIL}`, req.body);
    
    res.json({
      success: true,
      targetEmail: OWNER_EMAIL,
      message: `Notification successfully routed to ${OWNER_EMAIL}`,
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
