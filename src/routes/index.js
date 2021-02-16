import express from "express";
import userRoutes from "./user";
import postRoute from "./post";
import commentRoute from "./comment";

const router = new express.Router();
router.use("/auth", userRoutes);
router.use(postRoute);
router.use(commentRoute);

export default router;
