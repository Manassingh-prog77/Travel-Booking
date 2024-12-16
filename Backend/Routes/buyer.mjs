import express from 'express';
import PackageBooking from '../Schema/Customer.mjs'; // Ensure correct import path
import TourPackage from '../Schema/Pacakges.mjs'

const router = express.Router();

// POST route for creating a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, numberOfTravelers, specialRequests, packageId, totalPrice } = req.body;

    // Create a new booking instance
    const newBooking = new PackageBooking({
      customerName,
      customerEmail,
      customerPhone,
      numberOfTravelers,
      specialRequests,
      packageId,
      totalPrice,
    });

    // Generate invoice
    newBooking.generateInvoice();  // This should now work if method is defined properly

    // Save the booking to the database
    await newBooking.save();

    // Respond with the created booking
    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET route to retrieve all packages
router.get('/packages', async (req, res) => {
  try {
    // Retrieve all packages from the database
    const packages = await PackageBooking.find();  // Assuming you have a TourPackage model

    if (packages.length === 0) {
      return res.status(404).json({ message: 'No packages found' });
    }

    // Respond with the found packages
    res.status(200).json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE route to delete a specific tour package by ID
router.delete('/packages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the package by ID and remove it from the database
    const deletedPackage = await PackageBooking.findByIdAndDelete(id);

    // If package not found
    if (!deletedPackage) {
      return res.status(404).json({ success: false, error: "Tour package not found" });
    }

    // Respond with success message
    res.json({
      success: true,
      message: `Tour package with ID ${id} has been deleted successfully`,
      deletedPackage,
    });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting package', error: error.message });
  }
});

router.get("/booking/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the package by ID from the database
    const data = await PackageBooking.findById(id);

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
