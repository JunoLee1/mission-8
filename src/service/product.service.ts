import prisma from "../lib/prisma.js";
import type { ProductQueryDTO, productDTO } from "../dto/product.dto.js";
import { PrismaClient } from "@prisma/client";

export class ProductService {
  private prisma: PrismaClient; // ← 필드 선언
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient; //  ← 생성자에서 초기화
  }
  // ------- 공용
  async findItemById(id: number) {
    const result = await prisma.product.findUnique({
      where: { id },
    });
    return result;
  }

  // --------
  async accessListProduct(query: ProductQueryDTO) {
    const { page, take, name, description, keyword } = query;
    const skip = (page - 1) * take;
    const whereCondition = keyword
      ? {
          OR: [
            { name: { contains: keyword } },
            { description: { contains: keyword } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
      skip,
      take,
      where: whereCondition,
      include: {
        productTags: {
          include: {
            tag: true,
          },
        },
        comment: true,
      },
    });
    const result = products.map((p) => ({
      ...p,
      tags: p.productTags.map((pt) => pt.tag),
      comments: p.comment,
    }));
    return result;
  }

  async accessProduct(id: number) {
    const result = await this.findItemById(id);

    if (!result) throw new Error("해당 아이템이 존재 하지않습니다.");
    return result;
  }

  async createProduct(userId: number, element: productDTO) {
    const { name, description, price, ownerId, productTags } = element;

    const data: any = {
      name,
      description,
      price,
      ownerId: userId,
    };

    if (productTags && productTags.length > 0) {
      data.productTags = {
        create: productTags.map((tagId) => ({
          tag: { connect: { id: tagId } }, // 단순 tagId 연결
        })),
      };
      const productData = await prisma.product.create({
        ...data,
      });
      return productData;
    }
  }

  async modifyProduct(userId: number, element: productDTO) {
    const { id, name, description, price, ownerId, productTags } = element;

    const idNum = Number(id);
    const product = await this.findItemById(idNum);
    if (!product) throw new Error("해당 제품은 존재 하지않습니다");

      if(product.ownerId !== userId){
        throw new Error("Unathorized")
    }
    const data: any = {
      name,
      description,
      price,
      ownerId:userId
    };

    if (productTags && productTags.length > 0) {
      data.productTags = {
        create: productTags.map((tagId) => ({
          tag: { connect: { id: tagId } },
        })),
      };
    }

    const result = await prisma.product.update({
      where: { id },
      ...data,
    });
    return result;
  }

  async deleteProduct(id:number, userId:number){

    const product = await this.findItemById(id)
    if(!product) throw new Error("해당 제품은 존재 하지않습니다.")
    
    if(product.ownerId !== userId){
        throw new Error("Unathorized")
    }
    const result = await prisma.product.delete({
        where:{id}
    })
    return result
  }
}
