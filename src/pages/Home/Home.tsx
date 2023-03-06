import { useState, useEffect } from "react";
import { HStack, Button, Box, Select, useToast } from "@chakra-ui/react";
import { EditingField, Meter } from "../../utils/types";
import { getMetersData, UpdateMeter } from "../../services/meters";
import { useAuth } from "../../utils/authProvider";
import "../Home/Home.css";
import MeterTable from "../../components/MeterList/MeterTable";
import Loader from "../../components/common/Spinner/Loader";

const Home = () => {
	const [meterData, setMeterData] = useState<Meter[]>([]);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);

	const [sort, setSort] = useState<{ header: string; sortType: string; index: number }[]>([
		{ header: "id", sortType: "asc", index: 0 },
	]);
	const [currentSortIndex, setCurrentSortIndex] = useState<number>(0);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [initialLoad, setInitialLoad] = useState<number>(0);

	const [getTotalCount, setGetTotalCount] = useState<boolean>(false);
	const [editingField, setEditingField] = useState<EditingField | null>(null);

	const token = useAuth().user?.jwt ?? "";

	const tableHeaders = Object.keys(meterData[0] || {});
	const toast = useToast();

	useEffect(() => {
		const getMeters = async () => {
			setIsLoading(true);
			try {
				const sortedHeader = sort.find(x => x.index === currentSortIndex);

				const data = await getMetersData(token, page, limit, sortedHeader?.header + ":" + sortedHeader?.sortType);
				setMeterData(data);

				if (!getTotalCount) {
					// ugly solution but the API did not returned any pagination meta info like in the docs example response
					const total = await getMetersData(token);
					setTotalCount(total.length);
					setTotalPages(Math.ceil(totalCount / limit));
					setGetTotalCount(true);
				}
			} catch (error) {
				console.error(error);
			}
			setIsLoading(false);
			setInitialLoad(1);
		};

		getMeters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, page, limit]);

	const handleSort = async (clickedHeader: string) => {
		setPage(1);

		const getKeyIndex = tableHeaders.findIndex(x => x === clickedHeader);
		setCurrentSortIndex(getKeyIndex);

		const sortIndex = sort.findIndex(x => x.header === clickedHeader);
		if (sortIndex >= 0) {
			const sortClone = structuredClone(sort);
			sortClone[sortIndex] = {
				...sortClone[sortIndex],
				sortType: sortClone[sortIndex].sortType === "asc" ? "desc" : "asc",
				index: getKeyIndex,
			};
			setSort(sortClone);
			await handleSorting(sortClone[sortIndex].header, sortClone[sortIndex].sortType);
		} else {
			const sortClone = [...sort, { header: clickedHeader, sortType: "asc", index: getKeyIndex }];
			setSort(sortClone);
			await handleSorting(clickedHeader, "asc");
		}
	};

	const handleSorting = async (header: string, sortType: string) => {
		setIsLoading(true);

		const data = await getMetersData(token, page, limit, `${header}:${sortType}`);
		setMeterData(data);

		setIsLoading(false);
	};

	const handlePreviousPage = () => {
		setPage(prevPage => prevPage - 1);
	};

	const handleNextPage = () => {
		setPage(prevPage => prevPage + 1);
	};

	const handleAttributeEdit = async (meter: Meter, value?: any, attribute?: keyof Meter) => {
		if (editingField !== null) return;
		setEditingField({ meter, attribute });
	};

	const handleAttributeSave = async (meter: Meter, attribute: keyof Meter, value: any) => {
		try {
			const updatedMeter = { ...meter, [attribute]: value };
			const updateRespone = await UpdateMeter(token, updatedMeter, meter.id);
			if (updateRespone !== "error") {
				setMeterData(meterData.map(m => (m.id === updatedMeter.id ? updatedMeter : m)));
				toast({
					title: "Data updated successfully",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				setEditingField(null);
			} else {
				toast({
					title: "Meter update failed",
					description: "There was either an issue with the server or entered data type is incorrect",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancelEdit = () => {
		setEditingField(null);
	};

	const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setLimit(Number(event.target.value));
	};

	return (
		<Box position="relative">
			{initialLoad !== 0 ? (
				<>
					<Box
						position="absolute"
						display={isLoading ? "flex" : "none"}
						top="0"
						left="0"
						width="100%"
						height="100%"
						backdropFilter="blur(1px) saturate(100%)"
						zIndex="overlay"
						alignItems="center"
						justifyContent="center"
					/>
					<MeterTable
						meterData={meterData}
						tableHeaders={tableHeaders}
						editingField={editingField}
						setEditingField={setEditingField}
						handleAttributeEdit={handleAttributeEdit}
						handleAttributeSave={handleAttributeSave}
						handleCancelEdit={handleCancelEdit}
						handleSort={handleSort}
					/>
					<Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
						<HStack>
							<Button isDisabled={page === 1} onClick={handlePreviousPage}>
								Prev
							</Button>
							<Button disabled={page === totalPages} onClick={handleNextPage}>
								Next
							</Button>
						</HStack>
						<Box>
							<Select value={limit} onChange={e => handlePerPageChange(e)}>
								<option value="5">5 per page</option>
								<option value="10">10 per page</option>
								<option value="20">20 per page</option>
							</Select>
						</Box>
					</Box>
				</>
			) : (
				<Loader />
			)}
		</Box>
	);
};

export default Home;
