import AppBar from '@mui/material/AppBar';
import { Box, Button, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import UserAvatar from "./avatar/UserAvatar";

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const styles = {
    backgroundColor: '#FFFFFF',
    color: '#4d56bf',
    top: 0,
    position: 'fixed',
    zIndex: 100,
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const onLogout = () => {
    dispatch(reset());
    dispatch(logout());
    navigate('/');
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles}>
        <Toolbar variant='dense'>
          <MenuItem key='Home' style={{ marginLeft: 20 }} onClick={() => navigate("/board")}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 25 }} color="inherit" component="div"
                        children='Taskboard'/>
          </MenuItem>
          {user && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          
          )}
          <Box sx={{ flexGrow: 1 }}/>
          
          {/*Bell and profile icons*/}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
              <>
                <Box>
                  <Tooltip title="Open settings">
                    <div style={styles.avatar} onClick={handleOpenUserMenu}>
                      <UserAvatar name={user.name} color={user.color}/>
                    </div>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '20px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key="menus" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Box>
                <Button onClick={() => navigate("/login")}>
                  Login
                </Button>
                
                <Button onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Box>
            )}
          </Box>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header