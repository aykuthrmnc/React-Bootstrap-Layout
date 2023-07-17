import { NavLink } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";
import React, { useState } from "react";
import { MenuItemTypes } from "~/constants/menu";

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

const MenuItem = ({ item }: { item: MenuItemTypes; isNavbar?: boolean }) => (
  <Nav.Link to={item?.url || "/#"} as={NavLink} className="d-flex align-items-center gap-2">
    {item?.icon} {item?.label}
  </Nav.Link>
);

const MenuItemWithChildren = ({
  item,
  activeMenuItems,
  toggleMenu,
  isNavbar = false,
  setActiveMenuItems,
}: {
  item: MenuItemTypes;
  activeMenuItems?: any;
  toggleMenu?: any;
  isNavbar?: boolean;
  setActiveMenuItems?: any;
}) => {
  return (
    <Dropdown drop={isNavbar ? "down" : "end"} className="d-flex flex-column flex-lg-row">
      <Dropdown.Toggle as="button" className={`dropdown-item flex-fill d-flex align-items-center nav-link gap-2`}>
        {item?.icon} {item?.label}
      </Dropdown.Toggle>
      <Dropdown.Menu renderOnMount>
        {item?.children?.map((subItem, key) => (
          <React.Fragment key={key}>
            {subItem?.children ? (
              <MenuItemWithChildren
                item={subItem}
                toggleMenu={toggleMenu}
                activeMenuItems={activeMenuItems}
                setActiveMenuItems={setActiveMenuItems}
              />
            ) : (
              <Dropdown.Item as="div" className="p-0">
                <MenuItem item={subItem} />
              </Dropdown.Item>
            )}
          </React.Fragment>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Topbar = ({ menuItems }: { menuItems: MenuItemTypes[] }) => {
  const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

  //   const theme = useSelector((state: RootState) => state.auth.theme);
  //   const { companyName } = useSelector((state: RootState) => state.auth.user)!;

  const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
    if (show) setActiveMenuItems([menuItem?.key, ...findAllParent(menuItems, menuItem)]);
  };

  // useEffect(() => {
  //   setActiveMenuItems([]);
  // }, [location]);

  return menuItems.map((item, key) => (
    <React.Fragment key={key}>
      {!item.isTitle &&
        (item.children ? (
          <MenuItemWithChildren
            isNavbar
            item={item}
            toggleMenu={toggleMenu}
            activeMenuItems={activeMenuItems}
            setActiveMenuItems={setActiveMenuItems}
          />
        ) : (
          <MenuItem item={item} isNavbar />
        ))}
    </React.Fragment>
  ));
};

export default Topbar;
