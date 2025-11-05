import Express from 'express'; 
import {LoginDTO} from "../dto/auth.dto.ts"
declare global {
  namespace Express {
    interface User{
      id?: number,
      email: string|null,
      nickname :string | null,
      password: string | null,
    }
    interface Request {
      user?:IUserDTO
    }
  }
}
