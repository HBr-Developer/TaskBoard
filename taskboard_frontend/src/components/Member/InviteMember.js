import { TextField, Grid, Paper } from "@mui/material";
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
    paddingLeft: 0,
    paddingRight: 0,
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
  
  const [selectedMembers, setSelectedmembers] = useState([]);
  // console.log("allMembers", allMembers);
  // console.log("selectedMembers", selectedMembers);
  // console.log("invitedMembers", invitedMembers);
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newAllMembers = allMembers;
    const newInvitedMembers = selectedMembers.map((member) => ({ ...member, role: 'invited' }));
    for (let i = 0; i < newInvitedMembers; i++) {
      await axios.post()
    }
    
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
                onChange={(e, value) => {setSelectedmembers(value)}}
              />
              {/*<Button component={'submit'} sx={{ marginLeft: 2 }} variant={'contained'} children={'Share'} />*/}
              <input className={'shareButton'} type="submit" value={'Share'}/>
            </div>
            
            <TableContainer component={Paper} elevation={0} sx={{ marginTop: 4, backgroundColor: '#FBFBFB' }}>
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
                        <p>{member.role}</p>
                        {/*// change Permission*/}
                        {/*<FormControl margin='none' size='small'>*/}
                        {/*  <InputLabel style={{ fontSize: 10 }}*/}
                        {/*              id="demo-simple-select-label">Role</InputLabel>*/}
                        {/*  <Select*/}
                        {/*    style={{ fontSize: 10 }}*/}
                        {/*    labelId="demo-simple-select-label"*/}
                        {/*    id="demo-simple-select"*/}
                        {/*    // value={row.username}*/}
                        {/*    label="Role"*/}
                        {/*    // onChange={handleChange}*/}
                        {/*    sx={{ width: "100px" }}*/}
                        {/*  >*/}
                        {/*    <MenuItem value={10}>Admin</MenuItem>*/}
                        {/*    <MenuItem value={20}>Member</MenuItem>*/}
                        {/*    <MenuItem value={30}>Admin</MenuItem>*/}
                        {/*  </Select>*/}
                        {/*</FormControl>*/}
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

