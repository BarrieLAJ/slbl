import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ViewRecords = (props: { id: string | string[] | undefined }) => {
	const {
		data: customers,
		isLoading,
		isError,
		error,
	} = useQuery<any[]>(["customers"], async () => {
		const res = await axios.get(`http://localhost:1337/api/customer-with-raffle/${props.id}`);
		return res.data.customers;
	});

	return (
		<DataGrid
			autoHeight
			checkboxSelection
			loading={isLoading}
			error={isError ? error : undefined}
			rows={customers || []}
			columns={[
				{
					field: "name",
					headerName: "Name",
					flex: 1,
				},
				{
					field: "phone",
					headerName: "Phone Number",
					flex: 1,
				},
				{
					field: "email",
					headerName: "Email",
					flex: 1,
				},
				{
					field: "location",
					headerName: "Location",
					flex: 1,
				},
			]}
		/>
	);
};

export default ViewRecords;
