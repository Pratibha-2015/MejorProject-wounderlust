const express = require ("express");
const router = express.Router({mergeParams:true});
const  wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validatereview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    
    if(error){
     throw new ExpressError(400,error);
    } else{
      next();
    }
  };
const reviewController = require ("../controller/reviews.js");
//Review
 //post route
 router.post("/",validatereview, wrapAsync(reviewController.createReview));
  
   //delete review route
  
   router.delete(
    "/:reviewId",
    wrapAsync(reviewController.destroyReview)
   );
  module.exports =router;