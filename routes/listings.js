const express = require ("express");
const router = express.Router();
const  wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isloggedIn } = require("../middelware.js")

const listingController = require("../controller/listings.js");
const multer  = require('multer')
const { storage} =require("../cloudConfig.js")
const upload = multer({ storage})


const validatelisting = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if(error){
     throw new ExpressError(400,error);
    } else{
      next();
    }
  }
router.route("/")
.get(wrapAsync(listingController.index ))
.post( isloggedIn,
  upload.single("listing[image]"),
validatelisting,
wrapAsync(listingController.createListing));
  router.get("/new", isloggedIn,listingController.renderNewForm);

  router.route("/:id")
  .get( isloggedIn,wrapAsync(listingController.showListing ))
  .put(isloggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.updateListing ))
    .delete(isloggedIn,wrapAsync( listingController.destroyListing));






  // //edit route
   router.get("/:id/edit",isloggedIn,wrapAsync(listingController.renderEdit ));


module.exports = router;