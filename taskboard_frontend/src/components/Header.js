import AppBar from '@mui/material/AppBar';
import { Box, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  const styles = {
    backgroundColor: '#fff',
    color: '#333996',
    top: 0,
    position: 'fixed',
    zIndex: 100,
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles}>
        <Toolbar variant='dense'>
          <MenuItem key='Home' style={{ marginLeft: 20 }} onClick={() => navigate("/")}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 25 }} color="inherit" component="div"
                        children='Taskboard'/>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
  
}

export default Header