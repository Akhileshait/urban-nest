import express from 'express';

const router = express.Router();


app.use("/api/posts", (req, res) => {
     res.send("It Works!")
});
app.use("/api/posts", (req, res) => {
     res.send("It Works!")
});



export default router;