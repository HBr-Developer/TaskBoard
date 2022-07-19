import { Routes, Route, Navigate } from "react-router-dom";
import Boards from "../pages/Board/Boards";
import BoardForm from "./Board/BoardForm";
import CardInfo from "./Card/CardInfo";
import TaskBoard from "../pages/Board/TaskBoard";
import App from "../App";
import Login from "../pages/Authentification/Login";
import Register from "../pages/Authentification/Register";
import BoardPage from "../pages/Board/BoardPage";
import Profile from "../pages/profile/Profile";
import Users from "../pages/Users/Users";
import UserBoards from "../pages/Users/UserBoards";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path="/" element={<App/>}>
        <Route path="/" element={<Navigate to="board" replace/>}/>
        <Route path="board" element={<Boards/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="user-boards/:member" element={<UserBoards/>}/>
        <Route path="profile/:id" element={<Profile/>}/>
        <Route path="taskboard" element={<BoardPage/>}>
          <Route path=":id" element={<TaskBoard/>}/>
        </Route>
        <Route path="update/:id" element={<BoardForm/>}/>
        <Route path="cardinfo/:id" element={<CardInfo/>}/>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
