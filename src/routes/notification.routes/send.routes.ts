import express from "express";
import type { Request,Response, NextFunction } from "express";
import { NotificationController } from "controller/notification.controller.js";
const router = express.Router()
const notificationController = new NotificationController()

// 알림 전송
router.post("/", async(req:Request, res:Response,next:NextFunction)=> {
    notificationController.alertSend(req, res, next)
    })

export default router