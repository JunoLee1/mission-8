
export interface productDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId: number;
}

export interface ProductQueryDTO {
  page: number;
  take: number;
  name: string;
  description: string;
  keyword: string;
}
