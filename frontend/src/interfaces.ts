export interface User {
	_id: string;
	profile_picture: string;
	full_name: string;
	email: string;
	status_update?: string;
	biography: string;
	blocked_users: string[];
}

export interface AuthContextProps {
	children: React.ReactNode;
}

export interface ContextData {
	userData: User | null;
	error: string | null;
	signOut: () => void;
}
