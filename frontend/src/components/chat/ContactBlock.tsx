import { User } from "../../interfaces";

interface Props {
	contactData: User;
}

export default function ContactBlock({ contactData }: Props) {
	return (
		<div
			className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300"
			key={contactData._id}
		>
			<div className="flex items-center">
				<img
					src={contactData.profile_picture}
					alt="Pfp"
					className="w-12 h-12 object-cover rounded-md border border-blue-400"
				/>
				<div className="text-base ml-3">
					<h1 className="text-slate-300 text-sm">{contactData.full_name}</h1>
					<p className="text-xs text-slate-400">
						<i>Last message sent was...</i>
					</p>
				</div>
			</div>
		</div>
	);
}
