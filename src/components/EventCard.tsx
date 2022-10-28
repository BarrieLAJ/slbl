import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const EventCard = () => {
  return (
    <Card>
      <CardActionArea>
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
            Lorem ipsum event
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <></>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                color: "#002266s",
              }}
            >
              28/10/22
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
