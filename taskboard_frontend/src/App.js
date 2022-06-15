import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";

const styles = {
  sideBarOn: {
    marginTop: 55,
    marginLeft: 250,
    transition: '200ms',
  },
  sideBarOff: {
    marginTop: 55,
    marginLeft: 20,
    transition: '400ms',
  },
}

function App() {
  const [showSidebar, setShowSideBar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  
  return (
    <>
      <div>
        <Header/>
        {user && (
          <Sidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar}/>
        )}
        <div style={showSidebar ? styles.sideBarOn : styles.sideBarOff}>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default App;
