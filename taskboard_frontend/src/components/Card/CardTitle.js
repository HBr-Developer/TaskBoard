import { useState, useRef } from "react";
import { Typography, InputBase, Popper, Paper, ClickAwayListener, MenuList, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CardTitle = ({ card, setCard }) => {
  const TitleStyle = {
    title: {
      width: '100%',
      padding: 0.7,
      paddingLeft: 1,
      paddingRight: 1,
      fontWeight: "bold",
      fontSize: '1rem',
      marginBottom: 0.1,
      marginTop: 0.1,
      marginRight: 5,
      backgroundColor: '#FFF',
      border: "0.5px solid #d7d7d7",
      borderRadius: 1,
      '&:hover': {
        cursor: 'text',
        backgroundColor: '#fcfcfc'
      }
    },
    input: {
      width: '100%',
      padding: 0.2,
      paddingLeft: 1,
      paddingRight: 1,
      fontWeight: "bold",
      fontSize: '1rem',
      marginBottom: 0.1,
      marginTop: 0.1,
      marginRight: 5,
      backgroundColor: '#FFF',
      borderRadius: 1,
      border: "0.5px solid #1976D2",
    },
    more: {
      marginTop: 0.5,
      borderRadius: 0.6,
      '&:hover': {
        backgroundColor: "#C7CACB"
      }
    }
  };

  const [titleOpened, setTitleOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.name);
  const anchorRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  
  const { id } = useParams();
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // const handleOnDelete = async (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   try {
  //     console.log('cardId', card._id);
  //     await axios.delete(`http://localhost:3001/list/${listId}`);
  //     const newBordLists = boardLists.filter(list => list._id !== listId);
  //     setBoardLists(newBordLists);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const handleClose = async (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleOnBlur = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      setCard({...card, name: cardTitle});
      await axios.patch(`http://localhost:3001/card/${card._id}`, {...card, name: cardTitle});
      setTitleOpened(!titleOpened);
    } catch (err) {
      console.log(err);
    }
    setTitleOpened(!titleOpened);
  }

  return (
    <div>
      {titleOpened ? (
        <div>
          <InputBase
            value={cardTitle}
            sx={TitleStyle.input}
            onBlur={handleOnBlur}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>
      ) : (
        <div className={"hh"}>
          <Typography
            onClick={() => setTitleOpened(!titleOpened)}
            sx={TitleStyle.title}
          >
            {cardTitle}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CardTitle;
