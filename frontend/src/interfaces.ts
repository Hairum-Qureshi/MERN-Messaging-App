export interface User {
	_id: string;
	profile_picture: string;
	full_name: string;
	email: string;
	status_update?: string;
	biography: string;
	blocked_users: string[];
	createdAt?: string;
}

export interface AuthContextProps {
	children: React.ReactNode;
}

export interface ContextData {
	userData: User | null;
	error: string | null;
	signOut: () => void;
}

export interface SocketData {
	user_id: string;
	socket_id: string;
}

export interface SocketTools {
	activeUsers: SocketData[];
	sendFriendRequestEvent: (
		sender_uid: string,
		receiver_uid: string,
		sender_pfp: string,
		sender_fullName: string,
		sender_statusUpdate: string
	) => void;
	incomingFriendRequest: FriendRequest | undefined;
}

export interface SentFriendRequest {
	// the data of the user whom you sent the friend request too
	_id: string;
	receiver: {
		_id: string;
		full_name: string;
		profile_picture: string;
		status_update?: string;
	};
}

export interface FriendRequest {
	// the data of the user whom sent you a friend request
	_id: string;
	sender: {
		_id: string;
		full_name: string;
		profile_picture: string;
		status_update?: string;
	};
}
