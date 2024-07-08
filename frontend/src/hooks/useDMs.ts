import axios from "axios";
import { Contact } from "../interfaces";
import { useEffect, useState } from "react";
import useAuthContext from "../contexts/authContext";

interface Tools {
	userContacts: Contact[];
}

export default function useDMs(): Tools {
	const [userContacts, setUserContacts] = useState<Contact[]>([]);
	const { userData } = useAuthContext()!;

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
					console.log(error.response.data.message);
					alert(error.response.data.message);
				});
		}

		getUserContacts();
	}, [userData?._id]);

	return { userContacts };
}
