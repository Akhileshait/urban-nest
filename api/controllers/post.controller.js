import prisma from "../lib/prisma.js";


const getPosts = async (req, res)=>{
    const query=req.query;
    console.log(query)
    try {
        const posts = await prisma.post.findMany(
            {
                where:{
                    city: query.city || undefined,
                    type: query.type || undefined,
                    property: query.property || undefined,
                    bedroom: parseInt(query.bedroom) || undefined,
                    price:{
                        gte: parseInt(query.minPrice) || 0,
                        lte: parseInt(query.maxPrice) || 100000000,
                    }
                }
            }
        );

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get posts!"});
    }
}

const getPost = async (req, res)=>{
    const id=req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true,
                        avatar:true,
                    }
                },
            }
        });

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to get post!"});
    }
}

const addPost = async (req, res)=>{
    const body=req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail,
                },
            }
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to add post!"});
    }
}

const editPost = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to edit post!"});
    }
}

const deletePost = async (req, res)=>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    console.log(tokenUserId);
    try {
        const post = await prisma.post.findUnique({where:{id}});

        if(post.userId!==tokenUserId){
            return res.status(403).json({message:"Unauthorized to delete this message"});
        }
        await prisma.post.delete({where:{id}});

        res.status(200).json({message:"Message deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to delete posts!"});
    }
}


export {getPosts, editPost, deletePost, getPost, addPost};