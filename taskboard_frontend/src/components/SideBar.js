import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useParams, useNavigate } from "react-router-dom";
import {
  Group,
  Image,
  Public,
  SettingsEthernet,
  SettingsInputComponent,
  Dns,
} from "@mui/icons-material";
import { navbarStyles } from "./Styles";
import Grid from "@mui/material/Grid";

const SideBar = () => {
  const drawerWidth = 240;

  const NavBarItems = [
    {
      id: 0,
      text: "Boards",
      icon: <DashboardIcon />,
      root: "board",
    },
    // {
    //   id: 1,
    //   text: "Database",
    //   icon: <Image />,
    //   root: "database",
    // },
    // {
    //   id: 3,
    //   text: "Storage",
    //   icon: <Public />,
    //   root: "storage",
    // },
    // {
    //   id: 4,
    //   text: "Hosting",
    //   icon: <SettingsEthernet />,
    //   root: "hosting",
    // },
    // {
    //   id: 5,
    //   text: "Function",
    //   icon: <SettingsInputComponent />,
    //   root: "function",
    // },
    // {
    //   id: 6,
    //   text: "Machin learning",
    //   icon: <Dns />,
    //   root: "machin-learning",
    // },
  ];

  const navigate = useNavigate();

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {NavBarItems.map((item, index) => (
          <ListItem key={item.id}>
            <ListItemButton
              sx={navbarStyles.textColor}
              onClick={() => navigate(item.root)}
            >
              <ListItemIcon sx={navbarStyles.textColor}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
