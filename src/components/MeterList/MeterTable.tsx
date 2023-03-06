import React from "react";
import { Box, Table, Thead, Tr, Th, Button } from "@chakra-ui/react";
import { MeterComponentProps } from "../../utils/types";
import MeterCard from "./MeterCard/MeterCard";

const MeterTable: React.FC<MeterComponentProps> = ({
	meterData,
	tableHeaders,
	editingField,
	setEditingField,
	handleAttributeEdit,
	handleAttributeSave,
	handleCancelEdit,
	handleSort,
}) => {
	return (
		<Box p="4" overflowX="scroll">
			<Table variant="striped" colorScheme="gray" size="sm">
				<Thead>
					<Tr>
						{tableHeaders.map(header => (
							<Th key={header}>
								<Button
									variant="link"
									size="sm"
									data-headerkey={header}
									onClick={() => {
										if (handleSort) {
											handleSort(header);
										}
									}}>
									{header}
								</Button>
							</Th>
						))}
					</Tr>
				</Thead>
				<MeterCard
					meterData={meterData}
					tableHeaders={tableHeaders}
					editingField={editingField}
					setEditingField={setEditingField}
					handleAttributeEdit={handleAttributeEdit}
					handleAttributeSave={handleAttributeSave}
					handleCancelEdit={handleCancelEdit}
				/>
			</Table>
		</Box>
	);
};

export default MeterTable;
