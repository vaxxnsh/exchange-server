import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws : WebSocket) => {
    // UserManager.getInstance().addUser(ws);
});