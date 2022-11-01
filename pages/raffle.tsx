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

const StyledImg = styled("img")();
let number = "345";

const Raffle = () => {
  const [spin, setSpin] = useState(false);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const { data: raffleEvent, error } = useQuery(
    ["getRaffleWinner"],
    async () => {
      const response = await fetch(
        `/api/getRafflesById?event_Id=${"a6813d12-213e-4506-bfad-86ddc0a701ee"}`
      );
      return response;
    },
    {
      enabled: spin,
    }
  );
  useEffect(() => {
    if (spin) {
      const controls = animate(0, 999, {
        stiffness: 50,
        duration: 1,
        ease: "easeInOut",
        onUpdate(value) {
          if (counterRef.current) {
            number = `${value.toFixed(0)}`;
          }
          console.log(value);
        },
      });

      return () => controls.stop();
    }
  }, [spin]);
  return (
    <Layout title="Raffle" otherLogo>
      <Dialog
        open={false}
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
              }}
            >
              L
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
              }}
            >
              M
            </Typography>
          </Box>
          {number.split("").map((a) => {
            return (
              <>
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
                    sx={{
                      color: "#F4CE2F",
                      fontSize: "76px",
                      fontWeight: 800,
                    }}
                  >
                    8
                  </Typography>
                </Box>
              </>
            );
          })}
        </Box>
        <Box
          sx={{
            mt: 10,
          }}
        >
          <Button
            variant="contained"
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
