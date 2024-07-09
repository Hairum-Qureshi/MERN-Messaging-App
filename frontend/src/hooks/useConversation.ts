import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation } from "../interfaces";

interface Tools {
	conversations: Conversation[];
}

export default function useConversation() {
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		async function getChats() {
			await axios
				.get("http://localhost:3000/api/conversations/all", {
					withCredentials: true
				})
				.then(response => {
					setConversations(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}

		getChats();
	}, []);

	return { conversations };
}
