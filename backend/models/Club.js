const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  achievements: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Club", clubSchema);
