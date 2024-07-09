import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShortUser } from "../../interfaces";

interface Props {
	toggleInfoPanel: () => void;
	userContact: ShortUser;
	activity_status: () => boolean;
}

export default function Conversation({
	toggleInfoPanel,
	userContact,
	activity_status
}: Props) {
	return (
		<>
			<div className="border relative border-blue-500 w-full">
				<div className="p-2 border bg-slate-800 border-blue-500 w-full flex items-center">
					<img
						src={userContact.profile_picture}
						alt="Profile Picture"
						className="w-8 h-8 rounded-md object-cover border border-blue-400 mx-2"
					/>
					<div className="flex items-center">
						<h1 className="text-white">{userContact.full_name}</h1>
						{activity_status() ? (
							<>
								<img
									src="https://media.tenor.com/yjOrdcOkLPUAAAAi/green-dot.gif"
									alt="Animated Online Activity Status"
									className="w-5 h-5 object-cover ml-2"
								/>
								<span className="text-green-500 text-sm ml-1">Online</span>
							</>
						) : (
							<div className="w-2 h-2 flex items-center rounded-full bg-red-600 ml-2">
								<span className="text-red-500 text-sm ml-4">Offline</span>
							</div>
						)}
					</div>
					<div
						className="flex ml-auto mx-2 text-lg hover:cursor-pointer"
						onClick={toggleInfoPanel}
					>
						<FontAwesomeIcon icon={faCircleInfo} />
					</div>
				</div>
				<div className="w-full absolute bottom-0 p-0 m-0 border border-blue-400">
					<div className="flex flex-col">
						<textarea
							className="w-full p-2 box-border bg-slate-700 border-none border-2 border-gray-600 resize-none text-small outline-none"
							placeholder={`Enter a message to ${userContact.full_name}`}
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
}
