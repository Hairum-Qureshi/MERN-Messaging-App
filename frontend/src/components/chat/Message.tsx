import { useEffect, useRef } from "react";
import { Message } from "../../interfaces";
import moment from "moment";

// // !NOTE:
// // The last message image does not have a 'mr-2' class

interface Props {
	message: Message;
	you: boolean;
}

export default function Message({ message, you }: Props) {
	const messageRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [message]);

	return (
		<div className="w-full" ref={messageRef}>
			{!you ? (
				message.attachments.length === 0 ? (
					<div className="m-2 p-2">
						<div className="flex items-start">
							<img
								src={message.sender.profile_picture}
								className="w-10 h-10 object-cover rounded-md border border-blue-500"
								alt="User Profile Picture"
							/>
							<div className="ml-2 border border-blue-500 bg-blue-950 rounded-md p-2 text-sm flex flex-col">
								<p>{message.content}</p>
								<p className="text-xs text-right mt-1">
									Sent {moment(message.createdAt).fromNow()}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="m-2 p-2">
						<div className="flex items-start">
							<img
								src={message.sender.profile_picture}
								className="w-10 h-10 object-cover rounded-md border border-blue-500"
								alt="User Profile Picture"
							/>
							<div className="ml-2 border border-blue-500 bg-blue-950 rounded-md p-2 text-sm flex flex-col">
								{message.content && <p>{message.content}</p>}
								<div className="flex items-center mt-1">
									{message.attachments.map(
										(imageURL: string, index: number) => {
											return (
												<img
													src={imageURL}
													key={index}
													className="mr-2 w-32 h-32 object-cover rounded-md border border-blue-500"
													alt="Uploaded Image"
												/>
											);
										}
									)}
								</div>
								<p className="text-xs text-right mt-1">
									Sent {moment(message.createdAt).fromNow()}
								</p>
							</div>
						</div>
					</div>
				)
			) : message.attachments.length === 0 ? (
				<div className="m-2 p-2">
					<div className="flex items-start justify-end">
						<div className="mr-2 border border-purple-500 bg-purple-950 rounded-md p-2 text-sm flex flex-col">
							<p>{message.content}</p>
							<p className="text-xs text-right mt-1">
								Sent {moment(message.createdAt).fromNow()}
							</p>
						</div>
						<img
							src={message.sender.profile_picture}
							className="w-10 h-10 object-cover rounded-md border border-purple-500"
							alt="User Profile Picture"
						/>
					</div>
				</div>
			) : (
				<div className="m-2 p-2">
					<div className="flex items-start justify-end">
						<div className="mr-2 border border-purple-500 bg-purple-950 rounded-md p-2 text-sm flex flex-col">
							<p>{message.content}</p>
							<div className="flex items-center mt-1">
								{message.attachments.map((imageURL: string, index: number) => {
									return (
										<img
											src={imageURL}
											key={index}
											className="mr-2 w-32 h-32 object-cover rounded-md border border-purple-500"
											alt="Uploaded Image"
										/>
									);
								})}
							</div>
							<p className="text-xs text-right mt-1">
								Sent {moment(message.createdAt).fromNow()}
							</p>
						</div>
						<img
							src={message.sender.profile_picture}
							className="w-10 h-10 object-cover rounded-md border border-purple-500"
							alt="User Profile Picture"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
