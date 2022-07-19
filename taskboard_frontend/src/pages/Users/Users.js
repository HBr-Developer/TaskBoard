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
import Spinner from "../../components/Spinner";
import UserAvatar from "../../components/avatar/UserAvatar";
import UserPopup from "../../components/Users/UserPopup";
import NewUser from "../../components/Users/NewUser";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const navigate = useNavigate();
  
  const GetUsers = async () => {
    // if (!user) return;
    // const token = user.token;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }
    
    try {
      const response = await axios.get("http://localhost:3001/member/");
      const { status, message, data } = response;
      if (status !== 200) {
        alert(message, status);
      } else {
        setUsers(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  
  const handleOnUpdate = (item) => {
    setUserToUpdate(item)
    setOpenPopup(!openPopup);
  }
  
  useEffect(() => {
    GetUsers();
    setIsLoading(false);
  }, []);
  
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
  
  if (isLoading) {
    return <Spinner/>
  }
  
  const handleNavigation = (id) => {
    navigate(`../user-boards/${id}`);
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
          <Button
            style={styles.buttons.addBoard}
            variant="contained"
            children="New User"
            onClick={() => setOpenPopup(true)}
          />
        </div>
        <TableContainer component={Paper}>
          
          <Table sx={styles.tableStyle} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length <= 0 ? (<><TableRow><TableCell>No Users available</TableCell></TableRow></>) : users
                .filter(
                  (usr) =>
                    usr.name.toLowerCase().includes(searched.toLowerCase())
                )
                .map((usr, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" onClick={() => handleNavigation(usr._id)}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <UserAvatar name={usr.name} color={usr.color}/>
                        <p style={{ marginLeft: 2, fontSize: '1rem' }}>{usr.name}</p>
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleNavigation(usr._id)}
                    >
                      <p style={{ fontSize: '1rem' }}>{usr.email}</p>
                    </TableCell>
                    <TableCell align="center">
                      {/*<Button*/}
                      {/*  variant="outlined"*/}
                      {/*  color="success"*/}
                      {/*  // onClick={() => handleOnClickRow(board._id)}*/}
                      {/*  onClick={() => handleNavigation(usr._id)}*/}
                      {/*>*/}
                      {/*  <ModeEditOutlineIcon/>*/}
                      {/*</Button>*/}
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ marginLeft: 2 }}
                        onClick={() => handleOnUpdate(usr)}
                        // onClick={() => openInPopup(board)}
                      >
                        <ModeEditOutlineIcon/>
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        // onClick={() => deleteBoards(board._id)}
                        sx={{ marginLeft: 2 }}
                      >
                        <DeleteForeverIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <UserPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        userToUpdate={userToUpdate}
        setUserToUpdate={setUserToUpdate}
      >
        <NewUser users={users} setUsers={setUsers} userToUpdate={userToUpdate} setOpenPopup={setOpenPopup}/>
      </UserPopup>
    </>
  );
};

export default Users;
