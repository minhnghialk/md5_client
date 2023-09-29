import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { List } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Link } from "react-router-dom";

export interface SideBarMenuProps {
  open: boolean;
}
export const SideBarMenu = (props: SideBarMenuProps) => {
  const { open } = props;

  const menuItems = [
    {
      id: 1,
      icon: <StorefrontOutlinedIcon />,
      text: "Products",
      link: "products",
    },
    {
      id: 2,
      icon: <ChecklistOutlinedIcon />,
      text: "Orders",
      link: "orders",
    },
    {
      id: 3,
      icon: <PeopleAltOutlinedIcon />,
      text: "Users",
      link: "users",
    },
  ];

  const ListItemSx = { display: "block" };

  const ListItemButtonSx = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  };

  const ListItemIconSx = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  const ListItemTextSx = { opacity: open ? 1 : 0 };

  return (
    <List>
      {menuItems.map((item) => (
        <Link key={item.id} to={item.link}>
          <ListItem disablePadding sx={ListItemSx}>
            <ListItemButton sx={ListItemButtonSx}>
              <ListItemIcon sx={ListItemIconSx}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={ListItemTextSx} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
