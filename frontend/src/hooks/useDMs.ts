import axios from "axios";
import { Contact } from "../interfaces";
import { useEffect, useState } from "react";
import useAuthContext from "../contexts/authContext";

interface Tools {
	addUserContact: (user_id: string) => void;
	userContacts: Contact[];
}

export default function useDMs(): Tools {
	const [userContacts, setUserContacts] = useState<Contact[]>([]);
	const { userData } = useAuthContext()!;

	async function addUserContact(user_id: string) {
		if (user_id) {
			await axios
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
					if (response.data.length > 0) {
						response.data.map((contact: Contact) => {
							setUserContacts(prev => [contact, ...prev]);
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			alert("Please provide a user ID");
		}
	}

	useEffect(() => {
		async function getUserContacts() {
			await axios
				.get("http://localhost:3000/api/contacts/all", {
					withCredentials: true
				})
				.then(response => {
					if (response.data.length > 0) {
						response.data.map((contact: Contact) => {
							setUserContacts([contact]);
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		}

		getUserContacts();
	}, [userData?._id]);

	return { addUserContact, userContacts };
}
