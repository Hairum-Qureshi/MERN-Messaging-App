import { useState } from "react";
import ConversationComponent from "./Conversation";
import LeftPanel from "./panels/LeftPanel";
import UserInfoPanel from "./panels/UserInfoPanel";
import { Conversation, ShortUser, SocketData } from "../../interfaces";
import useSocketIO from "../../hooks/useSocketIO";
import useAuthContext from "../../contexts/authContext";

// TODO - make it so that depending on what chat ID is in the URL, it opens up to that chat

export default function Chat() {
	const [showPanel, hidePanel] = useState(false);
	const [selectedConversation, setSelectedConversation] =
		useState<Conversation>();

	function toggleInfoPanel() {
		hidePanel(!showPanel);
	}

	function retrieveSelectedContact(conversation: Conversation) {
		setSelectedConversation(conversation);
	}

	const { activeUsers } = useSocketIO();

	function checkIfActive() {
		return activeUsers.some((activeUser: SocketData) => {
			return selectedConversation?.members.some((user: ShortUser) => {
				return activeUser.user_id === user._id;
			});
		});
	}

	const { userData } = useAuthContext()!;

	console.log(selectedConversation);

	return (
		<div className="w-full bg-gray-900 h-screen text-white flex">
			<LeftPanel retrieveSelectedContact={retrieveSelectedContact} />
			<div className="w-full flex">
				{!selectedConversation ? (
					<div className="p-5">
						<h1 className="text-slate-400 text-4xl m-28 font-semibold">
							Select a contact to begin sending a message. If you don't have any
							contacts, add a user by their shareable user ID. This can be found
							in the settings page by clicking the gear icon.
						</h1>
					</div>
				) : (
					<>
						{selectedConversation.members.map((userContact: ShortUser) =>
							userContact._id !== userData?._id ? (
								<ConversationComponent
									key={userContact._id}
									toggleInfoPanel={toggleInfoPanel}
									userContact={userContact}
									activity_status={checkIfActive}
								/>
							) : null
						)}
						{showPanel && <UserInfoPanel />}
					</>
				)}
			</div>
		</div>
	);
}
