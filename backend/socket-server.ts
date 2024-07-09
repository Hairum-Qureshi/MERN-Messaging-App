import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";
import colors from "colors";

colors.enable();

interface SocketData {
	user_id: string;
	socket_id: string;
}

let onlineUsers: SocketData[] = [];

function addUser(user_id: string, socket_id: string) {
	if (
		user_id &&
		!onlineUsers.some((user: SocketData) => user.user_id === user_id)
	) {
		onlineUsers.push({ user_id, socket_id });
	}
}

function removeUser(socket_id: string) {
	onlineUsers = onlineUsers.filter(
		(socket_data: SocketData) => socket_data.socket_id !== socket_id
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
		console.log("A user connected!".cyan);

		socket.on("add-active-user", (user_id: string) => {
			addUser(user_id, socket.id);
			io.emit("get-active-users", onlineUsers);
		});

		socket.on(
			"send-friend-request",
			({
				sender_uid,
				receiver_uid,
				sender_pfp,
				sender_name,
				sender_status
			}) => {
				const receiverData: SocketData = getUser(receiver_uid);
				if (receiverData) {
					const friendRequest = {
						_id: receiver_uid,
						sender: {
							_id: sender_uid,
							full_name: sender_name,
							profile_picture: sender_pfp,
							status_update: sender_status
						}
					};
					socket
						.to(receiverData.socket_id)
						.emit("receive-friend-request", friendRequest);
				}
			}
		);

		socket.on("share-status-update", status_data => {
			const { status, poster_uid } = status_data;
			io.emit("receive-status-update", {
				status: status,
				poster_uid: poster_uid
			});
		});

		socket.on("disconnect", () => {
			console.log("A user disconnected".red);
			removeUser(socket.id);
			io.emit("get-active-users", onlineUsers);
		});
	});

	return io;
};

export default initializeSocket;
