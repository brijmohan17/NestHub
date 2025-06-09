const Listing = require('../models/listing');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user.id;

    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    // Fetch updated listing with populated reviews and authors
    const updatedListing = await Listing.findById(listing._id)
      .populate('owner')
      .populate({
        path: 'review',
        populate: { path: 'author'},
      });

    return res.status(201).json(updatedListing);  
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only author can delete
    if (!review.author.equals(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
