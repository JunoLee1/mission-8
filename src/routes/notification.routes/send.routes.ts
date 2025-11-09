import express from "express";
import type { Request,Response, NextFunction } from "express";
import { NotificationController } from "controller/notification.controller.js";
import { validateBody} from "../../middleWare/validateMiddle.js";
import {bodySchema }  from "../../validation/notification.validation.js"
import passport from "passport";

const router = express.Router()
const notificationController = new NotificationController()

// 알림 전송
router.post("/",
    passport.authenticate("local",{session:false}), 
    validateBody(bodySchema),
    async(req:Request, res:Response,next:NextFunction)=> {
    return notificationController.alertSend(req, res, next)
    })

export default router