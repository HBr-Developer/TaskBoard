import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import "./cardMemberInvite.css";
import UserAvatar from "../avatar/UserAvatar";
import axios from "axios";

export default function CardMemberInvite({ notCardMembers, cardMembers, setCardMembers, card, boardLists, setBoardLists, list }) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(notCardMembers.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleOnSelect = async (mem) => {
    setAnchorEl(null);
    setCardMembers([...cardMembers, mem]);
    notCardMembers.splice(notCardMembers.indexOf(mem), 1);
    await axios.post('http://localhost:3001/cardPermission', {user: mem._id, card: card._id, role: 'invited'});
    const newCard = await axios.get(`http://localhost:3001/card/${card._id}`);
    const newList = { ...list, cards: list.cards.map((lCard) => lCard._id !== card._id ? lCard : { _id: newCard.data._id, name: newCard.data.name, cardPermissions: newCard.data.cardPermissions, createdAt: newCard.data.createdAt, dueDate: newCard.data.dueDate ? newCard.data.dueDate : '' }) }
    setBoardLists(boardLists.map((bList) => bList._id === list._id ? newList : bList));
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
      </Menu>
    </div>
  );
}