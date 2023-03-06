import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";

const Header: React.FC = () => {
	const navigate = useNavigate();
	const { user, onLogout } = useAuth();

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleLogoutClick = () => {
		onLogout();
	};

	const handleHomeClick = () => {
		navigate("/home");
	};

	return (
		<Flex as="header" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="gray.800" color="white">
			<Heading as="h1" size="md" onClick={handleHomeClick}>
				Meters
			</Heading>

			<Flex align="center">
				{user ? (
					<Button colorScheme="teal" mr={4} onClick={handleLogoutClick}>
						Logout
					</Button>
				) : (
					<Button colorScheme="teal" mr={4} onClick={handleLoginClick}>
						Login
					</Button>
				)}

				<Button colorScheme="teal" onClick={handleHomeClick}>
					Home
				</Button>
			</Flex>
		</Flex>
	);
};

export default Header;
