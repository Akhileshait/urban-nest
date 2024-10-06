import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

const register =async (req, res)=>{
     const {username, email, password} = req.body;
     
     const hashPass = await bcrypt.hash(password, 10);
     
     const newUser = await prisma.user.create({
          data: {username, email, password: hashPass},
     });
     console.log(newUser);

     res.status(201).json({message:"User created successfully"});
}

const login = async (req, res)=>{
     console.log(req.body);
}

const logout =async (req, res)=>{

}

export {register, login, logout};