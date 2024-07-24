require('dotenv').config();
const jwt=require('jsonwebtoken');

function auth(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader;
    if(token==null) return res.status(401).json({success:401,message:"Unauthorized user!"});

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).send({success:403,message:"Session Expired! Try login again! "});
        req.userId=user.userId;
        next();
    });
}

module.exports={
    auth
}