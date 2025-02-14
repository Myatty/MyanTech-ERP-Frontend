import React from "react";
import { Box, List } from "@mui/material";
import { useLocation } from "react-router";
import Menuitems from "./MenuItems";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

import { jwtDecode } from "jwt-decode";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const token = localStorage.getItem("authToken");
  let deptName;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      deptName = decoded.dept_name;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const filteredMenu = Menuitems.filter((item) => {
    if (!item.allowedDepts) return false;
    return item.allowedDepts.includes(deptName);
  });

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredMenu.map((item) => {
          if (item.navlabel) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
