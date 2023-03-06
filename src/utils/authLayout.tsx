import { useOutlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { AuthProvider } from "./authProvider";

export const AuthLayout = () => {
	const outlet = useOutlet();

	return (
		<AuthProvider>
			<Header />
			{outlet}
		</AuthProvider>
	);
};
