export interface NotificationDTO {
    id: number,
    type: "unread" | "read",
    content:  string,           
    createdAt: Date,
    receiverId: number,
    senderId:  number
}

export interface NotificationQuery{
    page: number,
    take: number,
    type: "unread" | "read",
}