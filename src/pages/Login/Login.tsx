import React, { useEffect, useState } from "react";
import { AuthenticatedUser, LoginFormData } from "../../utils/types";
import { useAuth } from "../../utils/authProvider";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useToast } from "@chakra-ui/react";

function Login() {
	const { onLogin, user } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		if (user) {
			navigate("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const [formData, setFormData] = useState<LoginFormData>({
		identifier: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const login: AuthenticatedUser | void = await onLogin(formData);
		if (login !== undefined) {
			toast({
				title: "Login Successful",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Error: Invalid Credentials",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
}

export default Login;
