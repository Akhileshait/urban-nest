import express from 'express';
import authRoute from './routes/auth.routes.js';
import postRoute from './routes/post.routes.js';
import userRoute from './routes/user.routes.js';

const app = express();

app.use(express.json());

app.use("/api/test", (req, res) => {
     console.log("Router works");
     res.send("It Works!")
});

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


app.listen(
     process.env.PORT || 3800,
    ()=>{
      console.log('Server is running on port 3800');
    }
)