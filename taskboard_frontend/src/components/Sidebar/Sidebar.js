import { useEffect, useState } from "react";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom'
import './sidebar.css';

function Sidebar({ showSidebar, setShowSideBar }) {
  const [listBoards, setListboards] = useState([]);
  
  
  const hideSideBar = () => {
    setShowSideBar(!showSidebar);
  }
  
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
  
  const SidebarItems = listBoards.map((list, index) => ({
    id: index,
    title: list.name,
    icon: <DashboardIcon/>,
    path: `taskboard/${list._id}`,
    cName: 'side-text'
  }));
  console.log('SidebarItems', SidebarItems);
  
  return (
    <nav className={showSidebar ? 'sidebar active' : 'sidebar'}>
      <ul className='side-menu-items'>
        <Link to='#' className='menu-bars'>
          <div className='direction'>
            <ChevronLeftIcon className='chevronLeft' onClick={hideSideBar}/>
            <ChevronRightIcon className={showSidebar && 'chevronRight'} onClick={hideSideBar}/>
          </div>
        </Link>
        {/*<li className='sidebar-toggle'>*/}
        {/*  */}
        {/*</li>*/}
        {SidebarItems.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;