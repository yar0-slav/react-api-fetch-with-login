import { Button, Input, Tbody, Td, Tr } from "@chakra-ui/react";
import { Meter, MeterComponentProps } from "../../../utils/types";
import EditButtons from "../../common/EditButtons/EditButtons";

const MeterCard: React.FC<MeterComponentProps> = ({
	meterData,
	tableHeaders,
	editingField,
	setEditingField,
	handleAttributeEdit,
	handleAttributeSave,
	handleCancelEdit,
}) => {
	return (
		<Tbody>
			{meterData.map(data => (
				<Tr key={data.id}>
					{tableHeaders.map(header => (
						<Td key={`${data.id}-${header}`} style={{ position: "relative" }}>
							{editingField?.meter.id === data.id && editingField?.attribute === header ? (
								<Input
									borderColor="blue.300"
									colorScheme="blue"
									color="blue.700"
									_hover={{ borderColor: "blue.500" }}
									defaultValue={editingField?.meter[editingField.attribute as keyof Meter] as string}
									onChange={e => {
										setEditingField({
											...editingField,
											meter: {
												...editingField?.meter!,
												[editingField?.attribute as keyof Meter]: e.target.value,
											},
										});
									}}
								/>
							) : (
								data[header as keyof Meter]
							)}
							{editingField == null && header !== "id" && (
								<Button
									data-editbutton="edit-button"
									size="xs"
									variant="ghost"
									colorScheme="blue"
									onClick={e => handleAttributeEdit(data, e, header as keyof Meter)}>
									Edit
								</Button>
							)}
							{editingField?.meter?.id === data.id && editingField?.attribute === header && (
								<EditButtons
									onAttributeSave={() =>
										handleAttributeSave(
											editingField?.meter,
											editingField?.attribute as keyof Meter,
											editingField?.meter[editingField.attribute as keyof Meter] as string
										)
									}
									onCancelEdit={handleCancelEdit}
								/>
							)}
						</Td>
					))}
				</Tr>
			))}
		</Tbody>
	);
};

export default MeterCard;
