import axios from "axios";
import useSocketIO from "./useSocketIO";
import useAuthContext from "../contexts/authContext";
import { StatusUpdateData } from "../interfaces";

interface Tools {
	saveChanges: (
		newFirstName: string,
		newLastName: string,
		statusUpdate: string,
		userBio: string
	) => void;
	checkCurrentUserStatusUpdate: () => string;
}

// TODO - for the status update, implement a feature where the status gets removed after 24hrs

export default function useSettings(): Tools {
	const { shareStatusUpdate, statusUpdateData } = useSocketIO();
	const { userData } = useAuthContext()!;

	function saveChanges(
		newFirstName: string,
		newLastName: string,
		statusUpdate: string,
		userBio: string
	) {
		if (!newFirstName || !newLastName) {
			alert("Please be sure to not leave these fields blank");
		} else {
			axios
				.patch(
					"http://localhost:3000/api/user/settings",
					{
						newFirstName,
						newLastName,
						statusUpdate,
						userBio
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.status === 200) {
						alert("Successfully updated your information!");
						if (statusUpdate && userData) {
							shareStatusUpdate(statusUpdate, userData?._id);
						}
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	function checkCurrentUserStatusUpdate(): string {
		const statusUpdate = statusUpdateData.find(
			(statusUpdate: StatusUpdateData) => {
				return statusUpdate.poster_uid === userData?._id;
			}
		);

		if (statusUpdate) {
			return statusUpdate.status;
		}

		return "";
	}

	return { saveChanges, checkCurrentUserStatusUpdate };
}
