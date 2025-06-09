const { listingSchema, reviewSchema, userSchema } = require('../Schema');


const validUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',')

        return res.status(400).json({message:`Validation Error : ${errMsg}`})
    }else{
        next()
    }
}

module.exports=validUser