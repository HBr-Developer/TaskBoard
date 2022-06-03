import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {useNavigate} from "react-router-dom";
import {navbarStyles} from "./Styles";
import {useEffect, useState} from "react";
import axios from "axios";

const Navbar = () => {
    const [listBoards, setListboards] = useState([]);

    const getListBoards = async () => {
        try {
            const b = await axios.get("http://localhost:3001/board");

            setListboards(b.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getListBoards();
    }, []);
    const NavBarItems = listBoards.map((list, index) => ({
        id: index,
        text: list.name,
        icon: <DashboardIcon/>,
        root: `taskboard/${list._id}`,
    }));

    const navigate = useNavigate();

    return (
        <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
            <Toolbar/>
            <Divider/>
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
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Navbar;
