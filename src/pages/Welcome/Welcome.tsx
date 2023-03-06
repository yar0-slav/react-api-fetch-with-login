import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const WelcomePage: React.FC = () => {
	return (
		<Center height="100vh">
			<div>
				<Heading mb={4}>Welcome!</Heading>
				<Text mb={4}>Please log in to view the content.</Text>
				<Button as={RouterLink} to="/login">
					Log In
				</Button>
			</div>
		</Center>
	);
};

export default WelcomePage;
