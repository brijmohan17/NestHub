require('dotenv').config();
const mongoose=require("mongoose")
const initData=require('./data.js')
const Listing=require('../models/listing.js')

const DB_URL=process.env.ATLASDB;
main()
    .then(()=>{
        console.log("Connected to db");
    })
    .catch((error)=>{
        console.log(error)
    })
async function main(){
    await mongoose.connect(DB_URL)
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6836104e584c1427d61c4a09"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initilalised")
}

initDB();