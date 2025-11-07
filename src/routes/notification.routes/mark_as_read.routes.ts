import express from "express";
import type { Request,Response, NextFunction } from "express";
import { validateBody} from "../../middleWare/validateMiddle.js";
import {bodySchema}  from "../../validation/notification.validation.js"
import { NotificationController } from "controller/notification.controller.js";
import passport  from "passport";


const router = express.Router()
const notificationController = new NotificationController()

router.patch("/:id",
    passport.authenticate("local",{session:false}),
    validateBody(bodySchema),
    async( req:Request,res: Response, next:NextFunction) => {
        return notificationController.modifyStatus(req, res, next)
})

export default router