import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";
const HomeTemplate = () => {
  return (
    <div>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </div>
  );
};

export default HomeTemplate;
