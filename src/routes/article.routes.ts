import type { Request, Response, NextFunction } from "express";
import express from "express";
import { ArticleController } from "../controller/article.controller.js";
import {querySchema,paramsSchema,bodySchema} from"../validation/article.validation.js";
import { validateQuery,validateParam,validateBody} from "../middleWare/validateMiddle.js";
const router = express.Router()
const articleController = new ArticleController()

//모든 사람이 게시글을 조회 할수 있음

router.get("/",
    validateQuery(querySchema),
    async(req:Request,res:Response,next:NextFunction)=>{
    articleController.accessArticleList(req, res, next)    
})


router.get("/:id",
    validateParam(paramsSchema),
    async(req:Request,res:Response,next:NextFunction)=>{
    articleController.accessArticle(req, res, next)
})


//회원만 게시글 업로드/ 수정/ 삭제 가능
router.post("/",
    validateBody(bodySchema),
    async(req:Request,res:Response,next:NextFunction)=>{
    articleController.createArticle(req, res, next)
})


router.patch("/:id",
    validateParam(paramsSchema),
    validateBody(bodySchema),
    async(req:Request,res:Response,next:NextFunction)=>{
    articleController.modifyArticle(req, res, next)
})


router.delete("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    articleController.deleteArticle(req, res, next)
})

export default router