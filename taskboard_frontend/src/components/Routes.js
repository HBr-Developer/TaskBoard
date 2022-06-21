import { Routes, Route, Navigate } from "react-router-dom";
import Boards from "../pages/Board/Boards";
import BoardForm from "./Board/BoardForm";
import CardInfo from "./Card/CardInfo";
import TaskBoard from "../pages/Board/TaskBoard";
import App from "../App";
import Login from "../pages/Authentification/Login";
import Register from "../pages/Authentification/Register";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path='/' element={<Navigate to="login" replace/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path="board" element={<Boards/>}/>
          <Route path="taskboard/:id" element={<TaskBoard/>}/>
          <Route path="update/:id" element={<BoardForm/>}/>
          <Route path="cardinfo/:id" element={<CardInfo/>}/>
        </Route>
      </Routes>
  
     
    </>
  );
};

export default MainRoutes;
