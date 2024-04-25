// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../model/Categories");

// POST route to create a new category
router.post("/", async (req, res) => {
    try {
        const { categoryName } = req.body;
        const newCategory = new Category({ categoryName });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET route to fetch all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE route to delete a category by ID
router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await Category.findByIdAndDelete(category._id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT route to update a category by ID
router.put("/:id", async (req, res) => {
    try {
        const { categoryName } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { categoryName },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
