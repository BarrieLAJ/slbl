import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FiCalendar } from "react-icons/fi";

const EventCard = (props: { name: string; startDate: string; imgSrc: string; id: string }) => {
	return (
		<Card>
			<CardActionArea href={`event/${props.id}`}>
				<CardMedia
					component="img"
					src=""
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
			</CardActionArea>
		</Card>
	);
};

export default EventCard;
