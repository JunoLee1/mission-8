import express from "express";
import authRouter from "./auth.routes.js"
import userRouter from "./user.routes.js"
import productRouter from "./product.routes.js"
import articleRouter from "./article.routes.js"
import commentRouter from"./comment.routes.js"
import notificationRouter from "./notification.routes/index.routes.js"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/article", articleRouter)
router.use("/comment", commentRouter)
router.use("/notification",notificationRouter)
export default router;
