const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  club: {
    type: String,
    default: "",
    trim: true,
  },
  type: {
    type: String,
    enum: ["volunteer", "register", "both"],
    required: true,
  },
  category: {
    type: String,
    enum: ["upcoming", "past", "marquee"],
    default: "upcoming",
  },
  // Kept for existing frontend compatibility.
  volunteerLink: {
    type: String,
    default: "",
    trim: true,
  },
  // Kept for existing frontend compatibility.
  registerLink: {
    type: String,
    default: "",
    trim: true,
  },
  imageUrl: {
    type: String,
    default: "",
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  registrationEndDate: {
    type: Date,
    required: true,
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
  demoExpiresAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.index({ demoExpiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Event", eventSchema);