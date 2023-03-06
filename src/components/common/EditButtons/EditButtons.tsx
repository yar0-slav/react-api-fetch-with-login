import { Button, HStack, Icon } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { EditButtonsProps } from "../../../utils/types";

const EditButtons = ({ onAttributeSave, onCancelEdit }: EditButtonsProps) => (
	<HStack mt="5px" justifyContent="center">
		<Button _hover={{ bg: "green.100" }} variant="ghost" size="sm" onClick={onAttributeSave}>
			<Icon color="green" as={CheckIcon} />
		</Button>
		<Button _hover={{ bg: "red.100" }} variant="ghost" color="red" size="sm" onClick={onCancelEdit}>
			<Icon as={CloseIcon} />
		</Button>
	</HStack>
);

export default EditButtons;
