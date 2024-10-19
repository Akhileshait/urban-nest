import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const getUsers= async (req, res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get users!"});
    }
}
const getUser= async (req, res)=>{
    try {
        const user = await prisma.user.findUnique({where:{id:req.params.id}});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get user!"});
    }
}
const updateUser= async (req, res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    const {password, avatar, ...inputs}=req.body;

    if(id!=tokenUserId){
        return res.status(403).json({message:"You are not authorized to update this user"});
    }
    let hashedPassword =null;
    try {
        if(password){
            hashedPassword = await bcrypt.hash(password, 10);
            
        }

        const updatedUser = await prisma.user.update({where:{id},data:{...inputs, ...(hashedPassword && {password:hashedPassword}),
        ...(avatar && {avatar})}});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to update user!"});
    }
}
const deleteUser= async (req, res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;

    if(id!=tokenUserId){
        return res.status(403).json({message:"You are not authorized to delete this user"});
    }

    try {
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).json({message:"User deleted successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to delete user!"});
    }
}

export {getUsers, getUser, updateUser, deleteUser};