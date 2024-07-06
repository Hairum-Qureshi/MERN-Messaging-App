import axios from "axios";
import { Contact, User } from "../interfaces";
import { useEffect, useState } from "react";

interface Tools {
	addUserContact: (user_id: string) => void;
	userContacts: Contact[];
}

export default function useDMs(): Tools {
	const [userContacts, setUserContacts] = useState<Contact[]>([]);

	function addUserContact(user_id: string) {
		if (user_id) {
			axios
				.post(
					"http://localhost:3000/api/contacts/add",
					{
						user_id
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					setUserContacts(prev => [response.data, ...prev]);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			alert("Please provide a user ID");
		}
	}

	useEffect(() => {
		function getUserContacts() {
			axios
				.get("http://localhost:3000/api/contacts/all", {
					withCredentials: true
				})
				.then(response => {
					if (response.data.length > 0) {
						response.data.map((contact: User) => {
							setUserContacts([contact]);
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		}

		getUserContacts();
	}, []);

	return { addUserContact, userContacts };
}
