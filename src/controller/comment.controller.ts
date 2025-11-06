import { CommentService } from "../service/comment.service.js";
import type { Request, Response, NextFunction } from "express";
import type {
  CommentDTO,
  CommentPatchDTO,
} from "../dto/comment.dto.js";
import prisma from "../lib/prisma.js";

export class CommentController {
  private commentService: CommentService; // <- 초기화
  constructor() {
    this.commentService = new CommentService(prisma); // <- 공용 데이터
  }

  async accessCommentList(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, take, type } = req.query;
      const commentId = req.query.id;
      let safeType: "MARKET" | "ARTICLE" | undefined = undefined;
      if (type === "MARKET" || type === "ARTICLE") safeType = type;
      const elements = {
        id: Number(commentId),
        page: Number(page ?? 1),
        take: Number(take ?? 10),
        type: safeType ?? "MARKET",
      };
      const result = await this.commentService.accessCommentList(elements);
      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async accessComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = Number(req.params.id);
      const result = await this.commentService.accessComment(commentId);

      res.status(200).json({
        data:result
      })
    } catch (error) {
      next(error);
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      if (!userId) throw new Error("unathurized"); // 401
      const { content, title, name, type, productId, articleId } = req.body;
      if (!productId && !articleId)
        throw new Error("productId 또는 articleId 중 하나는 반드시 필요합니다");

      const elements: CommentDTO = {
        type: type === "MARKET" || type === "ARTICLE" ? type : undefined,
        name: String(name ?? ""),
        content: String(content ?? ""),
        title: String(title ?? ""),
        userId,
        productId,
        articleId,
      };
      const result = await this.commentService.createComment(elements);
      res.status(201).json({
        data:result
      })
    } catch (error) {
      next(error);
    }
  }

  async modifyComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("unauthorized"); // 401
      const commentId = Number(req.params.id);
      const { content, title, } = req.body;
      const elements: CommentPatchDTO = {
        id: commentId,
        content: String(content ?? ""), 
        title: String(title ?? ""),
        userId,
      };
      const result = await this.commentService.modifyComment(userId, elements);
      res.status(200).json({
        data:result
      })
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = Number(req.user?.id)
        if(!userId) throw new Error("unauthorized") // 401
        const commentId =  Number(req.query.id)
        const result = await this.commentService.deleteComment(commentId)
        res.status(200).json()
    } catch (error) {
      next(error);
    }
  }
}
