import {
	faArrowLeft,
	faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../../contexts/authContext";
import useSettings from "../../../../hooks/useSettings";

interface Props {
	updatePageStatus: (page: string) => void;
}

// TODO
// Add an emoji button to the status update field
// Add the ability for users to change their profile picture

export default function Settings({ updatePageStatus }: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { userData } = useAuthContext()!;

	const [newFirstName, setNewFirstName] = useState("");
	const [newLastName, setNewLastName] = useState("");
	const [statusUpdate, setStatusUpdate] = useState("");
	const [userBio, setUserBio] = useState("");
	const userPfpRef = useRef<HTMLImageElement>(null);
	const { saveChanges, updateProfilePicture } = useSettings();

	function changePfp() {
		fileInputRef.current?.click();
	}

	useEffect(() => {
		if (userData) {
			setNewFirstName(userData.full_name.split(" ")[0]);
			setNewLastName(userData.full_name.split(" ")[1]);
			setStatusUpdate(userData.status_update || "");
			setUserBio(userData.biography);
		}
	}, [userData]);

	function handleChangePfp(event: React.ChangeEvent<HTMLInputElement>) {
		const files: FileList | null = event.target.files;
		if (files && userPfpRef.current) {
			const blob_url = window.URL.createObjectURL(files[0]);
			userPfpRef.current.src = blob_url;

			const imageFile: File = files[0];
			updateProfilePicture(imageFile);
		}
	}

	return (
		<div className="border border-blue-500 h-screen w-1/3 bg-slate-800 flex flex-col">
			<div className="flex items-center">
				<div
					onClick={() => updatePageStatus("settings")}
					className="text-xl border w-1/3 border-white-400 p-1 bg-slate-500 rounded hover:cursor-pointer active:bg-slate-700 m-4"
				>
					<div className="flex items-center justify-center">
						<FontAwesomeIcon icon={faArrowLeft} />
						<span className="ml-2 text-lg">Go Back</span>
					</div>
				</div>
				<div
					onClick={() => updatePageStatus("settings")}
					className="text-xl border w-1/3 border-white-400 p-1 bg-blue-500 rounded hover:cursor-pointer active:bg-blue-700 m-4 ml-auto"
				>
					<Link to="/">
						<div className="flex items-center justify-center">
							<FontAwesomeIcon icon={faRightFromBracket} />
							<span className="ml-2 text-lg">Sign Out</span>
						</div>
					</Link>
				</div>
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
					<label htmlFor="image-upload" className="hidden">
						Upload Image
					</label>
					<input
						id="image-upload"
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={event => handleChangePfp(event)}
					/>
					<img
						src={userData?.profile_picture}
						alt="User pfp"
						ref={userPfpRef}
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
					value={statusUpdate}
					id="status-update"
					placeholder="What's your status?"
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
					onChange={e => setStatusUpdate(e.target.value)}
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
					value={newFirstName}
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
					onChange={e => setNewFirstName(e.target.value)}
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
					value={newLastName}
					className="w-full mt-2 p-2 outline-none rounded text-sm bg-slate-900 border border-blue-500"
					onChange={e => setNewLastName(e.target.value)}
				/>
			</div>
			<div className="m-2 flex flex-col flex-grow">
				<label htmlFor="biography" className="flex">
					Tell people about yourself:{" "}
					<span className="ml-auto">{userBio?.length || 0}/235</span>
				</label>
				<textarea
					id="biography"
					placeholder="Write a short bio about yourself..."
					className="w-full mt-2 p-2 flex-grow outline-none rounded text-sm bg-slate-900 border border-blue-500 resize-none h-full"
					maxLength={235}
					value={userBio}
					onChange={e => setUserBio(e.target.value)}
				></textarea>
			</div>
			<div className="m-2">
				<button
					className="p-2 border border-green-400 bg-green-700 w-full rounded-md"
					onClick={() =>
						saveChanges(newFirstName, newLastName, statusUpdate, userBio)
					}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
}
