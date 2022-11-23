import Container from "@mui/material/Container";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../src/components/Layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { animate } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const StyledImg = styled("img")``;

interface RaffleData {
	data: {
		raffleTicketWinner: any;
		itemsWon: any;
		raffleTicketWinners: any;
		itemsCount: any;
	};
}

const Raffle = () => {
	const [spin, setSpin] = useState(false);
	const [spinComplete, setSpinComplete] = useState(false);
	const [showWinner, setShowWinner] = useState(false);
	const counterRef1 = useRef<HTMLParagraphElement | null>(null);
	const counterRef2 = useRef<HTMLParagraphElement | null>(null);
	const counterRef3 = useRef<HTMLParagraphElement | null>(null);
	const { query } = useRouter();
	const { id, alias } = query;
	const { data, isLoading, error } = useQuery<RaffleData>(
		["raffleWinner"],
		async () => {
			const res = await axios.get(`http://localhost:1337/api/raffle-winner/${id}`);
			console.log(res);
			return res.data;
		},
		{
			enabled: spin,
		}
	);
	useEffect(() => {
		if (spinComplete === true) {
			if (counterRef1.current && counterRef2.current && counterRef3.current) {
				counterRef1.current.innerHTML = `${data?.data.raffleTicketWinner.raffle_titcket_code.split("").at(-3)}`;
				counterRef2.current.innerHTML = `${data?.data.raffleTicketWinner.raffle_titcket_code.split("").at(-2)}`;
				counterRef3.current.innerHTML = `${data?.data.raffleTicketWinner.raffle_titcket_code.split("").at(-1)}`;
			}
			setTimeout(() => {
				setShowWinner(true);
				setSpinComplete(false);
			}, 500);
		}
	}, [spinComplete]);

	useEffect(() => {
		if (spin) {
			const controls = animate(0, 9, {
				stiffness: 100,
				duration: 0.9,
				ease: "easeInOut",
				repeat: 5,
				onUpdate(value) {
					if (counterRef1.current && counterRef2.current && counterRef3.current) {
						counterRef1.current.innerHTML = `${(value - 1 < 0 ? 0 : value - 1).toFixed(0)}`;
						counterRef2.current.innerHTML = `${value.toFixed(0)}`;
						counterRef3.current.innerHTML = `${(value + 1 > 9 ? 9 : value + 1).toFixed(0)}`;
					}
				},
				onComplete() {
					setSpinComplete(true);
					setSpin(false);
				},
			});

			return () => controls.stop();
		}
	}, [spin]);
	return (
		<Layout title="Raffle" otherLogo>
			<Dialog
				open={showWinner}
				onClose={() => {
					setShowWinner(false);
				}}
				maxWidth="lg"
				sx={{
					py: 6,
					mx: "auto",
				}}
			>
				<DialogContent sx={{ width: "665px", py: 10 }}>
					<Typography
						gutterBottom
						sx={{
							textAlign: "center",
							fontWeight: 600,
							fontSize: "56px",
							color: "#0037A3",
							mb: 3,
						}}
					>
						WINNER!!!
					</Typography>
					<Typography
						gutterBottom
						sx={{
							textAlign: "center",
							fontWeight: 600,
							fontSize: "24px",
							color: "#0037A3",
						}}
					>
						You’ve won a...
					</Typography>
					<Box mx="auto" width="100%" display="flex" justifyContent="center">
						<StyledImg
							src="/images/drinks.png"
							width="376px"
							sx={{
								backgroundColor: (theme) => theme.palette.primary.light,
								mx: "auto",
							}}
						/>
					</Box>
				</DialogContent>
			</Dialog>
			<Container>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						height: "96px",
						alignItems: "center",
					}}
				>
					<img src="/images/drinks.png" width="144px" height="75px" alt="" />
					<Box>
						<Typography
							display="inline"
							textAlign="center"
							sx={{
								mr: 1,
								fontSize: "56px",
								fontWeight: 700,
								color: "#0037A3",
							}}
						>
							Raffle
						</Typography>
						<Typography
							display="inline"
							sx={{
								fontSize: "56px",
								fontWeight: 700,
								color: "#F4CE2F",
							}}
						>
							Draw
						</Typography>
					</Box>
					<img src="/images/drinks.png" width="144px" height="75px" alt="" />
				</Box>
			</Container>
			<Box
				sx={{
					backgroundImage: `url("/images/bg1.jpg")`,
					height: "71.8vh",
					width: "100%",
					backgroundRepeat: "no-repeat",
					overflow: "hidden",
					backgroundSize: "cover",
					position: "relative",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<StyledImg
					src="/images/RAFFLEMACHINE.png"
					width="440px"
					height="311px"
					sx={{
						position: "absolute",
						top: -3,
						right: -90,
					}}
				/>
				<StyledImg
					src="/images/RAFFLEMACHINE.png"
					width="440px"
					height="311px"
					sx={{
						position: "absolute",
						bottom: -50,
						left: -90,
					}}
				/>
				<Box
					sx={{
						display: "flex",
						gap: 1,
						textAlign: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						sx={{
							fontSize: "56px",
							color: "white",
						}}
					>
						Win
					</Typography>
					<Typography
						sx={{
							fontSize: "64px",
							color: "#F4CE2F",
						}}
					>
						PRIZES
					</Typography>
				</Box>
				<Box
					sx={{
						mt: 5,
						display: "flex",
						gap: 3,
						width: "fit-content",
					}}
				>
					<Box
						sx={{
							height: "120px",
							width: "120px",
							borderRadius: "10px",
							border: "5px solid #FFFFFF",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							sx={{
								color: "#F4CE2F",
								fontSize: "76px",
								fontWeight: 800,
								textTransform: "uppercase",
							}}
						>
							{alias?.at(0)}
						</Typography>
					</Box>
					<Box
						sx={{
							height: "120px",
							width: "120px",
							borderRadius: "10px",
							border: "5px solid #FFFFFF",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							sx={{
								color: "#F4CE2F",
								fontSize: "76px",
								fontWeight: 800,
								textTransform: "uppercase",
							}}
						>
							{alias?.at(1)}
						</Typography>
					</Box>
					<Box
						sx={{
							height: "120px",
							width: "120px",
							borderRadius: "10px",
							border: "5px solid #FFFFFF",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							component="p"
							ref={counterRef1}
							sx={{
								color: "#F4CE2F",
								fontSize: "76px",
								fontWeight: 800,
							}}
						>
							5
						</Typography>
					</Box>
					<Box
						sx={{
							height: "120px",
							width: "120px",
							borderRadius: "10px",
							border: "5px solid #FFFFFF",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							component="p"
							ref={counterRef2}
							sx={{
								color: "#F4CE2F",
								fontSize: "76px",
								fontWeight: 800,
							}}
						>
							0
						</Typography>
					</Box>
					<Box
						sx={{
							height: "120px",
							width: "120px",
							borderRadius: "10px",
							border: "5px solid #FFFFFF",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							component="p"
							ref={counterRef3}
							sx={{
								color: "#F4CE2F",
								fontSize: "76px",
								fontWeight: 800,
							}}
						>
							8
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						mt: 10,
					}}
				>
					<Button
						variant="contained"
						disabled={data === undefined ? false : data.data.itemsWon.length === 0}
						sx={{
							backgroundColor: "#fff",
							px: 5,
							color: "primary.main",
							fontSize: "40px",
							"&:hover": {
								backgroundColor: "#fff",
								color: "primary.main",
							},
						}}
						onClick={() => {
							setSpin(true);
						}}
					>
						Spin
					</Button>
				</Box>
			</Box>
		</Layout>
	);
};

export default Raffle;
