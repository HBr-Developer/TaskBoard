import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import BoardSearch from "../../components/Board/BoardSearch";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import BoardForm from "../../components/Board/BoardForm";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import AssessmentIcon from '@mui/icons-material/Assessment';
import BoardStats from "../../components/Board/BoardStats";

const Boards = () => {
  const [recordUpdate, setRecordUpdate] = useState("");
  const [boards, setBoards] = useState([]);
  const [searched, setSearched] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openStatsPopup, setOpenStatsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState({});
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const GetBoards = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    try {
      const response = await axios.get("http://localhost:3001/board/", config);
      const { status, message, data } = response;
      if (status !== 200) {
        alert(message, status);
      } else {
        setBoards(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  
  useEffect(() => {
    GetBoards();
    setIsLoading(false);
    console.log('board');
  }, [openPopup]);
  
  //delete Board
  const deleteBoards = async (id) => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    if (window.confirm("Do you want to delete this board")) {
      const response = await axios.patch(`http://localhost:3001/board/${id}`, { active: false }, config);
      if (response.status === 200) {
        console.log("Board deleted successfully");
        GetBoards();
      }
    }
  };
  
  // Styling
  const styles = {
    paperStyle: {
      width: "90%",
      margin: '10px auto',
      marginTop: 15,
      padding: 8,
    },
    tableStyle: {
      minWidth: 600,
      "& thead th": {
        fontWeight: 600,
        backgroundColor: "#e3e3f3",
        color: "#333996",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fafafa",
        cursor: "pointer",
      },
      "& tbody td": {
        fontWeight: 300,
      },
    },
    buttons: {
      addBoard: {
        backgroundColor: "#333996",
        // margin: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      edit: {
        color: "#ffffff",
        backgroundColor: "#ED6C02",
        "&:hover": {
          backgroundColor: "#faa864",
        },
      },
      delete: {
        color: "#ffffff",
        backgroundColor: "#D32F2F",
        "&:hover": {
          backgroundColor: "#f75252",
        },
      },
    },
  };
  //----------------------------------------------------------------Styling
  
  const openInPopup = (item) => {
    setRecordUpdate(item);
    setOpenPopup(!openPopup);
  };
  
  const handleOnClickRow = (id) => {
    navigate(`/taskboard/${id}`);
  };
  
  if (isLoading) {
    return <Spinner/>
  }
  
  const onBoardStatsClicked = (boardId) => {
    setSelectedBoard(boards[boardId]);
    setOpenStatsPopup(true);
  }
  
  return (
    <>
      <Paper sx={styles.paperStyle} elevation={2}>
        <div
          style={
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 50
            }
          }
        >
          <BoardSearch searched={searched} setSearched={setSearched}/>
          <div>
            <Button
              style={styles.buttons.addBoard}
              variant="contained"
              children="New Boards"
              onClick={() => setOpenPopup(true)}
            />
          </div>
        </div>
        <TableContainer component={Paper}>
          
          <Table sx={styles.tableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Boards Name</TableCell>
                <TableCell align="center">Boards Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boards.length <= 0 ? (<><TableRow><TableCell>No boards available</TableCell></TableRow></>) : boards
                .filter(
                  (board) =>
                    board.name.toLowerCase().includes(searched.toLowerCase()) ||
                    board.descData
                      .toLowerCase()
                      .includes(searched.toLowerCase())
                )
                .map((board, index) => (
                  <TableRow
                    key={board._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" onClick={() => handleOnClickRow(index)} >
                      {board.name}
                    </TableCell>
                    <TableCell
                      onClick={() => handleOnClickRow(board._id)}
                      align="center"
                      
                    >
                      {board.descData}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleOnClickRow(board._id)}
                      >
                        <MenuIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ marginLeft: 2 }}
                        onClick={() => openInPopup(board)}
                      >
                        <ModeEditOutlineIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBoards(board._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteForeverIcon/>
                      </Button>
                      {user.role.toLowerCase() === 'admin' && (
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={() => onBoardStatsClicked(index)}
                          sx={{ marginLeft: 2 }}
                        >
                          <AssessmentIcon/>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setRecordUpdate={setRecordUpdate}
        recordUpdate={recordUpdate}
        title={recordUpdate ? "Update Board" : "New board"}
      >
        <BoardForm
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          recordUpdate={recordUpdate}
        />
      </Popup>
      
      {/*charts popup*/}
      <Popup
        openPopup={openStatsPopup}
        setOpenPopup={setOpenStatsPopup}
        title="board statistics"
      >
        <BoardStats
          openPopup={openStatsPopup}
          setOpenPopup={setOpenStatsPopup}
          board={selectedBoard}
        />
      </Popup>
    </>
  );
};

export default Boards;
