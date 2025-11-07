export interface NotificationDTO {
    id: number,
    device: "web" | "ios" |"android",
    type: "unread" | "read",
    content:  string,           
    createdAt: Date,
    receiverId: number,
    senderId:  number
}

export interface NotificationQuery{
    page: number,
    take: number,
    device: "web" | "ios" |"android",
    type: "unread" | "read",
}