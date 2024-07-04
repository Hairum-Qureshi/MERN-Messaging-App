import axios from "axios";

interface Tools {
	registerUser: (
		first_name: string,
		last_name: string,
		email: string,
		password: string
	) => void;
	loginUser: (email: string, password: string) => void;
}

export default function useAuthentication(): Tools {
	function registerUser(
		first_name: string,
		last_name: string,
		email: string,
		password: string
	) {
		if (!first_name || !last_name || !email || !password) {
			alert("Please make sure you fill in all fields");
		} else {
			axios
				.post(
					"http://localhost:3000/api/auth/sign-up",
					{
						first_name,
						last_name,
						email,
						password
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.status === 201) {
						window.location.href = "/conversations";
					}
				})
				.catch(error => console.log(error));
		}
	}

	function loginUser(email: string, password: string) {
		if (!email || !password) {
			alert("Please make sure you fill in all fields");
		} else {
			axios
				.post(
					"http://localhost:3000/api/auth/sign-in",
					{
						email,
						password
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.status === 200) {
						window.location.href = "/conversations";
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	return { registerUser, loginUser };
}
