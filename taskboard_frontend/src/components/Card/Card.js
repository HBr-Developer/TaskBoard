import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import CardInfo from "./CardInfo";
import CardPopup from "./CardPopup";
import axios from "axios";

const Card = ({ card, index, list, boardLists, setBoardLists, visibility }) => {
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
      <Draggable draggableId={currentCard._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper sx={cardStyle.card}>
              <div style={cardStyle.containerDiv} onClick={handleOnClick}>
                <Typography style={{ flexGrow: 1, fontSize: '0.9rem' }}>{currentCard.name}</Typography>
                {/*<DeleteForeverIcon sx={cardStyle.deleteButton} onClick={() => handleOnDelete(card._id)}/>*/}
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
          boardLists={boardLists}
          setBoardLists={setBoardLists}
          list={list}
          card={currentCard}
          setCard={setCurrentCard}
        />
      </CardPopup>
    </>

  );
};

export default Card;