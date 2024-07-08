import axios from "axios";

interface Tools {
	sendFriendRequest: (user_id: string) => void;
}

export default function useFriendRequest(): Tools {
	async function sendFriendRequest(user_id: string) {
		if (user_id) {
			await axios
				.post(
					"http://localhost:3000/api/contacts/send-friend-request",
					{
						user_id
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					// handle response
				})
				.catch(error => {
					console.log(error.response.data.message);
					alert(error.response.data.message);
				});
		} else {
			alert("Please provide a user ID");
		}
	}

	return { sendFriendRequest };
}
