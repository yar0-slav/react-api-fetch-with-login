import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

const NotFound: React.FC = () => {
	const error: any = useRouteError();
	console.error(error);

	return (
		<Flex height="100vh" justify="center" align="center">
			<Flex direction="column" align="center">
				<Heading size="4xl">404</Heading>
				<Text fontSize="2xl" mt={4}>
					Oops, the page you're looking for doesn't exist.
				</Text>
				<Text fontSize="2xl" mt={4}>
					<i>{error.statusText || error.message}</i>
				</Text>
			</Flex>
		</Flex>
	);
};

export default NotFound;
