const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Helper function for handling async errors
const Listing = require("../models/listing.js"); // Your Listing model
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); // Middleware for authentication and validation
const listingController = require("../controllers/listings.js"); // Your controller for listings
const multer = require("multer"); // Middleware for handling multipart/form-data
const { storage } = require("../cloudConfig.js"); // Cloud storage configuration
const upload = multer({ storage }); // Configure multer to use the defined storage

// Index and Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Fetch all listings
  .post(
    isLoggedIn, // Ensure user is logged in
    upload.single("listing[image]"), // Handle image upload
    validateListing, // Validate the listing data
    wrapAsync(listingController.createListing) // Create a new listing
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm); // Render form to create a new listing

// Show, Update, and Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show a specific listing
  .put(
    isLoggedIn, // Ensure user is logged in
    isOwner, // Ensure user is the owner of the listing
    upload.single("listing[image]"), // Handle image upload for updates
    validateListing, // Validate the listing data
    wrapAsync(listingController.updateListing) // Update the listing
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete the listing

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn, // Ensure user is logged in
  isOwner, // Ensure user is the owner of the listing
  wrapAsync(listingController.renderEditForm) // Render the edit form for a listing
);

module.exports = router;
