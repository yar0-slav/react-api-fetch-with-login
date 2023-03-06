import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../services/auth";
import { useLocalStorage } from "./localStorage";
import { IAuthContext, LoginCredentials } from "./types";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext<IAuthContext>({
	user: null,
	onLogin: async () => {},
	onLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();
	const toast = useToast();

	const handleLogin = async (credentials: LoginCredentials) => {
		const loginData = await authLogin(credentials)();
		setUser(loginData);
		return loginData;
	};

	const handleLogout = () => {
		setUser(null);
		toast({
			title: "Logout",
			status: "info",
			duration: 3000,
			isClosable: true,
		});
		navigate("/");
	};

	const value: IAuthContext = useMemo(
		() => ({
			user,
			onLogin: handleLogin,
			onLogout: handleLogout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
