// routes/pageRoutes.js
const express = require("express");
const router = express.Router();
const Page = require("../model/PagesData");

// POST route to create a new page
router.post("/", async (req, res) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET route to fetch all pages
router.get("/", async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE route to delete a page by ID
router.delete("/:id", async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    await Page.findByIdAndDelete(page._id);
    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT route to update a page by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPage) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json(updatedPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
