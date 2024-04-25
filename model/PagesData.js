// models/Page.js
const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  category: String,
  name: String,
  url: String,
  title: String,
  metaData: String,
  imgTag: String,
  headHtml: String,
  mapCode: String,
  textSection01: String,
  textSection02: String,
  status: Boolean
});

module.exports = mongoose.model("Page", pageSchema);
