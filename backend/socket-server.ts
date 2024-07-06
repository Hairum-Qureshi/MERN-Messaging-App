import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

interface SocketData {
	user_id: string;
	socket_id: string;
}

let onlineUsers: SocketData[] = [];

function addUser(user_id: string, socket_id: string) {
	if (!onlineUsers.some((user: SocketData) => user.user_id === user_id)) {
		onlineUsers.push({ user_id, socket_id });
	}

	return;
}

function removeUser(user_id: string) {
	onlineUsers = onlineUsers.filter(
		(user: SocketData) => user.user_id !== user_id
	);
}

function getUser(user_id: string): SocketData {
	return onlineUsers.find((user: SocketData) => user.user_id === user_id)!;
}

const initializeSocket = (server: HttpServer) => {
	const io = new IOServer(server, {
		cors: {
			origin: ["http://localhost:5173"]
		}
	});

	io.on("connection", (socket: Socket) => {
		console.log("A user connected", socket.id);

		socket.on("disconnect", () => {
			console.log("User disconnected", socket.id);
		});

		// Add your socket event listeners here
		socket.on("sendMessage", message => {
			console.log("Message received:", message);
			io.emit("message", message);
		});
	});

	return io;
};

export default initializeSocket;
