import { Flex, ResponsiveValue, Spinner } from "@chakra-ui/react";

interface LoaderProps {
	size?: ResponsiveValue<string>;
}

const Loader: React.FC<LoaderProps> = ({ size = "xl" }) => {
	return (
		<Flex justifyContent="center" backgroundColor="transparent" alignItems="center" height="100vh">
			<Spinner size={size} thickness="4px" speed="0.65s" color="blue.500" emptyColor="gray.200" />
		</Flex>
	);
};

export default Loader;
