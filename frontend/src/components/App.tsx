import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Chat from "./chat/Chat";
import { AuthProvider } from "../contexts/authContext";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/conversations" element={<Chat />} />
					<Route path="/conversations/:contact_id" element={<Chat />} />
					<Route
						path="/conversations/dm-requests/:request_id"
						element={<Chat />}
					/>
					<Route path="/conversations/:chat_id" element={<Chat />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
