import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Head from "next/head";

const Layout = (props: { title: string; children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "#002266",
          height: "152px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/images/SlBLLogoWhite.png" />
      </Box>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
