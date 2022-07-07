import { TextField, Grid, Paper, FormControl, Select, MenuItem } from "@mui/material";
import { flexbox } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { useState } from "react";
import './inviteMember.css'

const styles = {
  form: {
    display: flexbox,
  },
  inputStyle: {
    width: "100%",
    "&:not(:last-child)": {
      marginBottom: 5,
    },
  },
  title: {
    fontSize: 25,
    marginBottom: 50,
  },
  submit: {
    textAlign: "center",
  },
  paper: {
    backgroundColor: '#FBFBFB',
    margin: "auto",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    width: "550px",
  },
  tableCell: {
    paddingTop: 1,
    paddingBottom: 1,
  }
};

export default function InviteMember({
  openPopup,
  setOpenPopup,
  allMembers,
  invitedMembers,
  setInvitedMembers,
  user,
  boardId
}) {
  
  const [selectedMembers, setSelectedMembers] = useState([]);
  const roleChange = invitedMembers.filter((member) => member.name === user.name)[0].role === "admin";
  const [adminError, setAdminError] = useState(false);
  
  const handleChange = async (e) => {
    if (e.target.value === "invited") {
      if (invitedMembers.filter((member) => (member.role === 'admin')).length <= 1) {
        setAdminError(true);
        setTimeout(() => {
          setAdminError(false);
        }, 3000)
        return;
      }
    }
    const memberChanged = invitedMembers.filter((member) => (member.name === e.target.name))[0];
    setInvitedMembers(invitedMembers.map((member) => (member.name === memberChanged.name ? {
      ...memberChanged,
      role: e.target.value
    } : member)));
    try {
      await axios.patch("http://localhost:3001/permission", {
        user: memberChanged._id,
        board: boardId,
        role: e.target.value
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newAllMembers = allMembers;
    const newInvitedMembers = selectedMembers.map((member) => ({ ...member, role: 'invited' }));
    
    // removing new invited members from all members
    for (let e = 0; e < newInvitedMembers.length; e++) {
      const index = newAllMembers.findIndex((mem) => {
        return mem._id === newInvitedMembers[e]._id;
      })
      newAllMembers.splice(index, 1);
    }
    setInvitedMembers([...invitedMembers, ...newInvitedMembers]);
    
    // DB
    for (let i = 0; i < newInvitedMembers.length; i++) {
      try {
        const data = {
          board: boardId,
          user: newInvitedMembers[i]._id,
          role: "invited"
        }
        
        if (!user) return;
        const token = user.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        await axios.post("http://localhost:3001/permission/", data, config);
      } catch (err) {
        console.log(err)
      }
    }
    setOpenPopup(!openPopup);
  }
  
  // useEffect(() => {
  //   getAllMembers();
  // }, []);
  
  return (
    <>
      <Paper elevation={0} sx={styles.paper}>
        <form onSubmit={handleOnSubmit}>
          <Grid container>
            <div className='memberSearch'>
              <Autocomplete
                className='search'
                sx={{ flexGrow: 1 }}
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={allMembers}
                getOptionLabel={(option) => option.name}
                // defaultValue={[]}
                renderInput={(params) => (
                  <TextField {...params} label="Size small" placeholder="Favorites"/>
                )}
                onChange={(e, value) => {setSelectedMembers(value)}}
              />
              {/*<Button component={'submit'} sx={{ marginLeft: 2 }} variant={'contained'} children={'Share'} />*/}
              <input className={'shareButton'} type="submit" value={'Share'}/>
            </div>
            
            <TableContainer component={Paper} elevation={0} sx={{ marginTop: 4, backgroundColor: '#FBFBFB' }}>
              {adminError &&
                <p style={{ color: 'red', textAlign: 'center' }}>A project must have at least one admin</p>
              }
              <Table aria-label="simple table" size='small'>
                <TableHead>
                </TableHead>
                <TableBody>
                  {invitedMembers.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell component="th" scope="row" align={"left"}>
                        {member.name}
                        <br/>
                        {member.email}
                      </TableCell>
                      <TableCell component="th" scope="row" align={"right"}>
                        {/*// change Permission*/}
                        <FormControl margin='none' size='small'>
                          {/*<InputLabel style={{ fontSize: 15 }}*/}
                          {/*            id="demo-simple-select-label">role*/}
                          {/*</InputLabel>*/}
                          {!roleChange ? (
                            <Select
                              disabled
                              name={member.name}
                              style={{ fontSize: 15 }}
                              id="demo-simple-select"
                              value={member.role}
                              onChange={handleChange}
                              sx={{ width: "100px" }}
                            >
                              <MenuItem value={'admin'}>Admin</MenuItem>
                              <MenuItem value={'invited'}>Invited</MenuItem>
                            </Select>
                          ) : (
                            <Select
                              name={member.name}
                              style={{ fontSize: 15 }}
                              id="demo-simple-select"
                              value={member.role}
                              onChange={handleChange}
                              sx={{ width: "100px" }}
                            >
                              <MenuItem value={'admin'}>Admin</MenuItem>
                              <MenuItem value={'invited'}>Invited</MenuItem>
                            </Select>
                          )}
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

