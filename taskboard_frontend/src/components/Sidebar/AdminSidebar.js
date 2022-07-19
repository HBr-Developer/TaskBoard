import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom'
import './sidebar.css';
import GroupIcon from '@mui/icons-material/Group';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

function Sidebar({ showSidebar, setShowSideBar }) {
  const hideSideBar = () => {
    setShowSideBar(!showSidebar);
  }
  
  return (
    <>
      <nav className={showSidebar ? 'sidebar active' : 'sidebar'}>
        <ul className='side-menu-items'>
          <Link to='#' className='menu-bars'>
            <div className='direction'>
              <ChevronLeftIcon className='chevronLeft' onClick={hideSideBar}/>
              <ChevronRightIcon className={showSidebar ? 'chevronRight' : ''} onClick={hideSideBar}/>
            </div>
          </Link>
          <li className='side-text'>
            <Link to='/board'>
              <DeveloperBoardIcon />
              <span>Projects</span>
            </Link>
          </li>
          <li className='side-text'>
            <Link to='/users'>
              <GroupIcon />
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
