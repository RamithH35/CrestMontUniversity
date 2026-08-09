// Lightweight keep-alive ping for MongoDB Atlas.
// Connects, runs a trivial command, disconnects. No app logic here.
const mongoose = require("mongoose");

async function ping() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set — aborting ping.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    await mongoose.connection.db.admin().ping();
    console.log(`[${new Date().toISOString()}] MongoDB ping successful.`);
    process.exit(0);
  } catch (err) {
    console.error("MongoDB ping failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

ping();
