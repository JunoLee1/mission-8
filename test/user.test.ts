import {describe, expect, test} from '@jest/globals';
import mockPrisma from './__mock__/prisma.js';
import mockData from './user.json' with { type: 'json' };
import { AuthService } from "../src/service/auth.service.js";
import bcrypt from "bcrypt"

jest.mock('../src/lib/generate_token',()=>({
  __esModule: true,
  generateToken:{
    refreshToken: "mock_refresh",
    accessToken: "mock_access",
  }
}));

jest.mock('../src/lib/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
  
}));


describe("AuthService test", () => {
    let authService: AuthService;


    const userId = 1
     beforeAll(() => {
        authService = new AuthService();
        jest.clearAllMocks();
        mockPrisma.user.findUnique.mockResolvedValue({// user create 결과 값
            userId: 1,
            email: mockData.tempUser1.email,
            password: "hashed_pw",
    });
  });

  
  it("should login a user", async () => {
    const { tempUser1 } = mockData;
    const result = await authService.login(userId,{
      email:tempUser1.email,
      password:tempUser1.password});
    expect(result).toHaveProperty("email", tempUser1.email);
    
    expect(result).toHaveProperty("refreshToken", "mock_refresh");
    expect(result).toHaveProperty("accessToken", "mock_access")
    
    expect(result).toHaveProperty("password",tempUser1.password)
  });
});