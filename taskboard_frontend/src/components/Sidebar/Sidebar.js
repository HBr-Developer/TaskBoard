import { useEffect, useState } from "react";
import axios from "axios";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import BoardSearch from "../Board/BoardSearch";
import Popup from "../../pages/Board/Popup";
import BoardForm from "../Board/BoardForm";
import { useSelector } from "react-redux";
import './sidebar.css';

function Sidebar({ showSidebar, setShowSideBar }) {
  const [listBoards, setListBoards] = useState([]);
  const [searched, setSearched] = useState("");
  const [recordUpdate, setRecordUpdate] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const hideSideBar = () => {
    setShowSideBar(!showSidebar);
  }
  
  const getListBoards = async () => {
    try {
      const b = await axios.get("http://localhost:3001/board", config);
      setListBoards(b.data);
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
              <ChevronRightIcon className={showSidebar ? 'chevronRight' : ''} onClick={hideSideBar}/>
            </div>
            <BoardSearch searched={searched} setSearched={setSearched}/>
          </Link>
          <div style={{
            marginTop: 40,
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
