import express from "express";
import type{Request, Response, NextFunction} from "express"
import { ProductController } from "../controller/product.controller.js";
import {productIdSchema,createProductSchema, PatchProductSchema, accessListProductSchema} from"../validation/product.validation.js"
import {validateParam,validateBody, validateQuery} from"../middleWare/validateMiddle.js"
import passport from "passport";


const productController=  new ProductController
const router = express.Router();


// API : 상품 데이터 리스트 조회
router.get("/",
    validateQuery(accessListProductSchema),
    async(req:Request, res: Response, next:NextFunction) =>{
    productController.accessListProduct(req, res, next)
})


// API : 상품 데이터 조회
router.get("/:id",
    validateParam(productIdSchema),
    async(req:Request, res: Response, next:NextFunction) =>{
    productController.accessProduct(req, res, next)
})


// API : 상품 데이터 생성
router.post("/",
    passport.authenticate("local",{session:false}),
    validateBody(createProductSchema),
    async(req:Request, res: Response, next:NextFunction) =>{
    productController.createProduct(req, res, next)
})


// API : 상품 정보 수정
router.patch("/:id",
    passport.authenticate("local",{session:false}),
    validateBody(PatchProductSchema),
    async(req:Request, res: Response, next:NextFunction) =>{
    productController.modifyProduct(req, res, next)
})


// API : 상품 삭제
router.delete("/:id",
    passport.authenticate("local",{session:false}),
    async(req:Request, res: Response, next:NextFunction) =>{
    productController.deleteProduct(req, res, next)
})

export default router;// router 만 내보내기
