import { Outlet } from "react-router-dom";
import { Container, Fade } from "react-bootstrap";
import Sidebar from "~/components/Layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column flex-lg-row">
      <Sidebar />
      {/* <Header2 /> */}
      {/* <Header /> */}
      <Container fluid className="p-3">
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
