import { GetServerSidePropsContext } from "next";
import React from "react";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/admin/analytics",
      parmanent: false,
    },
  };
};

const Index = () => null;


export default Index