const Review = require('../models/review');

const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!review.author.equals(req.user.id)) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    // Attach review to request in case controller needs it
    req.review = review;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ message: 'Server error while checking review author' });
  }
};

module.exports = isReviewAuthor;
