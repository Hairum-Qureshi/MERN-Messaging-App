import {
	faCircleInfo,
	faFaceSmile,
	faFilm,
	faImage
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Message, ShortUser } from "../../interfaces";
import { useRef, useState } from "react";
import MessageBubble from "./Message";
import useConversation from "../../hooks/useConversation";
import useAuthContext from "../../contexts/authContext";

// TODO - need to auto scroll to the latest message

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
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isEmpty, setIsEmpty] = useState(true);

	const { sendMessage, chatMessages } = useConversation();
	const { userData } = useAuthContext()!;

	function userPasted(e: any) {
		// TODO - need to change 'any' to an appropriate type for 'e'
		// Function for handling when the user pastes an image into the content-edible div

		const image = e.clipboardData || window.Clipboard;
		const file = image.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const blob = new Blob([file], { type: file.type });
				const imageURL = URL.createObjectURL(blob);
				if (uploadedImages.length < 4) {
					setUploadedImages(prev => [...prev, imageURL]);
				} else {
					alert("You can only attach 4 images per message");
				}
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		}
	}

	function handleInput() {
		if (divRef.current) {
			setIsEmpty(divRef.current.innerText.trim() === "");
			setMessage(divRef.current.innerText);
		}
	}

	function delImage(imageURL: string) {
		const filteredImages: string[] = uploadedImages.filter(
			(image: string) => image !== imageURL
		);
		setUploadedImages(filteredImages);
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" && !event.shiftKey && divRef.current) {
			event.preventDefault();
			const currentMessage = divRef.current.innerText.trim();
			if (!currentMessage) {
				alert("You can't send an empty text");
			} else {
				sendMessage(message);
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
				<div className="overflow-auto h-5/6">
					{chatMessages.map((message: Message) => {
						return (
							<MessageBubble
								key={message._id}
								message={message}
								you={message.sender?._id === userData?._id}
							/>
						);
					})}
				</div>
				<div className="w-full absolute bottom-0 p-0 m-0 border border-blue-400">
					<div className="w-full absolute bottom-0 p-0 m-0 border border-blue-400">
						{uploadedImages.length > 0 && (
							<div className="flex justify-left bg-slate-800 w-full">
								{uploadedImages.map((imageURL: string, index: number) => (
									<div key={index} className="p-2 relative">
										<button
											className="absolute mt-1 right-4 text-2xl text-red-500 bg-red-900 rounded-md w-8 h-8 flex items-center justify-center"
											onClick={() => delImage(imageURL)}
										>
											✕
										</button>
										<img
											src={imageURL}
											alt="Uploaded Image"
											className="w-64 h-32 object-cover rounded-md border border-white"
										/>
									</div>
								))}
							</div>
						)}
						<div className="flex flex-col h-full">
							<div className="flex bg-slate-700 h-full">
								<div
									ref={divRef}
									className={`w-full max-h-16 flex-grow overflow-y-auto p-2 box-border outline-none bg-slate-700 text-small appearance-none ${
										isEmpty ? "placeholder" : ""
									}`}
									data-placeholder={`Type a message to ${userContact.full_name}. Hit the 'enter' key to send a message.`}
									contentEditable={"plaintext-only"}
									onInput={handleInput}
									onKeyDown={handleKeyDown}
									onPaste={e => userPasted(e)}
								/>
								<div className="text-2xl ml-auto p-1">
									{/* <input type="file" className="hidden" onClick = {} /> */}
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
