export interface NotificationDTO {
    id: number,
    type: "unread" | "isRead",
    content:  string,           
    createdAt: Date,
    receiverId: number,
    senderId:  number
    category:  "NEW_COMMENT" | "NEW_LIKE" | "CHANGED_PRICE"
}

export interface NotificationQuery{
    page: number,
    take: number,
    type: "unread" | "isRead",
    category:  "NEW_COMMENT" | "NEW_LIKE" | "CHANGED_PRICE"
}