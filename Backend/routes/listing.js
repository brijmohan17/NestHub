const express =require('express')
const router =express.Router();
const Listing=require('../models/listing.js')
const listingController=require('../controllers/listings.js')
const multer=require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({storage})
const auth=require('../middleware/authMiddleware.js')

const validatedListing =require('../middleware/validatedListing.js')
const isOwner =require('../middleware/isOwner.js')
const wrapAsync=require('../utils/wrapAsync.js')

//index and create route
router
    .route('/')
    .get(listingController.index)
    .post(auth,upload.single('listing[image]'),
    validatedListing
    ,listingController.createListing)

router.
    route('/:id')
    .get(listingController.showListing)
    .put(auth,isOwner,upload.single('listing[image]'),validatedListing,
    listingController.updateListing)
    
    .delete(auth,isOwner,listingController.destroyListing)

    
module.exports=router;
