import React, { useEffect, useState } from "react";
import { Button, Paper, Stack, Table, TableBody } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import BoardSearch from "./BoardSearch";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import BoardForm from "./BoardForm";

const Board = () => {
  const [recordUpdate, setRecordUpdate] = useState("");
  const [boards, setBoards] = useState([]);
  const [searched, setSearched] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  const GetBoards = () => {
    const url = "http://localhost:3001/board/";
    axios
      .get(url)
      .then((response) => {
        const { status, message, data } = response;
        if (status !== 200) {
          alert(message, status);
        } else {
          setBoards(data);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    GetBoards();
  }, [boards]);

  //delete Board
  const deleteBoards = async (id) => {
    if (window.confirm("Do you want to delete this board")) {
      const response = await axios.delete(`http://localhost:3001/board/${id}`);
      if (response.status === 200) {
        console.log("Board deleted successfully");
        GetBoards();
      }
    }
  };

  // Styling
  const styles = {
    paperStyle: {
      width: "70%",
      marginTop: 9,
      marginBottom: 9,
      marginLeft: "auto",
      marginRight: "auto",
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
      // "&:last-child td, &:last-child th": {
      //   border: 0,
      // },
    },
    buttons: {
      addBoard: {
        backgroundColor: "#333996",
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

  return (
    <>
      <Paper sx={styles.paperStyle} elevation={2}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={35}
        >
          <BoardSearch searched={searched} setSearched={setSearched} />
          <Button
            style={styles.buttons.addBoard}
            variant="contained"
            sx={{
              paddingRight: 3,
              paddingLeft: 3,
              paddingTop: 1.5,
              paddingBottom: 1.5,
            }}
            children="New Board"
            onClick={() => setOpenPopup(true)}
          />
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={styles.tableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Board Name</TableCell>
                <TableCell align="center">Board Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boards
                .filter(
                  (board) =>
                    board.name.toLowerCase().includes(searched.toLowerCase()) ||
                    board.descData
                      .toLowerCase()
                      .includes(searched.toLowerCase())
                )
                .map((board) => (
                  <TableRow
                    key={board._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {board.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleOnClickRow(board._id)}
                    >
                      {board.descData}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleOnClickRow(board._id)}
                      >
                        <MenuIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ marginLeft: 2 }}
                        onClick={() => openInPopup(board)}
                      >
                        <ModeEditOutlineIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBoards(board._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteForeverIcon />
                      </Button>
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
    </>
  );
};

export default Board;
