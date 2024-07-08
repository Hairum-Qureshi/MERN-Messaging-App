import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import useAuthContext from "../contexts/authContext";
import { FriendRequest, SocketData, SocketTools } from "../interfaces";

const socket_io = io("http://localhost:3000", { autoConnect: false });

export default function useSocketIO(): SocketTools {
	const [activeUsers, setActiveUsers] = useState<SocketData[]>([]);
	const { userData } = useAuthContext()!;
	const socket = useRef<Socket>(socket_io);
	const [incomingFriendRequest, setIncomingFriendRequest] =
		useState<FriendRequest>();

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

		socket.current.on(
			"receive-friend-request",
			(friendRequestData: FriendRequest) => {
				setIncomingFriendRequest(friendRequestData);
				// setIncomingFriendRequest(prev => [friendRequestData, ...prev]);
				return () =>
					socket?.current && socket?.current.off("receive-friend-request");
			}
		);
		// Cleanup function to disconnect the socket when the component unmounts
		return () => {
			socket.current.disconnect();
		};
	}, [userData]);

	function sendFriendRequestEvent(
		sender_uid: string,
		receiver_uid: string,
		sender_pfp: string,
		sender_name: string,
		sender_status: string
	) {
		if (socket.current.connected) {
			socket.current.emit("send-friend-request", {
				sender_uid,
				receiver_uid,
				sender_pfp,
				sender_name,
				sender_status
			});
		}
	}

	return { activeUsers, sendFriendRequestEvent, incomingFriendRequest };
}
