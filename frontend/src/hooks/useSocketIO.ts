import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import useAuthContext from "../contexts/authContext";
import { SocketData, SocketTools } from "../interfaces";

const socket_io = io("http://localhost:3000", { autoConnect: false });

export default function useSocketIO(): SocketTools {
	const [activeUsers, setActiveUsers] = useState<SocketData[]>([]);
	const { userData } = useAuthContext()!;
	const socket = useRef<Socket>(socket_io);

	useEffect(() => {
		socket.current.connect();

		// Listen for the 'connect' event to log the socket ID
		socket.current.on("connect", () => {
			socket.current.emit("add-active-user", userData?._id);

			socket.current.on("get-active-users", (onlineUsers: SocketData[]) => {
				const filteredOnlineUsers: SocketData[] = onlineUsers.filter(
					(socketData: SocketData) => socketData.user_id !== userData?._id
				);

				setActiveUsers(filteredOnlineUsers);
			});
		});

		// Cleanup function to disconnect the socket when the component unmounts
		return () => {
			socket.current.disconnect();
		};
	}, [userData]);

	// useEffect(() => {
	// 	socket.current.on("get-active-users", (onlineUsers: SocketData[]) => {
	// 		const filteredOnlineUsers: SocketData[] = onlineUsers.filter(
	// 			(socketData: SocketData) => socketData.user_id !== userData?._id
	// 		);

	// 		setActiveUsers(filteredOnlineUsers);
	// 	});
	// }, []);

	return { activeUsers };
}
