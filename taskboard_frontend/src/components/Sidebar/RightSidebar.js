import './rightSidebar.css';
import CloseIcon from '@mui/icons-material/Close';
function RightSidebar({ showRightSidebar, setShowRightSideBar }) {
  const BoardStyle = {
    paddingTop: 0,
    // backgroundColor: "#282c34",
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    overflowX: "auto",
    topBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      paddingTop: 7,
    },
    title: {
      // color: '#E1E2E9',
      fontWeight: "bold",
      fontSize: "1.3rem",
      color: "#495151",
      paddingLeft: "1rem",
      // backgroundColor: "#282c34",
    },
    members: {
      marginLeft: 100,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    member: {
      backgroundColor: "#449159",
      padding: 6,
      borderRadius: "50%",
      color: "#FFF",
      marginRight: 10,
    },
    separator: {
      height: 18,
      borderRight: "1px solid #a6a6a6",
      marginRight: 10,
    },
  };
  
  return (
    <nav className={showRightSidebar ? 'rightSidebar active' : 'rightSidebar'}>
      <ul className='rightSide-menu-items'>

        <div className="topheader">
          <h4>Activity </h4>
          <CloseIcon onClick={()=>{setShowRightSideBar(!showRightSidebar)}}/>

        </div>

        <hr></hr>


        <table className="table">
          <tr>
            <td><p style={BoardStyle.member}>IB</p></td>
            <td><p style={BoardStyle.separator}></p></td>
            <td>Imad Bouyfri added Yassine zouhair to Création des machines sous ESXI 2 Jun at 16:52</td>
          </tr>
          
          <tr>
            <td><p style={BoardStyle.member}>HE</p></td>
            <td><p style={BoardStyle.separator}></p></td>
            <td>Imad Bouyfri added Yassine zouhair to Création des machines sous ESXI 2 Jun at 16:52</td>
          </tr>
          <tr>
            <td><p style={BoardStyle.member}>IB</p></td>
            <td><p style={BoardStyle.separator}></p></td>
            <td>Imad Bouyfri added Yassine zouhair to Création des machines sous ESXI 2 Jun at 16:52</td>
          </tr>
        </table>
      </ul>
    </nav>
  );
}

export default RightSidebar;