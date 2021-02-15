import express from "express";
import userRoutes from "./user";
import postRoute from "./post";

const router = new express.Router();
router.use("/auth", userRoutes);
router.use(postRoute);

export default router;
