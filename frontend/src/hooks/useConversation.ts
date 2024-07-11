import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation, Media, Message } from "../interfaces";

interface Tools {
	conversations: Conversation[];
	chatMessages: Message[];
	conversationMedia: Media[];
	conversationData: Conversation | undefined;
	sendMessage: (message: string) => void;
}

export default function useConversation(): Tools {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [conversationMedia, setConversationMedia] = useState<Media[]>([]);
	const [conversationData, setConversationData] = useState<Conversation>();
	const [chatMessages, setChatMessages] = useState<Message[]>([]);

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

	// useEffect(() => {
	// 	async function getChatMedia() {
	// 		try {
	// 			if (chat_id) {
	// 				await axios
	// 					.get(
	// 						`http://localhost:3000/api/conversations/${chat_id}/get-media`,
	// 						{
	// 							withCredentials: true
	// 						}
	// 					)
	// 					.then(response => {
	// 						setConversationMedia(response.data);
	// 					})
	// 					.catch(error => {
	// 						console.log(error);
	// 					});
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	async function getConversationData() {
	// 		try {
	// 			if (chat_id) {
	// 				await axios
	// 					.get(`http://localhost:3000/api/conversations/${chat_id}`, {
	// 						withCredentials: true
	// 					})
	// 					.then(response => {
	// 						setConversationData(response.data);
	// 					})
	// 					.catch(error => {
	// 						console.log(error);
	// 					});
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	getChatMedia();
	// 	getConversationData();
	// }, [chat_id]);

	useEffect(() => {
		const getChatMessages = async () => {
			try {
				if (chat_id) {
					const response = await axios.get(
						`http://localhost:3000/api/conversations/${chat_id}/messages`
					);
					setChatMessages(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getChatMessages();
	}, [chat_id]);

	async function sendMessage(message: string) {
		await axios
			.post(
				`http://localhost:3000/api/conversations/${chat_id}/send-message`,
				{
					message
				},
				{
					withCredentials: true
				}
			)
			.then(response => {
				setChatMessages(prev => [...prev, response.data]);
				console.log(response.data);
			})
			.catch(error => console.log(error));
	}

	return {
		conversations,
		chatMessages,
		conversationMedia,
		conversationData,
		sendMessage
	};
}
