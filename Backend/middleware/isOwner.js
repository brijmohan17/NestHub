const Review = require('../models/review');
const Listing =require('../models/listing')
const isOwner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'listing not found' });
    }

    if (!listing.owner.equals(req.user.id)) {
      return res.status(403).json({ message: 'You are not authorized to delete this listing' });
    }

    // Attach review to request in case controller needs it
    req.listing = listing;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ message: 'Server error while checking review author' });
  }
};

module.exports = isOwner;
