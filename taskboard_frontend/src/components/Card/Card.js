import React, {useState} from "react";
import {Paper, Typography} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import CardInfo from "./CardInfo";
import Popup from "../../pages/Boards/Popup";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Card = ({card, index, list, boardLists, setBoardLists}) => {
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
            }
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

    const [recordUpdate, setRecordUpdate] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [cardInfo, setCardInfo] = useState('');

    const handleOnClick = async (cardId) => {
        const cardInfo = await axios.get(`http://localhost:3001/card/${cardId}`);
        setCardInfo(cardInfo.data);
        setOpenPopup(!openPopup);
    }

    const handleOnDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/card/${id}`);
            const newListCards = list.cards.filter(card => card._id !== id);
            const newBordLists = boardLists.map(boardList => boardList._id === list._id ? {...boardList, cards: newListCards} : boardList);
            setBoardLists(newBordLists);
        } catch(err) {
            console.log(err);
        }
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
                        <Paper sx={cardStyle.card}>
                            <div style={cardStyle.containerDiv}>
                                <Typography maxRows={1} onClick={() => handleOnClick(card._id)} style={{flexGrow: 1, fontSize:'0.9rem'}}>{card.name}</Typography>
                                <DeleteForeverIcon sx={cardStyle.deleteButton} onClick={() => handleOnDelete(card._id)} />
                            </div>

                        </Paper>
                    </div>
                )}
            </Draggable>

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                setRecordUpdate={setRecordUpdate}
                recordUpdate={recordUpdate}
                title={cardInfo.name}
            >
                <CardInfo
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    recordUpdate={recordUpdate}
                    cardInfo={cardInfo}
                    list={list}
                    boardLists={boardLists}
                    setBoardLists={setBoardLists}
                />
            </Popup>
        </>

    );
};

export default Card;