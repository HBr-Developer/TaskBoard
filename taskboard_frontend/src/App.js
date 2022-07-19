import { Outlet, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [showSidebar, setShowSideBar] = useState(true);
  const { user } = useSelector((state) => state.auth);
  
  return (
    <>
      <div>
        {user ? (
          <>
            <Header/>
            {user.role.toLowerCase() !== 'admin' ?
              <Sidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar}/> :
              <AdminSidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar}/>}
            <div style={showSidebar ? styles.sideBarOn : styles.sideBarOff}>
              <Outlet/>
            </div>
          </>
        ) : (
          <Navigate to='login' replace/>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
