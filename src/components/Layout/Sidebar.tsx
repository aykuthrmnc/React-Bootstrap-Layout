import classNames from "classnames";
import { Container, Dropdown, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaBuilding, FaCalendar, FaCalendarCheck, FaHome, FaPager, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "~/store";
import { setThemeHandle, userLogoutHandle } from "~/utils";

const Sidebar = ({ change }: any) => {
  const theme = useSelector((state: RootState) => state.auth.theme);

  return (
    <div id="sidebar">
      <Navbar
        expand="lg"
        className="bg-body-tertiary p-lg-0 sticky-lg-top w-xs-100"
        style={{ width: change ? "4rem" : "18rem", transition: "width .2s ease" }}
      >
        <Container fluid className="px-lg-0 align-items-stretch min-vh-lg-100 gap-3">
          <Navbar.Brand as={NavLink} to="/" className="d-flex d-lg-none align-items-center gap-2">
            <FaHome size="24" />
            <span>AYKUTHRMNC</span>
          </Navbar.Brand>
          <Navbar.Toggle className="border-0 shadow-none" />

          <Navbar.Collapse className="flex-lg-column align-items-lg-stretch">
            <Nav variant="pills" fill={change} className="flex-column mb-auto">
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>AYKUTHRMNC</Tooltip>}
              >
                <Nav.Item>
                  <Nav.Link
                    as={NavLink}
                    to="/"
                    className={classNames("link-body-emphasis d-none d-lg-flex align-items-center gap-2 p-3 border-bottom rounded-0 mx-lg-0", {
                      "mb-lg-3 bg-transparent": !change,
                      "border-bottom justify-content-center": change,
                    })}
                  >
                    <FaHome size="24" />
                    <span className={classNames({ "d-lg-none": change })}>AYKUTHRMNC</span>
                  </Nav.Link>
                </Nav.Item>
              </OverlayTrigger>
              <div className={classNames({ "px-lg-3": !change })}>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>Personeller</Tooltip>}
                >
                  <div className="nav-item">
                    <Nav.Link
                      as={NavLink}
                      to="/personeller"
                      className={classNames("link-body-emphasis d-flex align-items-center justify-content-lg-center gap-2 text-start", {
                        "text-lg-center rounded-0 border-bottom py-3": change,
                      })}
                    >
                      <FaUser className={classNames({ "d-lg-none": !change })} />
                      <span className={classNames("me-auto", { "d-lg-none": change })}>Personeller</span>
                    </Nav.Link>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>İzinler</Tooltip>}
                >
                  <div className="nav-item">
                    <Nav.Link
                      as={NavLink}
                      to="/izinler"
                      className={classNames("link-body-emphasis d-flex align-items-center justify-content-lg-center gap-2 text-start", {
                        "text-lg-center rounded-0 border-bottom py-3": change,
                      })}
                    >
                      <FaCalendarCheck className={classNames({ "d-lg-none": !change })} />
                      <span className={classNames("me-auto", { "d-lg-none": change })}>İzinler</span>
                    </Nav.Link>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>Takvim</Tooltip>}
                >
                  <div className="nav-item">
                    <Nav.Link
                      as={NavLink}
                      to="/takvim"
                      className={classNames("link-body-emphasis d-flex align-items-center justify-content-lg-center gap-2 text-start", {
                        "text-lg-center rounded-0 border-bottom py-3": change,
                      })}
                    >
                      <FaCalendar className={classNames({ "d-lg-none": !change })} />
                      <span className={classNames("me-auto", { "d-lg-none": change })}>Takvim</span>
                    </Nav.Link>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>Şirket</Tooltip>}
                >
                  <div className="nav-item">
                    <Nav.Link
                      as={NavLink}
                      to="/sirket"
                      className={classNames("link-body-emphasis d-flex align-items-center justify-content-lg-center gap-2 text-start", {
                        "text-lg-center rounded-0 border-bottom py-3": change,
                      })}
                    >
                      <FaBuilding className={classNames({ "d-lg-none": !change })} />
                      <span className={classNames("me-auto", { "d-lg-none": change })}>Şirket</span>
                    </Nav.Link>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip className={classNames("d-none", { "d-lg-block": change, "d-lg-none": !change })}>Raporlar</Tooltip>}
                >
                  <div className="nav-item">
                    <Nav.Link
                      as={NavLink}
                      to="/raporlar"
                      className={classNames("link-body-emphasis d-flex align-items-center justify-content-lg-center gap-2 text-start", {
                        "text-lg-center rounded-0 border-bottom py-3": change,
                      })}
                    >
                      <FaPager className={classNames({ "d-lg-none": !change })} />
                      <span className={classNames("me-auto", { "d-lg-none": change })}>Raporlar</span>
                    </Nav.Link>
                  </div>
                </OverlayTrigger>
              </div>
            </Nav>
            <Dropdown drop="end">
              <Dropdown.Toggle
                variant=""
                bsPrefix={change ? "justify-content-center" : "gap-2"}
                className="link-body-emphasis border-0 d-flex align-items-center w-100 border-top px-0 px-lg-3 py-2 rounded-0"
              >
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                <span className={classNames({ "d-lg-none": change })}>Aykut Harmancı</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>Tema Değiştir</Dropdown.Item>
                <Dropdown.Item>Ayarlar</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => userLogoutHandle()}>Çıkış Yap</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Sidebar;
