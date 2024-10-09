const Listing = require("../models/listing");
const Review = require("../models/review");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// Create Review
module.exports.createReview = async (req, res) => {
  const { id } = req.params; // Listing ID from URL params
  const review = new Review(req.body.review);
  review.author = req.user._id;

  // Perform sentiment analysis
  const result = sentiment.analyze(review.comment);
  review.sentimentScore = result.score;
  review.sentimentCategory =
    result.score > 0 ? "positive" : result.score < 0 ? "negative" : "neutral";

  const listing = await Listing.findById(id);
  listing.reviews.push(review);
  await review.save();
  await listing.save();

  req.flash("success", "Review added!");
  res.redirect(`/listings/${id}`);
};

// Delete Review
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
