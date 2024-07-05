import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../../contexts/authContext";

interface Props {
	updatePageStatus: (page: string) => void;
}

// TODO
// Add an emoji button to the status textarea
// Add the ability for users to change their profile picture

export default function Settings({ updatePageStatus }: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { userData } = useAuthContext()!;

	function changePfp() {
		fileInputRef.current?.click();
	}

	return (
		<div className="border border-blue-500 h-screen w-1/4 bg-slate-800 flex flex-col">
			<div
				onClick={() => updatePageStatus("settings")}
				className="text-xl border w-1/3 border-white-400 p-1 bg-slate-500 rounded hover:cursor-pointer active:bg-slate-700 m-4"
			>
				<Link to="/conversations">
					<div className="flex items-center justify-center">
						<FontAwesomeIcon icon={faArrowLeft} />
						<span className="ml-2 text-lg">Go Back</span>
					</div>
				</Link>
			</div>
			<div className="w-full m-2">
				<h1 className="text-2xl font-semibold">Settings</h1>
				<h1 className="text-sm font-semibold">
					Your Shareable ID: {userData?._id}
				</h1>
			</div>
			<div className="w-full">
				<div
					className="flex items-center justify-center ml-3 hover:cursor-pointer"
					onClick={changePfp}
				>
					<input type="file" ref={fileInputRef} className="hidden" />
					<img
						src={userData?.profile_picture}
						alt="User pfp"
						className="w-32 h-32 rounded-lg border border-white object-cover"
					/>
				</div>
				<p className="text-xs text-center text-slate-400 mt-2">
					Click on your profile picture to change it
				</p>
			</div>
			<div className="m-2">
				<label htmlFor="status-update" className="m-1">
					Enter a status update:
				</label>
				<input
					type="text"
					id="status-update"
					placeholder="What's your status?"
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
				/>
			</div>
			<div className="m-2">
				<label htmlFor="first-name" className="m-1">
					Update your first name<span className="text-red-600">*</span>&nbsp;:
				</label>
				<input
					type="text"
					id="first-name"
					placeholder="Enter your first name"
					value={userData?.full_name.split(" ")[0]}
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
				/>
			</div>
			<div className="m-2">
				<label htmlFor="last-name" className="m-1">
					Update your last name<span className="text-red-600">*</span>&nbsp;:
				</label>
				<input
					type="text"
					id="last-name"
					placeholder="Enter your last name"
					value={userData?.full_name.split(" ")[1]}
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
				/>
			</div>
			<div className="m-2 flex flex-col flex-grow">
				<label htmlFor="biography" className="m-1">
					Tell people about yourself
				</label>
				<textarea
					id="biography"
					placeholder="Write a short bio about yourself..."
					className="w-full mt-2 p-2 flex-grow outline-none rounded text-sm bg-slate-900 border border-blue-500 resize-none h-full"
					value={userData?.biography}
				></textarea>
			</div>
			<div className="m-2">
				<button className="p-2 border border-green-400 bg-green-700 w-full rounded-md">
					Save Changes
				</button>
			</div>
		</div>
	);
}
