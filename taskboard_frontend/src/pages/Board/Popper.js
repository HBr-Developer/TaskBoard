import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import CardSearch from "../../components/Card/CardSearch";

export default function PositionedPopper({searched, setSearched, invitedMembers, filteredCards, boardLists}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  
  const filterNumbers = (searched.search.length > 0 ? 1 : 0) + searched.members.length + ((searched.dateRange[0] ? 1 : 0) + (searched.dateRange[1] ? 1 : 0));
  
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  
  const styles = {
    paper: {
      width: '330px',
      padding: 1,
      paddingLeft: 0.7,
      paddingRight: 0.7,
    }
  }
  
  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Paper sx={styles.paper}>
              <CardSearch setOpen={setOpen} searched={searched} setSearched={setSearched} invitedMembers={invitedMembers} filteredCards={filteredCards} boardLists={boardLists} />
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container justifyContent="center">
        <Grid item>
          {/*filter button*/}
          <Button onClick={handleClick('bottom')}>{filterNumbers === 0 ? null : filterNumbers}<FilterListIcon />Filter</Button>
        </Grid>
      </Grid>
    </Box>
  );
}