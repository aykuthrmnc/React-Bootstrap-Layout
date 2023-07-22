import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "~/components/Layout/Sidebar";
import Header3 from "~/components/Layout/Header3";
import { HESAPMEN_MENU } from "~/constants/menu";
import { useState } from "react";

const MainLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div id="db-wrapper" className={toggleMenu ? "toggled" : ""}>
      <Sidebar menuItems={HESAPMEN_MENU} />
      {/* <Header2 /> */}
      {/* <Header /> */}
      <div id="page-content">
        <Header3 toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <Container fluid className="p-6">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
