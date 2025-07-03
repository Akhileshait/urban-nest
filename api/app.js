import express from 'express';
import authRoute from './routes/auth.routes.js';
import postRoute from './routes/post.routes.js';
import userRoute from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import testRoute from './routes/test.routes.js';

const app = express();

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);


app.listen(
    process.env.PORT || 3800,
    ()=>{
      console.log('Server is running on port 3800');
    }
)