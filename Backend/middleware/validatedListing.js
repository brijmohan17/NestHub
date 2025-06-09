const { listingSchema, reviewSchema, userSchema } = require('../Schema');


const validatedListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',')

        return res.status(400).json({message:`Validation Error : ${errMsg}`})
    }else{
        next()
    }
}

module.exports =  validatedListing ;