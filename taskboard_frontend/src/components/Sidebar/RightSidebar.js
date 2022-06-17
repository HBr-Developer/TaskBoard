import "./rightSidebar.css"
import CloseIcon from "@mui/icons-material/Close";

function RightSidebar({ showRightSidebar, setShowRightSideBar }) {
  return (
    <nav className={showRightSidebar ? 'rightSidebar active' : 'rightSidebar'}>
      <div className='container'>
        <div className='topBar'>
          <p>Activity</p>
          <CloseIcon onClick={() => setShowRightSideBar(false)} fontSize={"small"} sx={{color: '#565656', transition: "color 100ms", '&:hover': {cursor: 'pointer', color: '#a8a8a8'}}} />
        </div>
        <div className='separator'></div>
        <div className={'body'}>
        </div>
      </div>
    </nav>
  );
}

export default RightSidebar;