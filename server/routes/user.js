import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyToken.js";
import { update } from "../controller/user.js";

router.put("/update/:id", verifyToken, update);

export default router;
