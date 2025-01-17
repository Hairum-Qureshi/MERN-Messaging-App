import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGear,
	faInbox,
	faMagnifyingGlass,
	faPenToSquare,
	faPlus,
	faUser,
	faX
} from "@fortawesome/free-solid-svg-icons";
import DMRequests from "./sub-panels/dms/DMRequests";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./sub-panels/Settings";
import useAuthContext from "../../../contexts/authContext";
import ContactBlock from "../ContactBlock";
import { Conversation, ShortUser } from "../../../interfaces";
import useSocketIO from "../../../hooks/useSocketIO";
import FriendRequest from "./sub-panels/friend-request/IncomingFriendRequest";
import SentFriendRequest from "./sub-panels/friend-request/SentFriendRequest";
import useFriendRequest from "../../../hooks/useFriendRequest";
import useConversation from "../../../hooks/useConversation";
import useSettings from "../../../hooks/useSettings";

// TODO
// Design the DM Requests layout
// Add a delete button for each contact
// Add a settings button
//	--> within settings:
//		- add a count of how many friends and contacts the user has
//		- add the ability for users to change their profile pictures
// The delete feature:
// --> if a user deletes a conversation between another user, it removes them from the array of 'members'
//		--> if the other user sends a message in the conversation, it re-adds the other user and therefore will show up for them

// TODO - make sure you implement the logic for showcasing the user's live status update in the UserInfoPanel component also

interface Props {
	retrieveSelectedContact: (contact: Conversation) => void;
}

export default function LeftPanel({ retrieveSelectedContact }: Props) {
	const [DMRequestSelected, setDMRequestSelected] = useState(false);
	const [settingsPage, setSettingsPage] = useState(false);
	const [frPage, setFRPage] = useState(false);
	const [addUserMode, setAddUserMode] = useState(false);
	const [pendingFRPage, setPendingFRPage] = useState(false);
	const [enteredUID, setEnteredUID] = useState("");

	const { userData } = useAuthContext()!;
	const { sendFriendRequest } = useFriendRequest();
	const { conversations } = useConversation();
	const { checkCurrentUserStatusUpdate } = useSettings();
	const { activeUsers, statusUpdateData } = useSocketIO();
	const { conversationData } = useConversation();

	function updatePageStatus(page: string) {
		page === "dm_request"
			? setDMRequestSelected(false)
			: page === "settings"
			? setSettingsPage(false)
			: "friend_request"
			? setFRPage(false)
			: setPendingFRPage(false);
	}

	return !settingsPage && !DMRequestSelected && !frPage && !pendingFRPage ? (
		<div className="border border-blue-500 h-screen w-1/3 bg-slate-800">
			<div className="w-full h-24 bg-slate-800 relative">
				<div className="m-3">
					<div className="flex items-center">
						<img
							src={userData?.profile_picture}
							alt="Pfp"
							className="w-12 h-12 object-cover rounded-md border border-blue-400"
						/>
						<div className="text-base ml-3">
							<h1 className="text-slate-300 text-sm">{userData?.full_name}</h1>
							<p className="text-xs text-purple-400 font-semibold ">
								{statusUpdateData && statusUpdateData.length > 0
									? checkCurrentUserStatusUpdate() ||
									  userData?.status_update ||
									  "Insert some wacky user status here!"
									: userData?.status_update}
							</p>
						</div>
						<div className="text-xl ml-auto border border-pink-400 rounded p-1 w-10 text-center bg-pink-800 hover:cursor-pointer active:bg-pink-600">
							<div onClick={() => setSettingsPage(true)}>
								<FontAwesomeIcon icon={faGear} />
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between mb-2 absolute bottom-0 left-2 right-2">
					<h1 className="text-2xl font-semibold">Your Conversations</h1>
					<div className="flex-grow"></div>
					{!addUserMode ? (
						<FontAwesomeIcon
							icon={faPenToSquare}
							className="text-xl border border-blue-400 p-1 bg-blue-800 rounded mr-3 hover:cursor-pointer active:bg-blue-700"
							onClick={() => setAddUserMode(true)}
						/>
					) : (
						<FontAwesomeIcon
							icon={faX}
							className="text-xl border border-red-400 p-1 bg-red-800 rounded mr-3 hover:cursor-pointer active:bg-red-700 w-5"
							onClick={() => setAddUserMode(false)}
						/>
					)}
					<div className="text-xl border border-orange-400 p-1 bg-yellow-600 rounded hover:cursor-pointer active:bg-orange-700 mr-3">
						<FontAwesomeIcon
							icon={faUser}
							onClick={() => setFRPage(true)}
							className="flex items-center justify-center"
						/>
					</div>
					<div className="text-xl border border-green-400 p-1 bg-green-800 rounded hover:cursor-pointer active:bg-green-700">
						<FontAwesomeIcon
							icon={faInbox}
							onClick={() => setDMRequestSelected(true)}
							className="flex items-center justify-center"
						/>
					</div>
				</div>
			</div>
			<div className="w-full p-2 border border-blue-500 bg-slate-900 h-12 text-slate-300 flex items-center">
				{!addUserMode ? (
					<>
						<input
							type="text"
							placeholder="Search user"
							className="bg-slate-900 w-full outline-none p-2"
							// className="w-full p-2 border border-blue-500 outline-none bg-slate-900 h-12 text-slate-300"
						/>
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							className="text-xl text-white hover:cursor-pointer"
						/>
					</>
				) : (
					<>
						<input
							type="text"
							placeholder="Add user by ID"
							className="bg-slate-900 w-full outline-none p-2"
							value={enteredUID}
							onChange={e => setEnteredUID(e.target.value)}
						/>
						<FontAwesomeIcon
							icon={faPlus}
							className="text-lg text-white rounded-lg border border-green-400 p-1 w-5 bg-green-800 hover:cursor-pointer active:bg-green-900"
							onClick={() => {
								sendFriendRequest(enteredUID);
								setEnteredUID("");
							}}
						/>
					</>
				)}
			</div>
			<div className="w-full h-4/5 overflow-auto">
				{conversations.length === 0 ? (
					<div className="p-5 text-xl text-slate-400 font-semibold text-center">
						<h1>
							You currently have no contacts. Send a DM request by clicking the
							blue 'create conversation' button!
						</h1>
					</div>
				) : (
					conversations.map((conversation: Conversation) =>
						conversation.members.map(
							(contactData: ShortUser) =>
								contactData._id !== userData?._id && (
									<Link
										to={`/conversations/${conversation._id}`}
										onClick={() => retrieveSelectedContact(conversation)}
									>
										<ContactBlock
											contactData={contactData}
											activeUsers={activeUsers}
											latestMessage={conversation.latestMessage}
											statusUpdateData={statusUpdateData}
											key={conversation._id}
										/>
									</Link>
								)
						)
					)
				)}
			</div>
		</div>
	) : DMRequestSelected ? (
		<DMRequests updatePageStatus={updatePageStatus} />
	) : settingsPage ? (
		<Settings updatePageStatus={updatePageStatus} />
	) : frPage ? (
		<FriendRequest updatePageStatus={updatePageStatus} />
	) : (
		<SentFriendRequest updatePageStatus={updatePageStatus} />
	);
}
