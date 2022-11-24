import { Container, Box, Stack, Divider, Avatar } from "@mui/material";
import React from "react";
import Layout from "../../src/components/Layout";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import axios from "axios";

const SmallerCard = (props: { name: string; imgSrc: string; id: string }) => {
	const {
		data: productSoldCount,
		isLoading: productSoldCountIsLoading,
		isError: productSoldCountiIsError,
	} = useQuery<any>([`productSoldCount${props.id}`], async () => {
		const res = await axios.get(`http://localhost:1337/api/analytics-data/product-sold/${props.id}`);
		return res.data;
	});
	return (
		<Card
			elevation={0}
			sx={{
				width: 349,
				height: 150,
				borderRadius: "10px",
				borderColor: "#000000",
				py: 2,
				px: 3,
				display: "flex",
				justifyContent: "start",
				gap: 3,
				borderWidth: 2,
				borderStyle: "solid",
				boxShadow: "0px 0px 20px 5px rgba(0, 55, 163, 0.05);",
			}}
		>
			<Stack spacing={1}>
				<Avatar
					variant="circular"
					src={`http://localhost:1337${props.imgSrc}`}
					sx={{
						height: 84,
						width: 84,
					}}
					imgProps={{
						width: "100%",
						style: {
							objectFit: "cover",
							objectPosition: "center",
						},
					}}
				/>
				<Typography
					sx={{
						fontSize: "24px",
						fontWeight: 600,
						color: "#000",
					}}
				>
					{props.name}
				</Typography>
			</Stack>
			<Stack spacing={0}>
				<Typography
					sx={{
						fontSize: "16px",
						fontWeight: 400,
						color: "#6D6F73",
					}}
				>
					Amount Sold
				</Typography>
				<Typography
					sx={{
						fontSize: "56px",
						fontWeight: 700,
						color: "#002266",
					}}
				>
					{!productSoldCountIsLoading && productSoldCount && productSoldCount.productsSoldCount}
				</Typography>
			</Stack>
		</Card>
	);
};

const BiggerCard = (props: { title: string[]; count: string; color?: string }) => {
	return (
		<Card
			elevation={0}
			sx={{
				width: 363,
				height: 320,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				border: "2px solid #efefef",
			}}
		>
			<Box
				width={200}
				height={200}
				borderRadius="50%"
				border="10px solid #efefef"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					position: "relative",
					mb: 3,
				}}
			>
				<Typography
					sx={{
						fontSize: "48px",
						fontWeight: 600,
					}}
				>
					{props.count}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: props.title.length > 1 ? "space-between" : "center",
				}}
			>
				{props.title.map((t, i) => {
					return (
						<Typography
							key={i}
							sx={{
								fontSize: "16px",
								fontWeight: 400,
								color: "#002266",
							}}
						>
							{t}
						</Typography>
					);
				})}
			</Box>
		</Card>
	);
};

const Analytics = () => {
	const {
		data: participants,
		isLoading: particiIsLoading,
		isError: particiIsError,
	} = useQuery<any>(["participantsCount"], async () => {
		const res = await axios.get(`http://localhost:1337/api/analytics-data/participants`);
		return res.data;
	});
	const {
		data: raffleWinners,
		isLoading: raffleWinnersIsLoading,
		isError: raffleWinnersiIsError,
	} = useQuery<any>(["raffleWinnersCount"], async () => {
		const res = await axios.get(`http://localhost:1337/api/analytics-data/raffleWinners`);
		return res.data;
	});
	const {
		data: productsSoldCount,
		isLoading: productsSoldCountIsLoading,
		isError: productsSoldCountiIsError,
	} = useQuery<any>(["productsSoldCount"], async () => {
		const res = await axios.get(`http://localhost:1337/api/analytics-data/products-sold`);
		return res.data;
	});
	const {
		data: products,
		isLoading: productsIsLoading,
		isError: productsIsError,
	} = useQuery<any[]>(["products"], async () => {
		const query = qs.stringify(
			{
				fields: ["Name"],
				populate: {
					Image: {
						fields: ["name", "url"],
					},
				},
			},
			{
				encodeValuesOnly: true,
			}
		);
		const res = await axios.get(`http://localhost:1337/api/products?${query}`);
		console.log(res.data.data);
		return res.data.data;
	});
	// console.log(participants, raffleWinners, products, productsSoldCount);
	return (
		<Layout title="Analytics">
			<Container sx={{ py: 5 }} maxWidth="lg">
				<Typography
					gutterBottom
					sx={{
						textAlign: "center",
						fontSize: "48px",
						fontWeight: 600,
						color: "#0037A3",
					}}
				>
					SLBL RAFFLE TICKET DATA ANALYTICS
				</Typography>
				<Stack direction="row" spacing={4} mb={10}>
					<BiggerCard
						title={["Total number of participants"]}
						count={participants ? participants.customerCount : "0"}
					/>
					<BiggerCard title={["Number of winners"]} count={raffleWinners ? raffleWinners.customerWinnersCount : "0"} />
					<BiggerCard
						title={["Number of drinks sold in raffle"]}
						count={productsSoldCount ? productsSoldCount.productsSoldCount : "0"}
					/>
				</Stack>
				<Divider
					sx={{
						mb: 10,
						mx: "auto",
						borderWidth: 2,
					}}
				/>
				<Stack direction="row" columnGap={4} rowGap={4} flexWrap="wrap" mb={5} mx="auto">
					{!productsIsLoading &&
						products &&
						products.map((product) => {
							return (
								<SmallerCard
									key={product.id}
									name={product.attributes.Name}
									imgSrc={product.attributes.Image.data.attributes.url}
									id={product.id}
								/>
							);
						})}
				</Stack>
			</Container>
		</Layout>
	);
};

export default Analytics;
