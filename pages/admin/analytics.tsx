import { Container, Box, Stack, Divider, Avatar } from "@mui/material";
import React from "react";
import Layout from "../../src/components/Layout";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const SmallerCard = () => {
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
					src=""
					sx={{
						height: 84,
						width: 84,
					}}
				/>
				<Typography
					sx={{
						fontSize: "24px",
						fontWeight: 600,
						color: "#000",
					}}
				>
					Maltina
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
					166
				</Typography>
			</Stack>
		</Card>
	);
};

const BiggerCard = () => {
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
				}}
			>
				<Typography
					sx={{
						fontSize: "48px",
						fontWeight: 600,
					}}
				>
					588
				</Typography>
			</Box>
		</Card>
	);
};

const Analytics = () => {
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
					<BiggerCard />
					<BiggerCard />
					<BiggerCard />
				</Stack>
				<Divider
					sx={{
						mb: 10,
						mx: "auto",
						borderWidth: 2,
					}}
				/>
				<Stack direction="row" columnGap={4} rowGap={4} flexWrap="wrap" mb={5} mx="auto">
					<SmallerCard />
					<SmallerCard />
					<SmallerCard />
					<SmallerCard />
					<SmallerCard />
					<SmallerCard />
				</Stack>
			</Container>
		</Layout>
	);
};

export default Analytics;
