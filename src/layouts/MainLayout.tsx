import Header from "~/components/Layout/Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
