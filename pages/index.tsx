import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "../src/components/Layout";
import Grid from "@mui/material/Grid";
import EventCard from "../src/components/EventCard";

const Home: NextPage = () => {
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
          {["1", "2", "3", "4", "5", "6", "7", "8"].map(() => {
            return (
              <Grid
                item
                md={3}
                sx={{
                  maxWidth: "300px",
                  width: "300px",
                }}
              >
                <EventCard />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
