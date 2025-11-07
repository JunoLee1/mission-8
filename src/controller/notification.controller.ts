import type { Request, Response, NextFunction } from "express";

export class NotificationController{
    async accessAlerts(req:Request, res:Response, next: NextFunction){
        const {page , type, take} = req.query;
        const user = Number(req.user?.id) 
        if(!user) throw new Error("Unathorized") // 401

        
    }


    async accessAlertsCnt(req:Request, res:Response, next:NextFunction){
        
    }

    async alertSend(req:Request, res:Response, next:NextFunction){

    }

    async modifyStatus(req:Request, res:Response, next:NextFunction){

    }

}