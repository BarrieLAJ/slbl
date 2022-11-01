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
import { useMutation } from "@tanstack/react-query";
import { FiCheckCircle } from "react-icons/fi";

const Event = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const mutation = useMutation(
    (data: {
      name: string;
      email: string;
      location: string;
      phoneNumber: string;
    }) => {
      return fetch("/api/addCustomerRaffleTicket", {
        method: "post",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          location: data.location,
          phoneNumber: data.phoneNumber,
          eventSlug: query.slug,
        }),
      });
    }
  );
  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(mutation.isSuccess);
    }
    // if()
  }, [mutation]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phoneNumber: "",
  });

  const handleChange = (e: {
    target: {
      value: any;
      name: any;
    };
  }) => {
    console.log(e.target.value);
    setFormData((prevState) =>
      Object.assign({}, prevState, { [e.target.name]: e.target.value })
    );
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
          <Stack
            width={{ md: "60%" }}
            mx="auto"
            spacing={5}
            justifyContent="center"
            height="100%"
          >
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
                value={formData["phoneNumber"]}
                name="phoneNumber"
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
      </Container>
    </Layout>
  );
};

export default Event;
