import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Ensure data and temp video directories exist
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "candidates.json");
const tempVideosDir = path.join(__dirname, "public", "temp_videos");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(tempVideosDir)) {
  fs.mkdirSync(tempVideosDir, { recursive: true });
}

// Dedicated Admin Portal Routes (serves both /admin and /admin.html)
app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});
app.get("/admin.html", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, "public")));

// Helper function to read database
function readDB() {
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      candidates: {
        demo_token_123: {
          token: "demo_token_123",
          name: "Demo Candidate",
          email: "candidate@revolut.com",
          status: "pending",
          createdAt: new Date().toISOString(),
          submittedAt: null,
          answers: null,
        },
      },
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file:", err);
    return { candidates: {} };
  }
}

// Helper function to write database
function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// ==========================================
// 1. CANDIDATE LINK VERIFICATION ENDPOINT
// ==========================================
app.get("/api/verify-token", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.json({
      valid: true,
      status: "pending",
      candidate: { name: "Candidate Access", token: "demo" },
    });
  }

  const db = readDB();
  const candidate = db.candidates[token];

  if (!candidate) {
    return res.json({
      valid: false,
      reason: "not_found",
      message: "This assessment link is invalid or does not exist.",
    });
  }

  if (candidate.status === "completed") {
    return res.json({
      valid: true,
      status: "completed",
      candidate: { name: candidate.name, email: candidate.email },
      submittedAt: candidate.submittedAt,
      message: "This assessment has already been submitted.",
    });
  }

  return res.json({
    valid: true,
    status: "pending",
    candidate: { name: candidate.name, email: candidate.email, token: candidate.token },
  });
});

// ==========================================
// 2. SUBMIT ASSESSMENT & PERMANENT LOCK
// ==========================================
app.post("/api/submit-assessment", (req, res) => {
  const { token, answers } = req.body;
  const db = readDB();

  const targetToken = token || "demo_token_123";

  if (!db.candidates[targetToken]) {
    db.candidates[targetToken] = {
      token: targetToken,
      name: "Candidate Access",
      email: "candidate@revolut.com",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  }

  const candidate = db.candidates[targetToken];

  if (candidate.status === "completed") {
    return res.status(400).json({
      success: false,
      message: "This assessment has already been submitted.",
    });
  }

  candidate.status = "completed";
  candidate.submittedAt = new Date().toISOString();
  candidate.answers = answers || {};

  writeDB(db);

  console.log(`[SERVER] Assessment SUBMITTED & PERMANENTLY LOCKED for token: ${targetToken}`);

  return res.json({
    success: true,
    message: "Assessment submitted successfully and permanently locked.",
    submittedAt: candidate.submittedAt,
  });
});

// ==========================================
// 3. ADMIN LINK GENERATOR ENDPOINT
// ==========================================
app.post("/api/generate-link", (req, res) => {
  const { name, email } = req.body;
  const db = readDB();

  const candidateName = name || "Candidate Access";
  const candidateEmail = email || `candidate_${Date.now()}@example.com`;

  const randomStr = Math.random().toString(36).substring(2, 9);
  const token = `cand_${Date.now()}_${randomStr}`;

  db.candidates[token] = {
    token,
    name: candidateName,
    email: candidateEmail,
    status: "pending",
    createdAt: new Date().toISOString(),
    submittedAt: null,
    answers: null,
  };

  writeDB(db);

  const protocol = req.protocol;
  const host = req.get("host")?.replace("5000", "5173") || "localhost:5173";
  const inviteLink = `${protocol}://${host}/?token=${token}`;

  console.log(`[SERVER] Generated candidate link for ${candidateName}: ${inviteLink}`);

  return res.json({
    success: true,
    token,
    name: candidateName,
    email: candidateEmail,
    inviteLink,
  });
});

// ==========================================
// 4. LIST ALL GENERATED CANDIDATE LINKS
// ==========================================
app.get("/api/candidates", (_req, res) => {
  const db = readDB();
  const list = Object.values(db.candidates).map((c) => ({
    token: c.token,
    name: c.name,
    email: c.email,
    status: c.status,
    createdAt: c.createdAt,
    submittedAt: c.submittedAt,
  }));
  return res.json({ success: true, count: list.length, candidates: list });
});

// ==========================================
// 5. VIDEO UPLOAD & DELETE ENDPOINTS
// ==========================================
app.post("/api/upload-video", (req, res) => {
  try {
    const { questionId, base64Data, mimeType } = req.body;
    const ext = mimeType?.includes("mp4") ? "mp4" : "webm";
    const filename = `temp_${questionId}_${Date.now()}.${ext}`;
    const filepath = path.join(tempVideosDir, filename);

    const base64Content = base64Data.replace(/^data:(.*?);base64,/, "");
    fs.writeFileSync(filepath, Buffer.from(base64Content, "base64"));

    return res.json({ success: true, filename, url: `/temp_videos/${filename}` });
  } catch (err) {
    console.error("Video upload error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.post("/api/delete-video", (req, res) => {
  try {
    const { filename } = req.body;
    if (filename) {
      const filepath = path.join(tempVideosDir, path.basename(filename));
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/api/cleanup-all-videos", (_req, res) => {
  try {
    if (fs.existsSync(tempVideosDir)) {
      const files = fs.readdirSync(tempVideosDir);
      for (const file of files) {
        if (file.startsWith("temp_")) {
          try {
            fs.unlinkSync(path.join(tempVideosDir, file));
          } catch (_) {}
        }
      }
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Revolut Assessment Express Backend Server Running!`);
  console.log(`📍 Candidate Assessment Website: http://localhost:5173`);
  console.log(`🔑 Recruiter Admin Portal: http://localhost:5000/admin (or http://localhost:5000/admin.html)`);
  console.log(`==================================================\n`);
});
