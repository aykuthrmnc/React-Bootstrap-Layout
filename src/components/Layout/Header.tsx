import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { FaCog } from "react-icons/fa";
import { FaBars, FaMoon, FaPowerOff, FaSun, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { setThemeHandle, userLogoutHandle } from "~/store/apiHandle";

const Header = ({ toggleMenu, setToggleMenu }: any) => {
  const theme = useSelector((state: RootState) => state.auth.theme);

  return (
    <div className="header">
      <Navbar expand="lg" className="navbar-classic">
        <a onClick={() => setToggleMenu(!toggleMenu)}>
          <FaBars className="nav-icon me-2 icon-xs" />
        </a>
        <Nav className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
          <Dropdown className="ms-2">
            <Dropdown.Toggle as="div" className="rounded-circle" role="button" id="dropdownUser">
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <img alt="avatar" src="/src/assets/images/avatar/avatar-1.jpg" className="rounded-circle" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" aria-labelledby="dropdownUser">
              <div className="px-4 pt-2">
                <h5 className="mb-1">Aykut Harmancı</h5>
                <a href="#" className="fs-6">
                  Profile Git
                </a>
              </div>
              <Dropdown.Divider className="mx-4" />
              <Dropdown.Item>
                {/* <i className="me-2 icon-xxs text-primary dropdown-item-icon" data-feather="user" /> */}
                <FaUser className="me-2 icon-xxs" /> Profil
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <FaSun className="me-2 icon-xxs" /> : <FaMoon className="me-2 icon-xxs" />} Tema Değiştir
              </Dropdown.Item>
              <Dropdown.Item>
                <FaCog className="me-2 icon-xxs" /> Ayarlar
              </Dropdown.Item>
              <Dropdown.Item onClick={() => userLogoutHandle()}>
                <FaPowerOff className="me-2 icon-xxs" /> Çıkış Yap
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </div>
  );
};
export default Header;
