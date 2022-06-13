import { TextField, Grid, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const styles = {
  form: {
    display: flexbox,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
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
    margin: "auto",
    paddingTop: 2,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    width: "500px",
    height: "500px",
  },
};


export default function InviteMember({
  openPopup,
  setOpenPopup,
}) {
  
  const handOnleSubmit = (e) => {
    e.preventDefault();

    setOpenPopup(!openPopup);
  };
 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, mail, username) {
    return { name, mail, username};
  }
  
  const Member = [
    createData('Imad bouyfri', 'ibouyfri@mars-itech.ma', 'bouyfri'),
    createData('abdelouahed errajji', 'a.erraji2mundiapolis.ma', 'errajjt'),
    createData('Hanane elbarbari', 'h.elbarbari@mundiapolis.ma', 'elbarbari'),
    
  ];
  
  return (
    <>
    
      <Paper elevation="0" sx={styles.paper}>
        <form onSubmit={handOnleSubmit}>
          <Grid container sx={styles.container}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={Member}
                getOptionLabel={(option) => option.mail}
                //   defaultValue={[Member[13], top100Films[12], top100Films[11]]}
                renderInput={(params) => (
                  <TextField {...params} label="Mail" placeholder="Mail" />
                )}
                sx={{ width: "300px" }}
              />

              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                    send
                  <SendIcon />
                </IconButton>
              </label>
            </Stack>
           
            <TableContainer component={Paper}  sx={{ width: "500px", marginTop:"20px" }}>
          <Table sx={styles.tableStyle} aria-label="simple table">

          <TableHead>
         
        </TableHead>
        <TableBody>
          {Member.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name }
               <br/>
                {row.mail}
              </StyledTableCell>
              
              <StyledTableCell align="center">
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={row.username}
                    label="Role"
                    // onChange={handleChange}
                    sx={{ width: "100px" }}
                    >
                    <MenuItem value={10}>Observateur</MenuItem>
                    <MenuItem value={20}>Member</MenuItem>
                    <MenuItem value={30}>Admin</MenuItem>
                    </Select>
                </FormControl>
                  </StyledTableCell> 
                 
            </StyledTableRow>
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

