const express = require('express');
const Review = require('../models/review.js');
const router=express.Router({mergeParams:true});
const Listing =require('../models/listing.js')
const isReviewAuthor=require('../middleware/isReviewAuthor.js')
const auth=require('../middleware/authMiddleware.js')
const validatedReview=require('../middleware/validatedReview.js')
const reviewController=require('../controllers/reviews.js')
const wrapAsync = require('../utils/wrapAsync.js')

router.post('/',auth,validatedReview,reviewController.createReview)

router.delete('/:reviewId',auth,isReviewAuthor,reviewController.destroyReview)

module.exports=router;