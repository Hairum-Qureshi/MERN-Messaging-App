import { Link } from "react-router-dom";

export default function SignIn() {
	return (
		<div className="w-full bg-gray-900 h-screen text-white">
			<div className="w-2/5 h-screen p-3 rounded-md mt-10 absolute">
				<h1 className="text-5xl font-semibold m-2">Welcome back to ChitChat</h1>
				<p className="mt-2 text-base m-3 text-blue-400">
					Login to your account, re-connect with your friends, and resume
					chatting.&nbsp;
					<span className="font-semibold">
						Don't have an account?&nbsp;
						<Link to="/sign-up" className="text-sky-500">
							Click here!
						</Link>
					</span>
				</p>
				<div className="w-full p-3">
					<div>
						<label htmlFor="full-name">Full Name</label>
						<br />
						<input
							type="text"
							id="full-name"
							placeholder="Full Name"
							className="p-4 mt-2 border border-blue-500 rounded w-full bg-sky-950 outline-blue-300"
						/>
					</div>
					<div className="mt-5">
						<label htmlFor="last-name" className="text-white">
							Email
						</label>
						<br />
						<input
							type="email"
							id="email"
							placeholder="Email"
							className="p-4 mt-2 border border-blue-500 rounded w-full bg-sky-950 outline-blue-300"
						/>
					</div>
					<div className="mt-5">
						<label htmlFor="password">Password</label>
						<br />
						<input
							type="password"
							id="password"
							placeholder="Password"
							className="p-4 mt-2 border border-blue-500 rounded w-full bg-sky-950 outline-blue-300"
						/>
					</div>
					<div className="mt-10">
						<button className="border border-blue-300 text-blue-300 font-bold rounded w-full p-2 h-14 bg-sky-950 active:bg-sky-800 active:text-blue-200">
							LOGIN
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
