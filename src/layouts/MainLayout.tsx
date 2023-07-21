import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "~/components/Layout/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [change, setChange] = useState(false);

  return (
    <div className="d-flex flex-column flex-lg-row">
      <Sidebar change={change} />
      {/* <Header2 /> */}
      {/* <Header /> */}
      <Container fluid className="p-3">
        <button onClick={() => setChange(!change)}>Değiştir</button>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
