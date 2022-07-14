import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import CardInfo from "./CardInfo";
import CardPopup from "./CardPopup";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import UserAvatar from "../avatar/UserAvatar";
import { format } from "date-fns";

const Card = ({ card, index, boardLists, setBoardLists, visibility, list, invitedMembers, setInvitedMembers }) => {

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
  const [cardLabel, setCardLabel] = useState(card.label ? card.label : null);
  
  console.log('cardMembers', cardMembers);
  console.log('boardLists', boardLists);
  console.log('cardLabel', card.label);
  
  useEffect(() => {
    setCurrentCard(card);
  }, [boardLists]);
  
  const getDateLimit = () => {
    const dateDiff = new Date(currentCard.dueDate).getTime() - new Date().getTime();
    const days = Math.floor(dateDiff / (1000 * 3600 * 24));
    if (days < 0) return { time: format(new Date(currentCard.dueDate), 'dd/MM HH:mm'), status: false, show: true };
    let hours = Math.floor(dateDiff / (1000 * 3600));
    let minutes = Math.floor(dateDiff / (1000 * 60));
    minutes -= 60 * hours;
    hours -= 24 * days
    return { time: `${days}d ${hours}h ${minutes}m`, status: true, show: days < 3 };
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
              <div>
                {cardLabel && (
                  <p style={{color: '#FFF', display: 'inline-block', fontSize: 12, padding: '1px 5px', borderRadius: 3, backgroundColor: cardLabel.color}}>{cardLabel.title}</p>
                )}
              </div>
              <div style={cardStyle.containerDiv}>
                <Typography style={{ flexGrow: 1, fontSize: '0.9rem' }}>{currentCard.name}</Typography>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {getDateLimit().show &&
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <AccessTimeFilledIcon color="error"
                                          sx={getDateLimit().status ? { color: '#D32F2F' } : { color: 'black' }}/>
                    <p
                      style={getDateLimit().status ? { color: '#D32F2F' } : { color: 'black' }}>{getDateLimit().time}</p>
                  </div>}
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                  {cardMembers.length <= 2 ?
                    cardMembers.map((member, index) => (
                      <UserAvatar key={index} name={member.name}/>
                    )) : (
                      <>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <p style={{marginRight: 3}}>{`+${cardMembers.length - 2}`}</p>
                          {cardMembers.slice(0, 2).map((member, index) => (
                            <UserAvatar key={index} name={member.name}/>
                          ))}
                        </div>
                      </>
                    )}
                </div>
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
          list={list}
          boardLists={boardLists}
          setBoardLists={setBoardLists}
          invitedMembers={invitedMembers}
          setInvitedMembers={setInvitedMembers}
          cardLabel={cardLabel}
          setCardLabel={setCardLabel}
        />
      </CardPopup>
    </>
  );
};

export default Card;