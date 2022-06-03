import Header from "./components/Header";
import Board from "./pages/Boards/Board";
import BoardForm from "./pages/Boards/BoardForm";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, Grid } from "@mui/material";
import TaskBoard from "./components/Board/TaskBoard";
import CardInfo from "./components/Card/CardInfo";
import MainRoutes from "./components/Routes";
import Navbar from "./components/Navbar";

function App() {
  const container = {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'start'
  };
  return (
    <>
      <Header />
      <div style={container}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
