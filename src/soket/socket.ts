import WebSocket, { WebSocketServer } from "ws";
import http from "http";

type NotificationPayload =
  | {
      type: "like";
      articleId?: number;
      userId: number;
      likerName: string; // 좋아요 누른 사람
      productId?: number;
      message: string;
    }
  | {
      type: "new_comment";
      articleId?: number;
      userId: number;
      productId?: number;
      commenter: string; // 댓글 단 사람
      message: string;
    }
  | {
      type: "changed_price";
      productId: number;
      price: number;
      message: string;
    };
type WebSocketMessage =
  | { type: "ping" }
  | { type: "pong" }
  | { type: "notification"; payload: NotificationPayload };

export class setupWebSocket {
  private wss: WebSocketServer; // <- 
  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server }); // <- 초기화
    this.setupEvents();
  }

  private setupEvents() {
    this.wss.on("connection", (ws: WebSocket) => {
      ws.on("message", (rawData) => {
        this.handleClientMessage(ws, rawData);
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });

    this.wss.on("error", (error) => {
      console.error("error", error);
    });
  }

  private handleClientMessage(ws: WebSocket, rawData: WebSocket.RawData) {
    let message: WebSocketMessage;
    try {
      message = JSON.parse(rawData.toString()) as WebSocketMessage;
    } catch (error) {
      console.error("JSON parse error:", error);
      return;
    }

    switch (message.type) {
      case "ping":
        ws.send(JSON.stringify({ type: "pong" })); // 통신 연결 
        break;

      case "notification":
        switch (message.payload.type) {
          case "like":
          case "new_comment":
          case "changed_price":
            for (const client of this.wss.clients) {
              client.send(JSON.stringify(message));
            }
            break;

          default:
            console.error("Unknown notification type:", message.payload );
            break;
        }
        break; // 🔹 notification switch 끝나면 꼭 break

      default:
        console.error("Invalid message type:", message.type);
        break;
    }
  }
}
