import Header from "./components/Header";
import Board from "./pages/Boards/Board";
import BoardForm from "./pages/Boards/BoardForm";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CssBaseline, Grid } from "@mui/material";
import TaskBoard from "./components/Board/TaskBoard";
import CardInfo from "./components/Card/CardInfo";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      {/* <Grid container>
        
        <SideBar />
        <Header />
        <Outlet />
      </Grid> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/update/:id" element={<BoardForm />} />
          <Route path="/taskboard/:id" element={<TaskBoard />} />
          <Route path="/taskboard" element={<TaskBoard />} />
          <Route path="/cardinfo/:id" element={<CardInfo />} />
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </>
  );
}

export default App;
