import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SentFRBlock from "./SentFRBlock";

interface Props {
	updatePageStatus: (page: string) => void;
}

export default function PendingFriendRequest({ updatePageStatus }: Props) {
	return (
		<div className="border border-blue-500 h-screen w-1/3 bg-slate-800 flex flex-col">
			<div
				onClick={() => updatePageStatus("pending_friend_request")}
				className="text-xl border w-1/3 border-white-400 p-1 bg-slate-500 rounded hover:cursor-pointer active:bg-slate-700 m-4"
			>
				<Link to="/conversations">
					<div className="flex items-center justify-center">
						<FontAwesomeIcon icon={faArrowLeft} />
						<span className="ml-2 text-lg">Go Back</span>
					</div>
				</Link>
			</div>

			<h1 className="text-2xl font-semibold m-3">
				Your Pending Friend Requests
			</h1>
			<div className="flex-grow overflow-y-auto">
				<SentFRBlock />
			</div>
		</div>
	);
}
