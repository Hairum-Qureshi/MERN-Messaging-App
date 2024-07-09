import { Conversation, ShortUser } from "../../../interfaces";

interface Props {
	selectedConversation: Conversation;
	otherUser: ShortUser[];
}

export default function UserInfoPanel({
	selectedConversation,
	otherUser
}: Props) {
	console.log(otherUser);
	return (
		<div className="w-1/2 border border-white p-5">
			<div className="flex items-center justify-center">
				<img
					src={otherUser[0].profile_picture}
					className="w-32 h-32 object-cover border border-blue-400 rounded-lg"
					alt="User Pfp"
				/>
			</div>
			<h1 className="text-2xl text-center mt-5">{otherUser[0].full_name}</h1>
			<h2 className="font-semibold text-blue-500 text-center m-2">
				Insert some status here...
			</h2>
			<div className="text-center my-3">
				<h1 className="text-xl font-semibold">ABOUT</h1>
				<div className="border border-white w-full"></div>
				<p className="text-yellow-400 text-base mt-3">
					User Bio Here Lorem ipsum dolor, sit amet consectetur adipisicing
					elit. Repudiandae, laudantium repellat! Recusandae mollitia
					reprehenderit a, in iste ducimus ut hic veniam consequatur illum.
					Iste, doloremque corporis ipsam nobis aliquid aspernatur.
				</p>
			</div>
			<div className="text-center my-2 flex flex-col">
				<h1 className="text-xl font-semibold">Shared Media</h1>
				<div className="border border-white w-full flex-grow overflow-y-auto">
					<div className="h-72 bg-slate-800">
						<h1 className="p-5 text-lg font-semibold">
							When you or your friend shares an image, it'll be added here!
						</h1>
					</div>
					{/* <div className="h-64 overflow-auto m-4 grid grid-cols-2 gap-2">
						<img
							src="https://picsum.photos/200"
							alt="Uploaded Media"
							className="w-full h-full object-cover"
						/>
						<img
							src="https://picsum.photos/200"
							alt="Uploaded Media"
							className="w-full h-full object-cover"
						/>
						<img
							src="https://picsum.photos/200"
							alt="Uploaded Media"
							className="w-full h-full object-cover"
						/>
						<img
							src="https://picsum.photos/200"
							alt="Uploaded Media"
							className="w-full h-full object-cover"
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
}
