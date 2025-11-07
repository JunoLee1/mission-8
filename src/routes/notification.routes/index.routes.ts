import express from "express";
import type{ Request, Response, NextFunction } from "express"
import sendRouter from"./send.routes.js"
import readRouter from "./mark_as_read.routes.js"
import { NotificationController } from "controller/notification.controller.js";
const router = express.Router()
const notificationController = new NotificationController()

router.use("/send", sendRouter);

router.use("/mark_as_read", readRouter )

// 알림 목록 조회
router.get("/",async(req:Request,res:Response,next:NextFunction) => {
    notificationController.accessAlerts(req, res, next)
})

// 유저의 안 읽은 알림의 개수를 조회
router.get("/:id", async(req:Request,res:Response,next:NextFunction) => {
    notificationController.accessAlertsCnt(req, res, next)
})




export default router;


