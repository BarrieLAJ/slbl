import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FiCalendar } from "react-icons/fi";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "next/link";
// import { LinkProps } from "../Link";

const EventCard = (props: { name: string; startDate: string; imgSrc: string; id: string; alias: string }) => {
	return (
		<Card
			sx={{
				backgroundColor: "#E3ECFC",
			}}
		>
			{/* <CardActionArea href={`event/${props.id}`}> */}
			<CardMedia
				component="img"
				src={`http://localhost:1337${props.imgSrc}`}
				sx={{
					maxWidth: "100%",
					minWidth: "100%",
					height: "230px",
				}}
			/>
			<CardContent
				sx={{
					backgroundColor: "#E3ECFC",
				}}
			>
				<Typography
					sx={{
						fontSize: "20px",
						fontWeigth: 600,
					}}
				>
					{props.name}
				</Typography>
				<Box
					sx={{
						display: "flex",
						gap: 2,
					}}
				>
					<FiCalendar />
					<Typography
						sx={{
							fontWeight: 400,
							fontSize: "14px",
							color: "#002266s",
						}}
					>
						{new Date(props.startDate).getDate()}{" "}
						{new Date(props.startDate).toLocaleString("default", { month: "long" })}{" "}
						{new Date(props.startDate).getFullYear()}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					href={`event/${props.id}`}
					sx={{
						textTransform: "none",
					}}
				>
					Add Customer
				</Button>
				<Button
					variant="contained"
					// LinkComponent={Link}
					// LinkComponent={(props) => <Link href={{ pathname: "/raffle", query: { id: props.id } }} />}
					href={`/raffle?id=${props.id}&alias=${props.alias}`}
					sx={{
						textTransform: "none",
					}}
				>
					Raffle Draw
				</Button>
			</CardActions>
			{/* </CardActionArea> */}
		</Card>
	);
};

export default EventCard;
