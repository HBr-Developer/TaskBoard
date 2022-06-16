import './rightSidebar.css';

function RightSidebar({ showRightSidebar }) {
  return (
    <nav className={showRightSidebar ? 'rightSidebar active' : 'rightSidebar'}>
      <div className='container'>
        <div className={'topBar'}>
          <p>Activity</p>
        </div>
        <div className={'body'}>
        
        </div>
      </div>
    </nav>
  );
}

export default RightSidebar;