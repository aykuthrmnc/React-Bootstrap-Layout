import { Outlet } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Sidebar from "~/components/Layout/Sidebar";
import Header from "~/components/Layout/Header";
import { HESAPMEN_MENU } from "~/constants/menu";
import { useState } from "react";

const MainLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div id="layout" className={toggleMenu ? "toggled" : ""}>
      <Sidebar menuItems={HESAPMEN_MENU} />
      <div id="content">
        <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <Container fluid className="p-6">
          <Card>
            <Card.Body>
              <Outlet />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
