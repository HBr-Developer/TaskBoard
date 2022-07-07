import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import "./cardMemberInvite.css";
import UserAvatar from "../avatar/UserAvatar";
import axios from "axios";

export default function CardMemberInvite({ notCardMembers, cardMembers, setCardMembers, card }) {
  
  console.log('cardMembers', cardMembers);
  console.log('notCardMembers', notCardMembers);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(notCardMembers.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleOnSelect = async (mem) => {
    setAnchorEl(null);
    console.log('member', mem);
    console.log('card', card);
    setCardMembers([...cardMembers, mem]);
    notCardMembers.splice(notCardMembers.indexOf({...mem}));
    await axios.post('http://localhost:3001/cardPermission', {user: mem._id, card: card._id, role: 'invited'});
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  }
  
  return (
    <div className='inviteMember'>
      <div className="addButton" onClick={handleClick}>
        <AddIcon sx={{ color: '#FFFFFF' }}/>
      </div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {notCardMembers.map((mem, index) => (
          <MenuItem key={index} onClick={() => handleOnSelect(mem)}>
            <UserAvatar name={mem.name} color={mem.color} />
            <p>{mem.name}</p>
          </MenuItem>
        ))}
        {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
        {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
        {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
      </Menu>
    </div>
  );
}
