import { useEffect, useState } from "react";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import './sidebar.css';
import BoardSearch from "../../pages/Boards/BoardSearch";
import Popup from "../../pages/Boards/Popup";
import BoardForm from "../../pages/Boards/BoardForm";

function Sidebar({ showSidebar, setShowSideBar }) {
  const [listBoards, setListboards] = useState([]);
  const [searched, setSearched] = useState("");
  const [recordUpdate, setRecordUpdate] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  
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
  }, [listBoards]);
  
  const SidebarItems = listBoards.map((list, index) => ({
    id: index,
    title: list.name,
    icon: <DashboardIcon/>,
    path: `taskboard/${list._id}`,
    cName: 'side-text'
  }));
  
  return (
    <>
      <nav className={showSidebar ? 'sidebar active' : 'sidebar'}>
        <ul className='side-menu-items'>
          <Link to='#' className='menu-bars'>
            <div className='direction'>
              <ChevronLeftIcon className='chevronLeft' onClick={hideSideBar}/>
              <ChevronRightIcon className={showSidebar && 'chevronRight'} onClick={hideSideBar}/>
            </div>
            <BoardSearch searched={searched} setSearched={setSearched}/>
          </Link>
          <div style={{
            paddingLeft: 20,
            paddingRight: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: '#FFF',
          }}>
            <p>Your boards</p>
            <AddIcon sx={{
              '&:hover': {
                backgroundColor: '#112162',
                borderRadius: 1,
                cursor: 'pointer'
              }
            }} onClick={() => setOpenPopup(true)}/>
          </div>
          {SidebarItems.filter((item) => item.title.toLowerCase().includes(searched.toLowerCase()))
            .map((item, index) => {
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setRecordUpdate={setRecordUpdate}
        recordUpdate={recordUpdate}
        title={"New board"}
      >
        <BoardForm
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          recordUpdate={recordUpdate}
        />
      </Popup>
    </>
  );
}

export default Sidebar;
