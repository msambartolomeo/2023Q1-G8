import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const MainLayout: FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default MainLayout;