import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation, Media, Message, ShortUser } from "../interfaces";
import useSocketIO from "./useSocketIO";
import useAuthContext from "../contexts/authContext";

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
	const { sendMessageEvent, incomingMessage } = useSocketIO();
	const { userData } = useAuthContext()!;

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

	// 	getChatMedia();
	// 	getConversationData();
	// }, [chat_id]);

	useEffect(() => {
		async function getConversationData() {
			try {
				if (chat_id) {
					await axios
						.get(`http://localhost:3000/api/conversations/${chat_id}`, {
							withCredentials: true
						})
						.then(response => {
							setConversationData(response.data);
						})
						.catch(error => {
							console.log(error);
						});
				}
			} catch (error) {
				console.log(error);
			}
		}

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

		getConversationData();
		getChatMessages();
	}, [chat_id]);

	useEffect(() => {
		if (incomingMessage) {
			const {
				_id,
				sender_id,
				sender_fullName,
				sender_pfp,
				conversation_ID,
				message_content,
				createdAt,
				receiver_uid
			} = incomingMessage;

			const message_body = {
				_id,
				sender: {
					_id: sender_id,
					full_name: sender_fullName,
					profile_picture: sender_pfp
				},
				conversation_ID,
				content: message_content,
				createdAt,
				receiver_uid
			};

			setChatMessages(prev => [...prev, message_body]);
		}
	}, [incomingMessage]);

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
				const { _id, sender, conversation_ID, content, createdAt } =
					response.data;

				const receiver = conversationData?.members.find(
					(user: ShortUser) => user._id !== userData?._id
				);

				if (receiver) {
					sendMessageEvent(
						_id,
						sender._id,
						sender.full_name,
						sender.profile_picture,
						conversation_ID,
						content,
						createdAt,
						receiver?._id
					);
				}
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
