import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation, Media } from "../interfaces";

interface Tools {
	conversations: Conversation[];
	// chatMessages: Message[];
	conversationMedia: Media[];
}

export default function useConversation(): Tools {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [conversationMedia, setConversationMedia] = useState<Media[]>([]);
	// const [chatMessages, setChatMessages] = useState<Message[]>([]);

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

	const chat_id: string | undefined = window.location.href.split("/").pop();
	useEffect(() => {
		async function getChatMessages() {
			try {
				// if (chat_id) {
				// 	const response = await axios.get(
				// 		`http://localhost:4000/api/messages/${chat_id}`
				// 	);
				// 	setChatMessages(response.data);
				// }
			} catch (error) {
				console.log(error);
			}
		}

		async function getChatMedia() {
			try {
				if (chat_id) {
					await axios
						.get(
							`http://localhost:3000/api/conversations/${chat_id}/get-media`,
							{
								withCredentials: true
							}
						)
						.then(response => {
							setConversationMedia(response.data);
						})
						.catch(error => {
							console.log(error);
						});
				}
			} catch (error) {
				console.log(error);
			}
		}

		getChatMessages();
		getChatMedia();
	}, [chat_id]);

	return { conversations, conversationMedia };
}
