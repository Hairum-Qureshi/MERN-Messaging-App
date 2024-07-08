import axios from "axios";
import { FriendRequest, SentFriendRequest } from "../interfaces";
import { useEffect, useState } from "react";
import useSocketIO from "./useSocketIO";
import useAuthContext from "../contexts/authContext";

interface Tools {
	sendFriendRequest: (user_id: string) => void;
	sentFriendRequests: SentFriendRequest[];
	friendRequests: FriendRequest[];
	acceptIncomingFriendRequest: (sender_uid: string) => void;
}

export default function useFriendRequest(): Tools {
	const [sentFriendRequests, setSentFriendRequests] = useState<
		SentFriendRequest[]
	>([]);
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const { sendFriendRequestEvent, incomingFriendRequest } = useSocketIO();
	const { userData } = useAuthContext()!;

	async function sendFriendRequest(user_id: string) {
		if (user_id) {
			await axios
				.post(
					"http://localhost:3000/api/friend-requests/send",
					{
						user_id
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (userData && response.status === 200) {
						setSentFriendRequests(prev => [response.data, ...prev]);
						sendFriendRequestEvent(
							userData._id!,
							response.data.receiver._id,
							userData.profile_picture!,
							userData.full_name!,
							userData.status_update!
						);
					}
				})
				.catch(error => {
					console.log(error);
					// console.log(error.response.data.message);
					// alert(error.response.data.message);
				});
		} else {
			alert("Please provide a user ID");
		}
	}

	useEffect(() => {
		async function getFriendRequests() {
			await axios
				.get("http://localhost:3000/api/friend-requests/all", {
					withCredentials: true
				})
				.then(response => {
					setFriendRequests(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}

		async function getSentFriendRequests() {
			await axios
				.get("http://localhost:3000/api/friend-requests/all-sent", {
					withCredentials: true
				})
				.then(response => {
					setSentFriendRequests(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}

		getFriendRequests();
		getSentFriendRequests();
	}, []);

	useEffect(() => {
		if (incomingFriendRequest) {
			setFriendRequests(prev => [incomingFriendRequest, ...prev]);
		}
	}, [incomingFriendRequest]);

	async function acceptIncomingFriendRequest(sender_uid: string) {
		axios
			.post(
				"http://localhost:3000/api/friend-requests/accept",
				{
					sender_uid
				},
				{
					withCredentials: true
				}
			)
			.then(response => console.log(response.data))
			.catch(error => console.log(error));
	}

	useEffect(() => {
		console.log(friendRequests);
	}, [friendRequests]);

	return {
		sendFriendRequest,
		friendRequests,
		sentFriendRequests,
		acceptIncomingFriendRequest
	};
}
