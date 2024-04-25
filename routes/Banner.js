const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Banner = require("../model/Banner");

// POST route to save a new banner
router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Check if file was provided
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create new banner
        const newBanner = new Banner({
            image: result.secure_url,
        });

        // Save banner
        await newBanner.save();

        res.status(201).json(newBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET route to get all banners
router.get("/", async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE route to delete a banner
router.delete("/:id", async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Extract public ID from image URL
        const publicId = banner.image.split("/upload/")[1].split(".")[0];

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Delete banner from database
        await Banner.findByIdAndDelete(banner.id);

        res.json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT route to update a banner
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        // Find banner by id
        let banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Delete existing image from Cloudinary
        // Extract public ID from image URL
        const publicId = banner.image.split("/upload/")[1].split(".")[0];

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Update banner with new image
        banner.image = result.secure_url;
        // banner.image = result.public_id;
        await banner.save();

        res.json(banner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;