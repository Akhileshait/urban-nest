import jwt from "jsonwebtoken";

const loggedIn = async (req, res) => {
    console.log(req.userId);

    res.status(200).json({message:"You are Authenticated"});
}

const admin = async (req, res) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message:"Not Authenticated"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload)=>{
        if(err) return res.status(403).json({message:"Invalid Token"});
        if(!payload.isAdmin){
            return res.status(403).json({message:"You are not an admin"});
        }
    })

    res.status(200).json({message:"You are Authenticated"});
}

export {loggedIn, admin};