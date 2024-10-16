import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

const register =async (req, res)=>{
     try {
          
          const {username, email, password} = req.body;
          
          const hashPass = await bcrypt.hash(password, 10);
          
          const newUser = await prisma.user.create({
               data: {username, email, password: hashPass},
          });
          console.log(newUser);
          
          res.status(201).json({message:"User created successfully"});
     } catch (error) {
          console.log(error);
          res.status(500).json({message:"Failed to create User!"});
     }
}

const login = async (req, res)=>{
     const {username, password} = req.body;

     try {
          
          const user = await prisma.user.findUnique({where: {username}});

          if(!user){
               return res.status(404).json({message:"Invalid credentials! User not found!"});
          }

          const isPassValid = await bcrypt.compare(password, user.password);

          if(!isPassValid){
               return res.status(401).json({message:"Invalid credentials! Password does not match!"});
          }
          const age = 1000*60*60*24*7;

          const token = jwt.sign(
          {
               id:user.id,
               isAdmin:false
          }, 
          process.env.JWT_SECRET_KEY, {expiresIn:age})

          const {password: userPassword, ...userInfo}= user;


          res.cookie("token", token, {
               httpOnly:true,
               maxAge:age,
               // secure:true
          }).status(200).json({message:"Login successful"});

     } catch (err) {
          console.log(err);
          res.status(500).json({message:"Failed to login!"});
     }

}

const logout =async (req, res)=>{
     res.clearCookie("token").status(200).json({message:"Logged out!"});
}

export {register, login, logout};