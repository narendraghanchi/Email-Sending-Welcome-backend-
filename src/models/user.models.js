const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const schema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username must be unique"],
        minLength:[3,"Username must be at least 3 characters long"],
        maxLength:[30,"Username must be at most 30 characters long"],
        trim:true
        ,lowercase:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"],
        trim:true,lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"password must be at least 6 letters long"],
     

    },
    role:{
        type:String,
        enum:["user","admin"]
    }
},{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try{
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
        next()
    }catch(err){
        console.log(err)
        next(err)
    }
} 
)

userSchema.method.comparePassword=async function (password){
    try{
        return await bcrypt.comparePassword(password,this.password)
    }catch(err){
        console.log(err)
        throw err
    }
}
const userModel=mongoose.model("user",schema)

module.exports=userModel