const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)

console.log("conected to db succesfully")
    }

     
    catch(err){
        console.log("error to connect with :",err)
    }

}

Module.exports=connectDB