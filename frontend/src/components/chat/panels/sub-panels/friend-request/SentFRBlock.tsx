import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SentFriendRequest } from "../../../../../interfaces";

interface Props {
	sentFriendRequest: SentFriendRequest;
}

export default function SentFRBlock({ sentFriendRequest }: Props) {
	return (
		<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
			<div className="flex items-center">
				<img
					src={sentFriendRequest.receiver.profile_picture}
					alt="User Pfp"
					className="w-12 h-12 object-cover rounded-md border border-blue-400"
				/>
				<div className="text-base ml-3">
					<h1 className="text-slate-300 text-sm">
						{sentFriendRequest.receiver.full_name}
					</h1>
					<p className="text-xs text-blue-500 font-semibold">
						{sentFriendRequest.receiver.status_update}
					</p>
				</div>

				<div className="text-xl text-white ml-auto w-10 text-center bg-red-600 p-1 border rounded-full hover:cursor-pointer hover:bg-red-700 active:bg-red-500">
					<FontAwesomeIcon icon={faBan} />
				</div>
			</div>
		</div>
	);
}
