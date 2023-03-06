import { LoginCredentials } from "../utils/types";

const API_ENDPOINT = "https://tools.dev.enmon.tech/api/auth/local";

export const authLogin = (credentials: LoginCredentials) => async () => {
	try {
		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();

		console.info("Loggin Successful");
		return data;
	} catch (error: any) {
		console.error("Login failed", error);
	}
};
