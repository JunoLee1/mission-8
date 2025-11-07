import express from "express";
import type { Request,Response, NextFunction } from "express";
import { NotificationController } from "controller/notification.controller.js";


const router = express.Router()
const notificationController = new NotificationController()

router.patch("/:id",async( req:Request,res: Response, next:NextFunction) => {
    notificationController.modifyStatus(req, res, next)
})

export default router