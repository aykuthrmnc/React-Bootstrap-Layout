import classNames from "classnames";
import { useState } from "react";
import { Collapse, Dropdown, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaBuilding, FaCalendar, FaCalendarCheck, FaHome, FaPager, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "~/store";
import { setThemeHandle, userLogoutHandle } from "~/utils";

const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(true);
  const theme = useSelector((state: RootState) => state.auth.theme);
  const [open, setOpen] = useState(false);

  return (
    <div id="sidebar" className="d-none d-lg-block">
      <div
        className="d-flex flex-column flex-shrink-0 bg-body-tertiary sticky-top min-vh-100"
        style={{ width: isExpand ? "18rem" : "4rem", transition: "width .2s ease" }}
      >
        <Nav variant="pills" fill={!isExpand} className="flex-column mb-auto">
          {/* <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": !change })}>ANASAYFA</Tooltip>}> */}
          <Nav.Item>
            <div className="position-relative">
              <Nav.Link
                as={NavLink}
                to="/"
                className={classNames("link-body-emphasis d-flex align-items-center gap-2 p-3 border-bottom rounded-0", {
                  "mb-3 bg-transparent": isExpand,
                  "justify-content-center": !isExpand,
                })}
              >
                <FaHome size="24" />
                {isExpand && <span className="fs-5">AYKUTHRMNC</span>}
              </Nav.Link>
            </div>
          </Nav.Item>
          {/* </OverlayTrigger> */}
          <div className={classNames({ "px-3": isExpand })}>
            <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Personeller</Tooltip>}>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/personeller" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                  {isExpand ? "Personeller" : <FaUser />}
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>İzinler</Tooltip>}>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/izinler" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                  {isExpand ? "İzinler" : <FaCalendarCheck />}
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Takvim</Tooltip>}>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/takvim" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                  {isExpand ? "Takvim" : <FaCalendar />}
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Şirket</Tooltip>}>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/sirket" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                  {isExpand ? "Şirket" : <FaBuilding />}
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Raporlar</Tooltip>}>
              {/* <Nav.Item>
                <Nav.Link as={NavLink} to="/raporlar" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                  {isExpand ? "Raporlar" : <FaPager />}
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  className={classNames("link-body-emphasis", { "toggle d-flex align-items-center": isExpand, "rounded-0 border-bottom": !isExpand })}
                >
                  {isExpand ? "Raporlar" : <FaPager />}
                </Nav.Link>
              </Nav.Item>
            </OverlayTrigger>
            <Collapse in={open}>
              <div>
                <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Raporlar</Tooltip>}>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/raporlar" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                      {isExpand ? "Raporlar 1" : <FaPager />}
                    </Nav.Link>
                  </Nav.Item>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": isExpand })}>Raporlar</Tooltip>}>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/raporlar2" className={classNames("link-body-emphasis", { "rounded-0 border-bottom": !isExpand })}>
                      {isExpand ? "Raporlar 2" : <FaPager />}
                    </Nav.Link>
                  </Nav.Item>
                </OverlayTrigger>
              </div>
            </Collapse>
          </div>
        </Nav>
        <Dropdown drop="end">
          <Dropdown.Toggle
            variant=""
            bsPrefix={isExpand ? "gap-2" : "justify-content-center"}
            className="link-body-emphasis border-0 d-flex align-items-center w-100 border-top py-2 rounded-0"
          >
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            {isExpand && <span>Aykut Harmancı</span>}
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="p-2">
            <Dropdown.Item className="rounded-1" onClick={() => setIsExpand(!isExpand)}>
              {isExpand ? "Menüyü Daralt" : "Menüyü Genişlet"}
            </Dropdown.Item>
            <Dropdown.Item className="rounded-1" onClick={() => setThemeHandle(theme === "dark" ? "light" : "dark")}>
              Tema Değiştir
            </Dropdown.Item>
            <Dropdown.Item className="rounded-1">Ayarlar</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="rounded-1" onClick={() => userLogoutHandle()}>
              Çıkış Yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
