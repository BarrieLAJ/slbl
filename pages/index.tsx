import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "../src/components/Layout";
import Grid from "@mui/material/Grid";
import EventCard from "../src/components/EventCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";

const Home: NextPage = () => {
	const {
		data: events,
		isLoading,
		isError,
	} = useQuery<any[]>(["events"], async () => {
		const query = qs.stringify(
			{
				// fields: ["title", "slug"],
				populate: {
					Image: {
						fields: ["name", "url"],
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			}
		);
		const res = await axios.get(`http://localhost:1337/api/events?${query}`);
		return res.data.data;
	});
	return (
		<Layout title="Home Page">
			<Container
				sx={{
					mb: 3,
				}}
			>
				<Typography
					sx={{
						fontWeight: 700,
						fontSize: "56px",
						textAlign: "center",
						my: 6,
					}}
				>
					SLBL SALES EVENTS LOCATIONS
				</Typography>
				<Grid container columnSpacing={4} rowGap={4}>
					{!isLoading &&
						events?.map((event) => {
							return (
								<Grid
									key={event.id}
									item
									md={3}
									sx={{
										maxWidth: "300px",
										width: "300px",
									}}
								>
									<EventCard
										name={event.attributes.Title}
										id={event.id}
										imgSrc={event.attributes.Image.data[0].attributes.url}
										startDate={event.attributes.Start_Date}
										alias={event.attributes.alias}
									/>
								</Grid>
							);
						})}
				</Grid>
			</Container>
		</Layout>
	);
};

export default Home;
