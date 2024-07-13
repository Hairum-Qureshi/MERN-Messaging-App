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

export interface ShortUser {
	_id: string;
	profile_picture: string;
	biography?: string;
	full_name: string;
	status_update?: string;
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

export interface StatusUpdateData {
	status: string;
	poster_uid: string;
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

export interface MessageBody {
	_id: string;
	sender_id: string;
	sender_fullName: string;
	sender_pfp: string;
	conversation_ID: string;
	message_content: string;
	createdAt: string;
	receiver_uid: string;
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
	shareStatusUpdate: (status: string, poster_uid: string) => void;
	statusUpdateData: StatusUpdateData[];
	sendMessageEvent: (
		_id: string,
		sender_id: string,
		sender_fullName: string,
		sender_pfp: string,
		conversation_ID: string,
		message_content: string,
		createdAt: string,
		receiver_uid: string
	) => void;
	incomingMessage: MessageBody | undefined;
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

export interface Conversation {
	_id: string;
	groupChatName?: string;
	isGroupChat?: boolean;
	members: [
		{
			_id: string;
			full_name: string;
			profile_picture: string;
		}
	];
	latestMessage: string;
	groupChatPhoto?: string;
}

export interface Media {
	conversation_ID: string;
	images_data: string[];
}

export interface Message {
	_id: string;
	sender: {
		_id: string;
		full_name: string;
		profile_picture: string;
	};
	conversation_ID: string;
	content: string;
	createdAt: string;
	receiver_uid: string;
}
