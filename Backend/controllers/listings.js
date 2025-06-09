const Listing=require('../models/listing')

module.exports.index=async (req,res)=>{
    const allListings = await Listing.find({})
    // console.log(allListings)
   res.status(200).json(allListings);
}
module.exports.createListing=async(req,res,next)=>{

  console.log('req-user: ',req.user)
    try{
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,'..',filename)
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user.id
    newlisting.image={url,filename}
    await newlisting.save();
    res.status(201).json({
      message: 'Listing created successfully!',
      listing: newlisting,
    });
    }catch(err){
        console.error('Error creating listing:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.showListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate({path:'review',populate:{path:'author',select:'username'}}).populate('owner');

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        return res.status(200).json(listing);
    } catch (err) {
        console.error('Error fetching listing:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
    }
    await listing.save();

    res.status(200).json({ message: "Listing updated successfully", listing });

  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Failed to update listing" });
  }
};


module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    console.log("Deleted listing:", listing);
    res.status(200).json({ message: "Listing deleted successfully" });

  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Failed to delete listing" });
  }
};


