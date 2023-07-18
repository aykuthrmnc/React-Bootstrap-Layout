import classNames from "classnames";
import { Dropdown, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ change }: any) => {
  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary sticky-top min-vh-100" style={{ width: change ? "4rem" : "18rem" }}>
        <Link to="/" className={classNames("d-flex align-items-center gap-2 text-white text-decoration-none p-3", { "border-bottom mb-3": !change })}>
          <FaHome size="32" />
          {!change && <span className="fs-4">AYKUTHRMNC</span>}
        </Link>

        <Nav variant="pills" fill={change} className={classNames("flex-column mb-auto", { "px-3": !change })}>
          <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": !change })}>ANASAYFA</Tooltip>}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/" className={classNames("link-body-emphasis", { "py-3 rounded-0 border-bottom": change })}>
                {change ? <FaHome size="24" /> : "Anasayfa"}
              </Nav.Link>
            </Nav.Item>
          </OverlayTrigger>
          <OverlayTrigger placement="right" overlay={<Tooltip className={classNames({ "d-none": !change })}>HAKKIMDA</Tooltip>}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" className={classNames("link-body-emphasis", { "py-3 rounded-0 border-bottom": change })}>
                {change ? <FaHome size="24" /> : "Hakkımda"}
              </Nav.Link>
            </Nav.Item>
          </OverlayTrigger>
        </Nav>
        <Dropdown drop="end">
          <Dropdown.Toggle
            variant=""
            bsPrefix={change ? "justify-content-center" : "gap-2"}
            className={classNames("link-body-emphasis border-0 d-flex  align-items-center w-100 border-top p-3 rounded-0")}
          >
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            {!change && "Aykut Harmancı"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-small shadow p-2 d-grid gap-1 rounded-2">
            <Dropdown.Item className="rounded-2">New project...</Dropdown.Item>
            <Dropdown.Item className="rounded-2">Settings</Dropdown.Item>
            <Dropdown.Item className="rounded-2">Profile</Dropdown.Item>
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item className="rounded-2">Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
export default Sidebar;
