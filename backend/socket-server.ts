import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

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
