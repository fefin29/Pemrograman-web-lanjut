import CONFIG from "../config";
import NotificationHelper from "./notification-helper";

const WebSocketInitiator = () => {
    const webSocket = new WebSocket(CONFIG.WEB_SOCKET_SERVER);
    webSocket.onmessage = message => {
        console.log(message.data)

        const movie = JSON.parse(message.data)
        NotificationHelper.sendNotification({
            title: `${movie.title} is on cinema!`,
            options: {
                body: movie.overview,
                image: `${CONFIG.BASE_IMAGE_URL + movie.poster_path}`,
            },
        })
    }
}

export default WebSocketInitiator;
