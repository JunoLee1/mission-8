export interface IUserDTO {
    id: number     
    email?: string,
    nickname?: string ,
    password?: string, 
    createdAt?: Date,       
    updatedAt?: Date
}

export interface ChangePasswordDTO{
    newPassword:string,
    currentPassword:string,
}