import "./rightSidebar.css"
import CloseIcon from "@mui/icons-material/Close";
import UserAvatar from "../avatar/UserAvatar";
import { useEffect, useState } from "react";
import axios from "axios";

function RightSidebar({ showRightSidebar, setShowRightSideBar, boardId, boardLists }) {
  const [cardHistory, setCardHistory] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  
  const getCardHistory = async () => {
    const cardHistory = await axios({
      method: 'get',
      url: "http://localhost:3001/cardHistory/" + boardId
    });
    const cardHistoryData = cardHistory.data.map((his) => (
      {
        logo: <UserAvatar name={his.user.name} color={his.user.color}/>,
        message: `${his.user.name} ${his.action === "add" ? "added" : (his.action === "update" ? "updated" : "deleted")} the card ${his.card.name}`
      }
    ))
    setCardHistory(cardHistoryData);
  }
  
  const getListHistory = async () => {
    const listHistory = await axios({
      method: 'get',
      url: "http://localhost:3001/listHistory/" + boardId
    });
    const listHistoryData = listHistory.data.map((his) => (
      {
        logo: <UserAvatar name={his.user.name} color={his.user.color}/>,
        message: `${his.user.name} ${his.action === "add" ? "added" : (his.action === "update" ? "updated" : "deleted")} the list ${his.list.name}`
      }
    ))
    setListHistory(listHistoryData);
  }
  
  useEffect(() => {
    getCardHistory();
    getListHistory();
  }, [boardLists]);
  
  return (
    <nav className={showRightSidebar ? 'rightSidebar active' : 'rightSidebar'}>
      <div className='container'>
        <div className='topBar'>
          <p>Activity</p>
          <CloseIcon onClick={() => setShowRightSideBar(false)} fontSize={"small"} sx={{
            color: '#565656',
            transition: "color 100ms",
            '&:hover': { cursor: 'pointer', color: '#a8a8a8' }
          }}/>
        </div>
        <div className='separator'></div>
        <div className={'body'}>
          {listHistory.map((his, index) => (
            <div key={index} className="avatarItem">
              {his.logo}
              <p style={{ marginLeft: 5 }}>{his.message}</p>
            </div>
          ))}
          {cardHistory.map((his, index) => (
            <div key={index} className="avatarItem">
              {his.logo}
              <p style={{ marginLeft: 5 }}>{his.message}</p>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default RightSidebar;