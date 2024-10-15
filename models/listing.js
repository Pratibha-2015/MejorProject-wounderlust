const mongoose = require ("mongoose");
const review = require("./review");
 const Schema = mongoose.Schema;
  const listingSchama = new Schema({
    title: {
        type: String,
        required: true
    },
    description:String,
    image: {
   url: String,
   filename: String,
 },
    price: Number,
     location: String,
    country: String,
    review:[
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref:"user",
    }
  });

  const Listing = mongoose.model("Listing", listingSchama);
  module.exports = Listing;