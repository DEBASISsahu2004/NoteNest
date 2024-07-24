require('dotenv').config();
const User=require('../models/users.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function signup(req,res){
    const userDetails=req.body;
    try{
        if(!userDetails) throw Error("User details not found");
        const {name,email,password}=userDetails;
        const salt=await bcrypt.genSalt(Number(process.env.SALT));
        const paswordHash=await bcrypt.hash(password,salt);

        const newUser=new User({
            name,
            email,
            password:paswordHash
        })

        await newUser.save();
        res.status(201).json({success:201,message:"User created successfully"});

    }
    catch(err){
        res.status(500).json({success:500,message:`Error in signup${err}`});

    }

}

async function login(req,res){
    const userDetails=req.body;
    try{
        if(!userDetails) throw Error("login details are missing");
        const {email,password}=userDetails;

        const user=await User.findOne({email});
        if(!user) throw Error("User email not exist");

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) throw Error("Email or Password is incorrect");

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({success:200,token});


    }
    catch(err){
        res.status(500).json({success:500,message:`Error in login${err}`});
    }

}

module.exports={ signup, login };