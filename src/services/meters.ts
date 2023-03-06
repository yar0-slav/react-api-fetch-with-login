import qs from "qs";

const API_ENDPOINT = "https://tools.dev.enmon.tech/api/inventory-meters";

export async function getMetersData(token: string, page?: number, limit?: number, sort?: string): Promise<any> {
	const query = qs.stringify(
		{
			pagination: {
				page: page,
				pageSize: limit,
			},
			sort: sort,
		},
		{
			encodeValuesOnly: true,
		}
	);
	const response = await fetch(`${API_ENDPOINT}?${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	const data = await response.json();
	return data;
}

export async function UpdateMeter(token: string, updatedField: any, id: number): Promise<any> {
	const payload = {
		data: updatedField,
	};

	try {
		const response = await fetch(`${API_ENDPOINT}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error("Failed to update meter", error);
		return "error";
	}
}
