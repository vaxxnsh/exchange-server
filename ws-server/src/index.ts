import { WebSocketServer, WebSocket} from "ws";
import { UserManager } from "./UserManager";

const wss = new WebSocketServer({ port: 3001 });

console.log("WebSocket server started on Port : 3001");

wss.on("connection", (ws : WebSocket) => {
    UserManager.getInstance().addUser(ws);
});