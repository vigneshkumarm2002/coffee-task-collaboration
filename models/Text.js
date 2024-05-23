// models/Text.js
const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Text", TextSchema);
