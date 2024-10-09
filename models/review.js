const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentimentScore: {
    type: Number,
    default: 0,
  },
  sentimentCategory: {
    type: String,
    default: "neutral",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
