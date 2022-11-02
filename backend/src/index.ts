import dotenv from "dotenv"
import { WebSocketServer } from "ws"

dotenv.config();

interface SocketMessage {
  event: "message" | "connection";
}

const port = Number(process.env.PORT) ?? 8080;
const wss = new WebSocketServer({ port }, () => console.log("server started on 8080"))

wss.on('connection', function connection(ws) {
    ws.on('message', function (rawMessage) {
        const message = JSON.parse(rawMessage.toString()) as SocketMessage;
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message: SocketMessage) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

