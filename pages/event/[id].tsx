import React, { useEffect, useState } from "react";
import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiCheckCircle } from "react-icons/fi";
import { FormControl, Select, OutlinedInput, Chip, MenuItem, Checkbox, ListItemText } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import ViewRecords from "../../src/components/ViewRecords";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NextPage } from "next";
import TabPanel from "../../src/components/TabPanel";

function a11yProps(index: number) {
	return {
		id: `event-tab-${index}`,
		"aria-controls": `event-tabpanel-${index}`,
	};
}

const Event: NextPage = () => {
	const { query } = useRouter();
	const [open, setOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);
	const { data: allProducts, isLoading: productsIsLoading } = useQuery<any[]>(["products"], async () => {
		const res = await axios.get("http://localhost:1337/api/products");
		return res.data.data;
	});
	const mutation = useMutation((data: { name: string; email: string; location: string; phone: string; products: string[] }) => {
		return axios.post("http://localhost:1337/api/customer-with-raffle", {
			data: {
				customer: {
					name: data.name,
					email: data.email,
					phone: data.phone,
					location: data.location,
				},
				products: data.products,
				eventId: query.id,
			},
		});
	});
	useEffect(() => {
		if (mutation.isSuccess) {
			setOpen(mutation.isSuccess);
		}
	}, [mutation.isSuccess]);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		location: "",
		phone: "",
		products: [] as string[],
	});

	const handleChange = (e: {
		target: {
			value: any;
			name: any;
		};
	}) => {
		setFormData((prevState) => Object.assign({}, prevState, { [e.target.name]: e.target.value }));
	};
	return (
		<Layout title="Event">
			<Dialog
				open={open}
				maxWidth="lg"
				onClose={() => {
					setOpen(false);
				}}
				sx={{
					py: 6,
					mx: "auto",
				}}
			>
				<DialogContent sx={{ width: "565px", py: 10 }}>
					<Box
						sx={{
							width: "263px",
							height: "263px",
							backgroundColor: (theme) => theme.palette.primary.light,
							borderRadius: "50%",
							mx: "auto",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<FiCheckCircle color="" fontSize="150px" />
					</Box>
					<Typography
						gutterBottom
						sx={{
							textAlign: "center",
							fontWeight: 600,
							fontSize: "36px",
							color: "#059F27",
						}}
					>
						Success!!
					</Typography>
					<Typography
						gutterBottom
						sx={{
							textAlign: "center",
							fontWeight: 400,
							fontSize: "24px",
						}}
					>
						Form data has been submitted
					</Typography>
				</DialogContent>
			</Dialog>
			<Container
				sx={{
					mb: 3,
				}}
			>
				<Tabs
					value={tabValue}
					color="#fff"
					textColor="inherit"
					indicatorColor="primary"
					sx={{
						mx: "auto",
						width: "fit-content",
						"& button": {
							fontSize: "1rem",
							alignItems: "start",
							textTransform: "capitalize",
							py: 1,
							minHeight: 0,
						},
					}}
					onChange={(e, newValue) => {
						setTabValue(newValue);
					}}
					orientation={"horizontal"}
				>
					<Tab
						label="Submit Details"
						{...a11yProps(0)}
						sx={{
							fontSize: "1rem",
							justifyContent: "start",
							alignItems: "center",
							textTransform: "capitalize",
							py: 0,
						}}
					/>
					<Tab
						label="View Records"
						{...a11yProps(1)}
						sx={{
							fontSize: "1rem",
							justifyContent: "start",
							alignItems: "center",
							textTransform: "capitalize",
							py: 0,
						}}
					/>
				</Tabs>
				<TabPanel index={0} value={tabValue}>
					<Typography
						sx={{
							color: "#002266",
							mb: 10,
							fontSize: "56px",
							fontWeight: 700,
							textAlign: "center",
						}}
					>
						SALES EVENTS LOCATIONS
					</Typography>
					<Box
						sx={{
							backgroundColor: "#FFFFFF",
							width: 733,
							height: 676,
							borderColor: "#002266",
							borderwidth: "1px",
							borderStyle: "solid",
							borderRadius: "20px",
							boxShadow: "0px 0px 20px 5px rgba(0, 55, 163, 0.1)",
							mx: "auto",
						}}
					>
						<Stack width={{ md: "60%" }} mx="auto" spacing={5} justifyContent="center" height="100%">
							<Box>
								<Typography
									gutterBottom
									sx={{
										fontSize: "18px",
										fontWeight: 600,
									}}
								>
									Name
								</Typography>
								<TextField
									size="small"
									fullWidth
									placeholder="Enter name"
									value={formData["name"]}
									name="name"
									onChange={handleChange}
									sx={{
										"& .MuiInputBase-root": {
											borderRadius: "8px",
										},
									}}
								/>
							</Box>
							<Box>
								<Typography
									gutterBottom
									sx={{
										fontSize: "18px",
										fontWeight: 600,
									}}
								>
									Phone Number
								</Typography>
								<TextField
									size="small"
									fullWidth
									placeholder="Enter phone number"
									value={formData["phone"]}
									name="phone"
									onChange={handleChange}
									sx={{
										"& .MuiInputBase-root": {
											borderRadius: "8px",
										},
									}}
								/>
							</Box>
							<Box>
								<Typography
									gutterBottom
									sx={{
										fontSize: "18px",
										fontWeight: 600,
									}}
								>
									Email
								</Typography>
								<TextField
									size="small"
									fullWidth
									placeholder="Enter email address"
									value={formData["email"]}
									name="email"
									onChange={handleChange}
									type="email"
									sx={{
										"& .MuiInputBase-root": {
											borderRadius: "8px",
										},
									}}
								/>
							</Box>
							<Box>
								<Typography
									gutterBottom
									sx={{
										fontSize: "18px",
										fontWeight: 600,
									}}
								>
									Location
								</Typography>
								<TextField
									size="small"
									fullWidth
									value={formData["location"]}
									name="location"
									onChange={handleChange}
									placeholder="Location"
									sx={{
										"& .MuiInputBase-root": {
											borderRadius: "8px",
										},
									}}
								/>
							</Box>
							<FormControl sx={{ m: 1, width: "100%" }}>
								<Select
									labelId="products"
									id="products"
									multiple
									value={formData["products"]}
									fullWidth
									size="small"
									name={"products"}
									sx={{
										"& .MuiInputBase-root": {
											borderRadius: "8px",
										},
									}}
									onChange={handleChange}
									input={<OutlinedInput id="select-multiple-chip" />}
									renderValue={(selected) => (
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{selected.map((value) => (
												<Chip
													key={value}
													variant="outlined"
													color="primary"
													size="small"
													label={allProducts?.find((product) => product.id == value).attributes.Name}
												/>
											))}
										</Box>
									)}
									MenuProps={{
										PaperProps: {
											style: {
												maxHeight: 48 * 4.5 + 2,
												width: 250,
											},
										},
									}}
								>
									{allProducts?.map(({ id, attributes }) => (
										<MenuItem key={id} value={`${id}`}>
											<Checkbox size="small" checked={formData.products.includes(`${id}`)} />
											<ListItemText primary={attributes.Name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Button
									variant="contained"
									color="primary"
									onClick={() => {
										mutation.mutate(formData);
									}}
									sx={{
										textTransform: "none",
										fontSize: "18px",
										width: "fit-content",
										borderRadius: "8px",
									}}
								>
									Submit participant
								</Button>
								<Button
									variant="contained"
									color="info"
									sx={{
										textTransform: "none",
										fontSize: "18px",
										borderRadius: "8px",
										backgroundColor: "#B3B5BA",
										"&:hover": {
											backgroundColor: "#B3B5BA",
										},
									}}
								>
									Clear Fields
								</Button>
							</Box>
						</Stack>
					</Box>
				</TabPanel>
				<TabPanel index={1} value={tabValue}>
					<ViewRecords id={query.id} />
				</TabPanel>
			</Container>
		</Layout>
	);
};

export default Event;
