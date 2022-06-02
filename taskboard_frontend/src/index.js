import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { CssBaseline } from "@mui/material";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import BoardForm from "./pages/Boards/BoardForm";
// import CardInfo from "./components/Card/CardInfo";
// import TaskBoard from "./components/Board/TaskBoard";
// import Board from "./pages/Boards/Board";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  {/* // <>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />}>
  //         <Route path="/board" element={<Board />} />
  //         <Route path="/taskboard/:id" element={<TaskBoard />} />
  //         <Route path="/update/:id" element={<BoardForm />} />
  //         <Route path="/cardinfo/:id" element={<CardInfo />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  //   <CssBaseline />
  // </> */}
  <App />
  </React.StrictMode>
);
reportWebVitals();
