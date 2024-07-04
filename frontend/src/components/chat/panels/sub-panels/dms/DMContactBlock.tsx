import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DMContact() {
	return (
		<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
			<div className="flex items-center">
				<img
					src="https://i.pinimg.com/originals/89/1e/21/891e214227a47d859de482c85f66a50b.gif"
					alt="Pfp"
					className="w-12 h-12 object-cover rounded-md border border-blue-400"
				/>
				<div className="text-base ml-3">
					<h1 className="text-slate-300 text-sm">Jane Doe</h1>
					<p className="text-xs text-slate-400">
						<i>Last message sent was...</i>
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
