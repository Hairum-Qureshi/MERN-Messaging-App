import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="text-xl p-2">
			<ul>
				<li>
					<Link to="/sign-in">SIGN IN</Link>
				</li>
				<li>
					<Link to="/sign-up">SIGN UP</Link>
				</li>
			</ul>
		</div>
	);
}
