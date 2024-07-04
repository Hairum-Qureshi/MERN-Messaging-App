export default function Contact() {
	return (
		<>
			<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
				<div className="flex items-center">
					<div className="relative">
						<img
							src="https://i.pinimg.com/originals/89/1e/21/891e214227a47d859de482c85f66a50b.gif"
							alt="Pfp"
							className="w-12 h-12 object-cover rounded-md border border-blue-400"
						/>
						<div className="w-3 h-3 rounded-full bg-red-500 absolute bottom-0 right-0 m-1"></div>
					</div>
					<div className="text-base ml-3">
						<h1 className="text-slate-300 text-sm">Adam Smith</h1>
						<p className="text-xs text-blue-500 font-bold">
							Playing some video games
						</p>
						<p className="text-xs text-slate-400">
							<i>Last message sent was something really, rea...</i>
						</p>
					</div>
				</div>
			</div>
			<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
				<div className="flex items-center">
					<div className="relative">
						<img
							src="https://i.pinimg.com/originals/89/1e/21/891e214227a47d859de482c85f66a50b.gif"
							alt="Pfp"
							className="w-12 h-12 object-cover rounded-md border border-blue-400"
						/>
						<div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 m-1"></div>
					</div>
					<div className="text-base ml-3">
						<h1 className="text-slate-300 text-sm">John Doe</h1>
						<p className="text-xs text-blue-500 font-bold">
							Texting a friend
						</p>{" "}
						<p className="text-xs text-green-500 font-bold">
							John Doe is typing...
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

// export default function Contact() {
// 	return (
// 		<div className="w-full border border-sky-600 bg-slate-900 p-2 border-l-4 border-l-blue-300">
// 			<div className="flex items-center">
// 				<img
// 					src="https://i.pinimg.com/originals/89/1e/21/891e214227a47d859de482c85f66a50b.gif"
// 					alt="Pfp"
// 					className="w-12 h-12 object-cover rounded-md border border-blue-400"
// 				/>
// 				<div className="text-base ml-3">
// 					<h1 className="text-slate-300 text-sm">John Doe</h1>
// 					<p className="text-xs text-slate-400">
// 						<i>Last message sent was...</i>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
