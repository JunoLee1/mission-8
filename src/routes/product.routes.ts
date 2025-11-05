import express from "express";
import type{Request, Response, NextFunction} from "express"


const router = express.Router();


// API : 상품 데이터 리스트 조회
router.get("/",async(req:Request, res: Response, next:NextFunction) =>{
    //productService.AccessListProduct(req, res, next)
})


// API : 상품 데이터 조회
router.get("/:id",async(req:Request, res: Response, next:NextFunction) =>{
    //productService.AccessProduct(req, res, next)
})


// API : 상품 데이터 생성
router.post("/",async(req:Request, res: Response, next:NextFunction) =>{
    //productService.createProduct(req, res, next)
})


// API : 상품 정보 수정
router.patch("/:id",async(req:Request, res: Response, next:NextFunction) =>{
    //productService.modifyProduct(req, res, next)
})


// API : 상품 삭제
router.delete("/:id",async(req:Request, res: Response, next:NextFunction) =>{
    //productService.deleteProduct(req, res, next)
})

export default router;// router 만 내보내기
