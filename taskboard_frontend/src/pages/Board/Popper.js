import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import CardSearch from "../../components/Card/CardSearch";

export default function PositionedPopper({searched, setSearched, invitedMembers}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  
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
              {/*<Typography sx={{ p: 2 }}>The content of the Popper.</Typography>*/}
              <CardSearch setOpen={setOpen} searched={searched} setSearched={setSearched} invitedMembers={invitedMembers} />
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container justifyContent="center">
        <Grid item>
          <Button onClick={handleClick('bottom')}><FilterListIcon /></Button>
        </Grid>
      </Grid>
    </Box>
  );
}