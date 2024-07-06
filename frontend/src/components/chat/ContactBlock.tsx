import { SocketData, User } from "../../interfaces";

interface Props {
	contactData: User;
	activeUsers: SocketData[];
}

/*
When a user clicks on a user's contact, you'll need to check if both users have each other as contacts.
	-> If they do, you'll need to somehow pass in the shared contact ID to the contact block so that way, when the user clicks on that user's contact, they can send a message

	-> If they do not, let's say User A sends User B a message. User B will receive User A's message as a DM request (and vice versa). For User A, it'll appear as a normal message conversation (maybe attach a header saying that your message is pending acceptance from User B). 
		--> You're going to need to think about what you'll do if User B accept User A's DM request because you'll want each DM to have a route parameter containing the chat ID.
			--> I've added a "contact_ID" property to the Conversation model and a ref to the Contact model too so that might help in retrieving necessary info
		--> either way, the DM -- request or not -- will need an ID
*/

export default function ContactBlock({ contactData, activeUsers }: Props) {
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
						<div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 m-1"></div>
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
						<i>No message sent</i>
					</p>
				</div>
			</div>
		</div>
	);
}
