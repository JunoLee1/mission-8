import type { Request, Response, NextFunction } from "express";
import express from "express"

const router = express.Router()


// 댓글 리스트 및 댓글 조회 
router.get("/",async(req:Request, res:Response, next:NextFunction)=>{
    // commentController.accessCommentList(req, res, next)
})


router.get("/:id",async(req:Request, res:Response, next:NextFunction)=>{
    // commentController.accessComment(req, res, next)
})

// 회원만 댓글 생성/ 수정/ 삭제 가능
router.post("/",async(req:Request, res:Response, next:NextFunction)=>{
    // commentController.createComment(req, res, next)
})


router.patch("/:id",async(req:Request, res:Response, next:NextFunction)=>{
    // commentController.modifyComment(req, res, next)
})


router.delete("/:id",async(req:Request, res:Response, next:NextFunction)=>{
    // commentController.deleteComment(req, res, next)
})


export default router;