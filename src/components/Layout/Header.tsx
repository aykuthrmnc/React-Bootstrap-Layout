import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { setThemeHandle, userLogoutHandle } from "~/utils";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

const Header = () => {
  const theme = useSelector((state: RootState) => state.auth.theme);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AYKUTHRMNC
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="flex-fill">
            <Nav.Link as={NavLink} to="/">
              Anasayfa
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              Hakkımızda
            </Nav.Link>
            <NavDropdown title="Profil" className="ms-lg-auto" align="end">
              <NavDropdown.Item onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>Tema Değiştir</NavDropdown.Item>
              <NavDropdown.Item>Ayarlar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => userLogoutHandle()}>Çıkış Yap</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
