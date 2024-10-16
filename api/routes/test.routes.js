import express from 'express';
import { admin, loggedIn } from '../controllers/test.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get("/loggedin", verifyToken ,loggedIn);
router.get("/admin", admin);



export default router;