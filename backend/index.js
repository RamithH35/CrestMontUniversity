const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const eventsRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const departmentsRouter = require("./routes/departments");
const clubsRouter = require("./routes/clubs");

function loadEnvFromFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
  const parsed = dotenv.parse(raw);

  Object.entries(parsed).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

loadEnvFromFile();
const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    endpoints: {
      getEvents: "GET /events",
      addEvent: "POST /events",
      deleteEvent: "DELETE /events/:id"
    }
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Keep existing route path exactly the same.
app.use("/events", eventsRouter);
app.use("/auth", authRouter);
app.use("/departments", departmentsRouter);
app.use("/clubs", clubsRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = (process.env.MONGODB_URI || "").trim();

async function startServer() {
  if (!MONGODB_URI) {
    console.error("Failed to connect to MongoDB");
    console.error("Missing MONGODB_URI in .env. Add your MongoDB Atlas URI and restart.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
      tlsAllowInvalidCertificates: true,
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();