const Joi = require('joi');


const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            'string.empty': 'Title is required',
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Description is required',
        }),
        image: Joi.object({
            url: Joi.string().allow('', null),
            fileName: Joi.string().allow('', null)
        }).optional(), // optional image object
        location: Joi.string().required().messages({
            'string.empty': 'Location is required',
        }),
        country: Joi.string().required().messages({
            'string.empty': 'Country is required',
        }),
        price: Joi.number().min(0).required().messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price cannot be negative',
            'any.required': 'Price is required'
        })
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required().messages({
            'number.base': 'Rating must be a number',
            'number.min': 'Rating must be at least 1',
            'number.max': 'Rating cannot be more than 5',
            'any.required': 'Rating is required'
        }),
        comment: Joi.string().required().messages({
            'string.empty': 'Comment is required'
        })
    }).required()
});

const userSchema = Joi.object({
    email: Joi.string()
        .pattern(/^\S+@\S+\.\S+$/)
        .required()
        .messages({
            'string.pattern.base': 'Email must be a valid format like example@example.com',
            'string.empty': 'Email is required'
        }),
    username: Joi.string()
        .required()
        .messages({
            'string.empty': 'Username is required'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password is required'
        })
    
});

module.exports = {
    listingSchema,
    reviewSchema,
    userSchema
};
