const userModel=required("./../models/user.models")

const registerUser=async(req,res)=>{
    try{
        const {username,email,password,role="user"}=req.body
        const user=await userModel.create({
            username,
            email,
            password
        })
        res.status(201).json({
            success:true,
            user
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

async function logoutUser(req,res){
    try{
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }   

}

module.exports={
    registerUser,
    loginUser,
    logoutUser
}