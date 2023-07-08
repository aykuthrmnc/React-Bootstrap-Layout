import { Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { setThemeHandle, userLogoutHandle } from "~/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Topbar from "./Topbar";
import { HESAPMEN_MENU } from "~/constants/menu";

const Sidebar = () => {
  const theme = useSelector((state: RootState) => state.auth.theme);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container className="justify-content-between" id="sidebar">
        <Navbar.Brand as={Link} to="/">
          AYKUTHRMNC
        </Navbar.Brand>
        <Navbar.Toggle className="border-0 shadow-none" />

        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>AYKUTHRMNC</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-fill" id="topbar">
              <Topbar menuItems={HESAPMEN_MENU} />
              <hr />
              <Dropdown className="ms-lg-auto d-flex flex-column flex-lg-row" align="end">
                <Dropdown.Toggle as="button" className={`dropdown-item flex-fill d-flex align-items-center nav-link gap-2`}>
                  Profil
                </Dropdown.Toggle>
                <Dropdown.Menu renderOnMount>
                  <Dropdown.Item onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>Tema Değiştir</Dropdown.Item>
                  <Dropdown.Item>Ayarlar</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => userLogoutHandle()}>Çıkış Yap</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <NavDropdown title="Profil" className="ms-lg-auto d-flex align-items-center gap-2" align="end">
                <NavDropdown.Item onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>Tema Değiştir</NavDropdown.Item>
                <NavDropdown.Item>Ayarlar</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => userLogoutHandle()}>Çıkış Yap</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default Sidebar;
