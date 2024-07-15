import { useEffect, useState } from "react";
import useConversation from "../../../hooks/useConversation";
import { Media, ShortUser } from "../../../interfaces";
import useAuthContext from "../../../contexts/authContext";

// TODO -
// Consider adding the "create group chat button in this panel"
// Add a friend/unfriend and block button in this panel also

export default function UserInfoPanel() {
	const [otherUser, setOtherUser] = useState<ShortUser>();
	const { conversationData, conversationMedia } = useConversation();
	const { userData } = useAuthContext()!;

	const curr_chatID = window.location.href.split("/").pop();

	useEffect(() => {
		if (curr_chatID && conversationData?.members && userData?._id) {
			const otherUser = conversationData.members.find(
				(user: ShortUser) => user._id !== userData._id
			);
			if (otherUser) {
				setOtherUser(otherUser);
			}
		}
	}, [conversationData]);

	return (
		otherUser && (
			<div className="border border-blue-500 h-screen w-1/2 bg-slate-800 flex flex-col">
				<div className="w-full">
					<div className="flex items-center justify-center m-5 hover:cursor-pointer">
						<img
							src={otherUser.profile_picture}
							alt="User pfp"
							className="w-32 h-32 rounded-lg border border-blue-500 object-cover"
						/>
					</div>
				</div>
				<div className="text-2xl font-semibold text-center -mt-2">
					{otherUser.full_name}
				</div>
				<div className="text-center font-semibold text-purple-400 p-3">
					{otherUser.status_update ||
						`${
							otherUser.full_name.split(" ")[0]
						} currently has no status update`}
				</div>
				<div className="text-center -mt-2 text-gray-400 p-3">
					{otherUser.biography}
				</div>
				<h1 className="text-xl font-semibold text-center mb-2">
					Uploaded Media
				</h1>
				{conversationMedia.length === 0 ? (
					<p className="p-2 text-slate-500 text-center">
						When you or your friend share any images, they'll be added right
						here!
					</p>
				) : (
					<div className="m-2 flex flex-col flex-grow overflow-auto">
						<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
							{conversationMedia.map((imgData: Media) =>
								imgData.images_data.map((imgURL: string) => (
									<div key={imgURL}>
										<img
											className="h-auto max-w-full rounded-lg"
											src={imgURL}
											alt="Uploaded Image"
										/>
									</div>
								))
							)}
						</div>
					</div>
				)}
			</div>
		)
	);
}
