const { listingSchema, reviewSchema, userSchema } = require('../Schema');


const validatedReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        // Combine all error messages into one string
        const msg = error.details.map(el => el.message).join(', ');
        // You can either throw a custom error or respond with a status
        return res.status(400).send(`Validation Error: ${msg}`);
    } else {
        next(); // If no error, proceed to the next middleware or route handler
    }
};

module.exports = validatedReview;
