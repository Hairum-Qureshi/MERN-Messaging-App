import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PendingFRBlock from "./IncomingFRBlock";
import useFriendRequest from "../../../../../hooks/useFriendRequest";
import { FriendRequest } from "../../../../../interfaces";

interface Props {
	updatePageStatus: (page: string) => void;
}

export default function FriendRequest({ updatePageStatus }: Props) {
	const { friendRequests } = useFriendRequest();

	return (
		<div className="border border-blue-500 h-screen w-1/3 bg-slate-800 flex flex-col">
			<div className="flex items-center">
				<div
					onClick={() => updatePageStatus("settings")}
					className="text-xl border w-1/3 border-white-400 p-1 bg-slate-500 rounded hover:cursor-pointer active:bg-slate-700 m-4"
				>
					<Link to="/conversations">
						<div className="flex items-center justify-center">
							<FontAwesomeIcon icon={faArrowLeft} />
							<span className="ml-2 text-lg">Go Back</span>
						</div>
					</Link>
				</div>
				<div
					onClick={() => updatePageStatus("pending_friend_requests")}
					className="text-xl border w-1/3 border-white-400 p-1 bg-blue-500 rounded hover:cursor-pointer active:bg-blue-700 m-4 ml-auto text-center"
				>
					<Link to="/conversations/friend-requests/pending">
						<span className="ml-2 text-lg">Pending FRs</span>
					</Link>
				</div>
			</div>
			<h1 className="text-2xl font-semibold m-3">
				Incoming Friend Requests ({friendRequests.length})
			</h1>
			<div className="flex-grow overflow-y-auto">
				{friendRequests.length > 0 ? (
					friendRequests.map((friendRequest: FriendRequest) => {
						return (
							<PendingFRBlock
								friendRequest={friendRequest}
								key={friendRequest._id}
							/>
						);
					})
				) : (
					<div className="p-5 text-xl text-slate-400 font-semibold text-center">
						<h1>
							It's lonely here! Check back later when you have a friend request
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}
