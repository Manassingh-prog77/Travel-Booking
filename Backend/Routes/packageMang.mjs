import express from "express";
import { body, validationResult } from "express-validator";
import TourPackage from "../Schema/Pacakges.mjs"; // Import the TourPackage schema

const router = express.Router();

// Route - 1 => Create a new tour package using POST "/api/tourPackages". Doesn't require auth
router.post(
  "/createTourPackage",
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("price", "Price must be a number").isNumeric(),
    body("availableDates", "Available dates are required").isArray(),
    body("image", "Image URL is required").notEmpty(),
  ],
  async (req, res) => {
    let success = false;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the tour package already exists (optional)
      let tourPackage = await TourPackage.findOne({ title: req.body.title });
      if (tourPackage) {
        return res.status(400).json({
          success,
          error: "A tour package with this title already exists.",
        });
      }

      // Create a new tour package
      tourPackage = new TourPackage({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        availableDates: req.body.availableDates,
        image: req.body.image,
      });

      // Save the tour package to the database
      await tourPackage.save();
      success = true;

      res.json({ success, tourPackage });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error while creating tour package");
    }
  }
);

// Route - 2 => Fetch all tour packages using GET "/api/tourPackages". Doesn't require auth
router.get("/packages", async (req, res) => {
  try {
    // Fetch all tour packages from the database
    const packages = await TourPackage.find();

    // If no packages found
    if (!packages || packages.length === 0) {
      return res.status(404).json({ success: false, error: "No tour packages found" });
    }

    // Send the list of tour packages
    res.json({ success: true, packages });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error while fetching tour packages");
  }
});

router.get("/packages/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the package by ID from the database
    const data = await TourPackage.findById(id);

    // If package not found
    if (!data) {
      return res.status(404).json({ success: false, error: "Tour package not found" });
    }

    // Send the package details
    res.json({ success: true, data });
  } catch (error) {
    console.error(error.message);

    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "Invalid package ID" });
    }

    res.status(500).send("Server error while fetching tour package");
  }
});

export default router;
