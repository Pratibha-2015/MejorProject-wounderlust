const Listing = require("../models/listing");
const Review = require ("../models/review");
module.exports.createReview =  async(req ,res) =>{

    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    listing.review.push(newreview);
  
    await newreview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
   };

   module.exports.destroyReview = async(req,res) =>{
    let {id, reviewId } =req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
     await Review.findByIdAndDelete(reviewId);
     req.flash("success", "Review Deleted");
     res.redirect(`/listings/${id}`);
      };