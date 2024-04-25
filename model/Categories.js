// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Category", categorySchema);
