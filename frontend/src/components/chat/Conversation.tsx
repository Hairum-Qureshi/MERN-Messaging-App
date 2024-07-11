import {
	faCircleInfo,
	faFaceSmile,
	faFilm,
	faImage
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShortUser } from "../../interfaces";
import { useRef, useState } from "react";

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
	const divRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState("");

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" && !event.shiftKey && divRef.current) {
			event.preventDefault();
			const currentMessage = divRef.current.innerText.trim();
			if (!currentMessage) {
				alert("You can't send an empty text");
			} else {
				setMessage("");
			}
		}
	};

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
					<div className="w-full absolute bottom-0 p-0 m-0 border border-blue-400">
						<div className="flex flex-col h-full">
							<div className="flex bg-slate-700 h-full">
								<div
									ref={divRef}
									className="w-full max-h-16 flex-grow overflow-y-auto p-2 box-border outline-none bg-slate-700 text-small"
									contentEditable={"plaintext-only"}
									onInput={() => setMessage(divRef.current.innerText)} // Update message state on input
									onKeyDown={handleKeyDown}
								/>
								<div className="text-2xl ml-auto p-1">
									<FontAwesomeIcon icon={faFaceSmile} className="mr-2" />
									<FontAwesomeIcon icon={faImage} />
									<FontAwesomeIcon icon={faFilm} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
