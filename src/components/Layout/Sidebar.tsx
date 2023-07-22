import React, { useEffect, useState } from "react";
import { Collapse, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

type MenuItemTypes = {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: any;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
  permissions?: any;
};

const findAllParent = (menuItems: MenuItemTypes[], menuItem: MenuItemTypes): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem?.parentKey);

  if (parent) {
    parents.push(parent?.key);
    if (parent?.parentKey) parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

const findMenuItem = (menuItems: MenuItemTypes[] | undefined, menuItemKey: MenuItemTypes["key"] | undefined): MenuItemTypes | null => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

const MenuItem = ({ item }: { item: MenuItemTypes }) => (
  <Nav.Item>
    {item?.isTitle ? (
      <div className="navbar-heading">{item?.label}</div>
    ) : (
      <Nav.Link to={item?.url + ""} as={NavLink}>
        {item?.icon} {item?.label}
      </Nav.Link>
    )}
  </Nav.Item>
);

const MenuItemWithChildren = ({ item, activeMenuItems, toggleMenu }: { item: MenuItemTypes; activeMenuItems?: any; toggleMenu?: any }) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const toggle = () => {
    setOpen(!open);
    if (toggleMenu) toggleMenu(item, !open);
  };

  useEffect(() => {
    setOpen(activeMenuItems!.includes(item.key));
  }, [activeMenuItems, item]);

  return (
    <Nav.Item>
      <Nav.Link onClick={toggle} data-bs-toggle="collapse">
        {item?.icon} {item?.label}
      </Nav.Link>

      <Collapse in={open}>
        <Nav navbar={false} className="flex-column">
          {item?.children?.map((subItem, key) =>
            subItem?.children ? (
              <MenuItemWithChildren item={subItem} toggleMenu={toggleMenu} activeMenuItems={activeMenuItems} key={key} />
            ) : (
              <MenuItem item={subItem} key={key} />
            )
          )}
        </Nav>
      </Collapse>
    </Nav.Item>
  );
};

const Sidebar = ({ menuItems }: { menuItems: MenuItemTypes[] }) => {
  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) setActiveMenuItems([menuItem?.key, ...findAllParent(menuItems, menuItem)]);
  };
  return (
    <Navbar className="navbar-vertical" expand={false}>
      <div className="nav-scroller">
        {/* Brand logo */}
        <Navbar.Brand as={Link} to="/">
          AYKUTHRMNC
        </Navbar.Brand>
        {/* Navbar nav */}
        <Nav id="sideNavbar">
          {menuItems?.map((item, key) => (
            <React.Fragment key={key}>
              {item.children ? (
                <MenuItemWithChildren
                  item={item}
                  toggleMenu={toggleMenu}
                  activeMenuItems={activeMenuItems}
                  // subMenuClassNames="nav-second-level"
                  // linkClassName="side-nav-link"
                />
              ) : (
                <MenuItem
                  item={item}
                  // linkClassName="side-nav-link" className={activeMenuItems!.includes(item.key) ? "menuitem-active" : ""}
                />
              )}
            </React.Fragment>
          ))}
        </Nav>
      </div>
    </Navbar>
  );
};
export default Sidebar;
