import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import CardInfo from "./CardInfo";
import CardPopup from "./CardPopup";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import UserAvatar from "../avatar/UserAvatar";
import { format } from "date-fns";

const Card = ({ card, index, boardLists, setBoardLists, visibility }) => {
  const cardStyle = {
    card: {
      padding: 0.6,
      paddingLeft: 1,
      marginLeft: 0.9,
      marginRight: 0.9,
      marginBottom: 1,
      borderRadius: 0.7,
      backgroundColor: '#FFFEFE',
      '&:hover': {
        backgroundColor: '#f7f7f7',
      },
      display: `${visibility}`
    },
    containerDiv: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    edit: {
      fontSize: 18,
      color: '#4f4f4f',
      padding: 0.1,
      '&:hover': {
        backgroundColor: '#afacac',
        borderRadius: 0.5,
      }
    },
    deleteButton: {
      flexGrow: 0,
      padding: 0.5,
      '&:hover': {
        borderRadius: 0.5,
        backgroundColor: "#E1E2E9"
      }
    }
  };
  const [openPopup, setOpenPopup] = useState(false);
  const [currentCard, setCurrentCard] = useState(card);
  const [cardMembers, setCardMembers] = useState(card.cardPermissions ? card.cardPermissions.map((per) => per.user) : []);
  
  useEffect(() => {
    setCurrentCard(card);
  }, [boardLists]);
  
  const getDateLimit = () => {
    const days = Math.floor((new Date(currentCard.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if(days < 0) return {time: format(new Date(currentCard.dueDate), "dd/MM HH:mm"), status: false};
    let hours = Math.floor((new Date(currentCard.dueDate).getTime() - new Date().getTime()) / (1000 * 3600));
    let minutes = Math.floor((new Date(currentCard.dueDate).getTime() - new Date().getTime()) / (1000 * 60));
    minutes -= 60 * hours;
    hours -= 24 * days
    return {time: `${days}d ${hours}h ${minutes}m`, status: true};
  }
  
  // // delete card
  // const handleOnDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/card/${id}`);
  //     const newListCards = list.cards.filter(card => card._id !== id);
  //     const newBordLists = boardLists.map(boardList => boardList._id === list._id ? {
  //       ...boardList,
  //       cards: newListCards
  //     } : boardList);
  //     setBoardLists(newBordLists);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  const handleOnClick = () => {
    setOpenPopup(!openPopup);
  }
  
  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper sx={cardStyle.card} onClick={handleOnClick}>
              <div style={cardStyle.containerDiv}>
                <Typography style={{ flexGrow: 1, fontSize: '0.9rem' }}>{currentCard.name}</Typography>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {new Date(new Date(currentCard.dueDate).getTime() - new Date(currentCard.createdAt).getTime()).getDate() <= 3 &&
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <AccessTimeFilledIcon color={'error'} sx={!getDateLimit().status && {color: 'black'}} />
                    <p
                      style={!getDateLimit().status ? {color: 'black'} : { color: '#D32F2F' }}>{(new Date(currentCard.dueDate).getHours() - new Date(currentCard.createdAt).getHours()) < 72 && getDateLimit().time}</p>
                  </div>}
                <div style={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'end'}}><UserAvatar name={cardMembers[0].name} /></div>
              </div>
            </Paper>
          </div>
        )}
      </Draggable>
      <CardPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        card={currentCard}
        setCard={setCurrentCard}
        boardLists={boardLists}
        setBoardLists={setBoardLists}
      >
        <CardInfo
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          card={currentCard}
          setCard={setCurrentCard}
          cardMembers={cardMembers}
          setCardMembers={setCardMembers}
        />
      </CardPopup>
    </>
  );
};

export default Card;