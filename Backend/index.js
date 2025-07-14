
require('dotenv').config();

const express =require('express')
const app =express()
const cors=require('cors')
const mongoose = require('mongoose')
const User=require('./models/user.js')

const listingsRouter=require('./routes/listing.js')
const reviewsRouter=require('./routes/review.js')
const userRouter=require('./routes/user.js')

const port = 4000
const DB_URL=process.env.ATLASDB;

main().
then(()=>{
    console.log("Connected to db");
})
.catch((error)=>{
    console.log(error.message);
})

async function main(){
    await mongoose.connect(DB_URL)
}
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/listings',listingsRouter)
app.use('/listings/:id/reviews',reviewsRouter)
app.use('/',userRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port,()=>{
    console.log(`Example app listning on port ${port}`)
})
