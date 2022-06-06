import { Routes, Route, Navigate } from "react-router-dom";
import Board from "../pages/Boards/Board";
import BoardForm from "../pages/Boards/BoardForm";
import CardInfo from "./Card/CardInfo";
import TaskBoard from "./Board/TaskBoard";
import App from "../App";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Navigate to="board" replace/>}/>
          <Route path="board" element={<Board/>}/>
          <Route path="taskboard/:id" element={<TaskBoard/>}/>
          {/* <Route path=":id" element={<TaskBoard />} /> */}
          {/* </Route> */}
        </Route>
        <Route path="update/:id" element={<BoardForm/>}/>
        <Route path="cardinfo/:id" element={<CardInfo/>}/>
      </Routes>
    </>
  );
};

export default MainRoutes;
