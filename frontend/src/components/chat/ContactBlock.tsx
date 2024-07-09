import { SocketData, ShortUser } from "../../interfaces";

interface Props {
	contactData: ShortUser;
	activeUsers: SocketData[];
	latestMessage: string;
}

export default function ContactBlock({
	contactData,
	activeUsers,
	latestMessage
}: Props) {
	function checkIfActive(user_id: string): boolean {
		return activeUsers.some((user: SocketData) => user.user_id === user_id);
	}

	return (
		<div
			className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300 hover:cursor-pointer active:bg-slate-950"
			key={contactData._id}
		>
			<div className="flex items-center">
				<div className="relative">
					<img
						src={contactData.profile_picture}
						alt="Pfp"
						className="w-12 h-12 object-cover rounded-md border border-blue-400"
					/>
					{checkIfActive(contactData._id) ? (
						// <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 m-1"></div>
						<img
							src="https://media.tenor.com/yjOrdcOkLPUAAAAi/green-dot.gif"
							alt="Animated Online Activity Status"
							className="w-5 h-5 object-cover absolute bottom-0 right-0 m-0"
						/>
					) : (
						<div className="w-3 h-3 rounded-full bg-red-500 absolute bottom-0 right-0 m-1"></div>
					)}
				</div>
				<div className="text-base ml-3">
					<h1 className="text-slate-300 text-sm">{contactData.full_name}</h1>
					<p className="text-xs text-blue-500">
						<b>{contactData.status_update}</b>
					</p>
					<p className="text-xs text-slate-400">
						<i>{latestMessage || "No message sent"}</i>
					</p>
				</div>
			</div>
		</div>
	);
}
