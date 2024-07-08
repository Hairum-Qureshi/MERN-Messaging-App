import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FriendRequest } from "../../../../../interfaces";

interface Props {
	friendRequest: FriendRequest;
}

export default function PendingFRBlock({ friendRequest }: Props) {
	return (
		<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
			<div className="flex items-center">
				<img
					src={friendRequest.sender.profile_picture}
					alt="Pfp"
					className="w-12 h-12 object-cover rounded-md border border-blue-400"
				/>
				<div className="text-base ml-3">
					<h1 className="text-slate-300 text-sm">
						{friendRequest.sender.full_name}
					</h1>
					<p className="text-xs text-blue-500 font-semibold">
						{friendRequest.sender.status_update}
					</p>
				</div>
				<div className="ml-auto text-xl text-white w-10 text-center bg-green-600 p-1 border rounded-full hover:cursor-pointer hover:bg-green-700 active:bg-green-500">
					<FontAwesomeIcon icon={faCheck} />
				</div>
				<div className="text-xl text-white ml-2 w-10 text-center bg-red-600 p-1 border rounded-full hover:cursor-pointer hover:bg-red-700 active:bg-red-500">
					<FontAwesomeIcon icon={faBan} />
				</div>
			</div>
		</div>
	);
}
