import { Conversation, ShortUser } from "../../../interfaces";

interface Props {
	otherUser: ShortUser[];
}

export default function UserInfoPanel({ otherUser }: Props) {
	return (
		<div className="border border-blue-500 h-screen w-1/2 bg-slate-800 flex flex-col">
			<div className="w-full">
				<div className="flex items-center justify-center m-5 hover:cursor-pointer">
					<img
						src={otherUser[0].profile_picture}
						alt="User pfp"
						className="w-32 h-32 rounded-lg border border-blue-500 object-cover"
					/>
				</div>
			</div>
			<div className="text-2xl font-semibold text-center -mt-2">
				{otherUser[0].full_name}
			</div>
			<div className="text-center font-semibold text-purple-400 p-3">
				{otherUser[0].status_update ||
					`${
						otherUser[0].full_name.split(" ")[0]
					} currently has no status update`}
			</div>
			<div className="text-center -mt-2 text-yellow-400 p-3">
				{otherUser[0].biography}
			</div>
			<h1 className="text-xl font-semibold text-center mb-2">Uploaded Media</h1>
			<div className="m-2 flex flex-col flex-grow overflow-auto">
				<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							className="h-auto max-w-full rounded-lg"
							src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
