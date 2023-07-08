// import Header from "~/components/Layout/Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "~/components/Layout/Sidebar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      {/* <Header /> */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
