import {describe, expect, test} from '@jest/globals';
import mockMethod from './__mock__/prisma.js';
import mockData from './user.json' with { type: 'json' };
import { AuthService } from "../src/service/auth.service.js";
import bcrypt from "bcrypt"
import type { PrismaClient } from '@prisma/client/extension';


jest.mock('../src/lib/generate_token',()=>({
  __esModule: true,
  generateToken: jest.fn(() => ({
    refreshToken: "mock_refresh",
    accessToken: "mock_access",
  })),
}));

jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: mockMethod,
  
}));


describe("AuthService test", () => {
    let authService: AuthService;
    let mokePrisma: PrismaClient
    const userId = 1
  
     beforeAll(async () => {
        let authService = new AuthService(mokePrisma);
        const hashedPassword = await bcrypt.hash(mockData.tempUser1.password, 10)
        console.log(mockData.tempUser1.password)
        //jest.clearAllMocks();
        mockMethod.user.findUnique.mockResolvedValue({// user create 결과 값
            id: userId,
            email: mockData.tempUser1.email,
            password:hashedPassword
    });
  });

  
  it("should login a user", async () => {
    const { tempUser1 } = mockData;
    const result = await authService.login(userId,{
      email:tempUser1.email,
      password:tempUser1.password});
    expect(result).toHaveProperty("refreshToken", "mock_refresh");
    expect(result).toHaveProperty("accessToken", "mock_access");
  });
});