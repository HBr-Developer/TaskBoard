import { Paper } from "@mui/material";
import UserStats from "../../components/Users/UserStats";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./userBoards.css";

const UserBoards = () => {
  const styles = {
    paperStyle: {
      width: "90%",
      margin: '10px auto',
      marginTop: 15,
      padding: 8,
    },
  }
  const [boards, setBoards] = useState([]);
  const [userStats, setUserStates] = useState({});
  const params = useParams();
  
  const handleOnBoardClicked = (e, boardId) => {
    let el =  document.querySelector('.board.clicked-active');
    el && el.classList.remove('clicked-active');
    setUserStates({ states: <UserStats boardId={boardId} memberId={params.member}/> });
    e.currentTarget.classList.toggle('clicked-active');
  }
  
  const getUserBoards = async () => {
    const b = await axios.get(`http://localhost:3001/permission/${params.member}`);
    setBoards([...b.data.map((per) => per.board)]);
  }
  
  useEffect(() => {
    getUserBoards();
  }, [])
  
  return (
    <Paper sx={styles.paperStyle}>
      <div className='user-boards-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{width: '100%'}}>
          <p style={{fontSize: '1.3rem', marginBottom: 10}}>Projects</p>
          {boards.map((board, index) => (
            <div className="board"
              key={index} onClick={(event) => handleOnBoardClicked(event, board._id)}>
              <p>{board.name}</p>
            </div>
          ))}
        </div>
        
        {/*/!*stats*!/*/}
        <div>
          {userStats.states}
        </div>
      </div>
    </Paper>
  );
};

export default UserBoards;