const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    req.flash("error", "An error occurred while fetching listings.");
    res.redirect("/");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    // Perform sentiment analysis on each review
    listing.reviews.forEach((review) => {
      const result = sentiment.analyze(review.comment || "");
      review.sentimentScore = result.score;
      review.sentimentCategory =
        result.score > 0
          ? "positive"
          : result.score < 0
          ? "negative"
          : "neutral";
    });

    res.render("listings/show.ejs", { listing });
  } catch (error) {
    console.error("Error showing listing:", error);
    req.flash("error", "An error occurred while showing the listing.");
    res.redirect("/listings");
  }
};

module.exports.createListing = async (req, res) => {
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    req.flash("error", "An error occurred while creating the listing.");
    res.redirect("/listings");
  }
};

module.exports.renderEditForm = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url.replace(
      "/upload",
      "/upload/w_250"
    );
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (error) {
    console.error("Error rendering edit form:", error);
    req.flash("error", "An error occurred while rendering the edit form.");
    res.redirect("/listings");
  }
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );

    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "An error occurred while updating the listing.");
    res.redirect(`/listings/${id}`);
  }
};

module.exports.destroyListing = async (req, res) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error deleting listing:", error);
    req.flash("error", "An error occurred while deleting the listing.");
    res.redirect("/listings");
  }
};
