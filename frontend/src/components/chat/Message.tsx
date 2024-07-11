// !NOTE:
// The last message image does not have a 'mr-2' class

export default function Message() {
	return (
		<div className="w-full h-5/6 overflow-auto">
			<div className="m-2 p-2">
				<div className="flex items-start">
					<img
						src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
						className="w-10 h-10 object-cover rounded-md border border-blue-500"
						alt=""
					/>
					<div className="ml-2 border border-blue-500 bg-blue-950 rounded-md p-2 text-sm flex flex-col">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Similique, iure natus dolorum placeat cumque, alias quae est
							possimus ad eveniet tempore blanditiis autem, odio harum deleniti
							sequi maxime unde quo! Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Similique, iure natus dolorum placeat cumque,
							alias quae est possimus ad eveniet tempore blanditiis autem, odio
							harum deleniti sequi maxime unde quo!
						</p>
						<p className="text-xs text-right mt-1">Thu Jul 11, 5:10 PM</p>
					</div>
				</div>
			</div>
			<div className="m-2 p-2">
				<div className="flex items-start justify-end">
					<div className="mr-2 border border-purple-500 bg-purple-950 rounded-md p-2 text-sm flex flex-col">
						<p>Hi</p>
						<p className="text-xs text-right mt-1">Thu Jul 11, 5:11 PM</p>
					</div>
					<img
						src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
						className="w-10 h-10 object-cover rounded-md border border-purple-500"
						alt=""
					/>
				</div>
			</div>
			<div className="m-2 p-2">
				<div className="flex items-start justify-end">
					<div className="mr-2 border border-purple-500 bg-purple-950 rounded-md p-2 text-sm flex flex-col">
						<p>Here are some uploaded images:</p>
						<div className="flex items-center mt-1">
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-purple-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-purple-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-purple-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="w-32 h-32 object-cover rounded-md border border-purple-500"
								alt=""
							/>
						</div>
						<p className="text-xs text-right mt-1">Thu Jul 11, 5:11 PM</p>
					</div>
					<img
						src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
						className="w-10 h-10 object-cover rounded-md border border-purple-500"
						alt=""
					/>
				</div>
			</div>
			<div className="m-2 p-2">
				<div className="flex items-start">
					<img
						src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
						className="w-10 h-10 object-cover rounded-md border border-blue-500"
						alt=""
					/>
					<div className="ml-2 border border-blue-500 bg-blue-950 rounded-md p-2 text-sm flex flex-col">
						<div className="flex items-center mt-1">
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-blue-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-blue-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="mr-2 w-32 h-32 object-cover rounded-md border border-blue-500"
								alt=""
							/>
							<img
								src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
								className="w-32 h-32 object-cover rounded-md border border-blue-500"
								alt=""
							/>
						</div>
						<p className="text-xs text-right mt-1">Thu Jul 11, 5:10 PM</p>
					</div>
				</div>
			</div>
			<div className="m-2 p-2">
				<div className="flex items-start justify-end">
					<div className="mr-2 border border-purple-500 bg-purple-950 rounded-md p-2 text-sm flex flex-col">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
							dolore eius vitae quibusdam impedit vero veniam fugiat sint, illum
							ipsum dolorem a asperiores exercitationem eaque error repudiandae
							aliquam, in necessitatibus?
						</p>
						<p className="text-xs text-right mt-1">Thu Jul 11, 5:11 PM</p>
					</div>
					<img
						src="https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
						className="w-10 h-10 object-cover rounded-md border border-purple-500"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
