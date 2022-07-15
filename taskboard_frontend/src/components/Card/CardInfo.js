import { Paper } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AddCardDescription from "./AddCardDescription";
import GroupIcon from '@mui/icons-material/Group';
import UserAvatar from "../avatar/UserAvatar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DateTimePicker } from "@mui/x-date-pickers-pro";
import CardMemberInvite from "./CardMemberInvite";
import AddLabel from "./AddLabel";
import LabelIcon from '@mui/icons-material/Label';

function CardInfo({
  card,
  setCard,
  cardMembers,
  list,
  boardLists,
  setBoardLists,
  invitedMembers,
  setCardMembers,
  setCardLabel
}) {
  const [toggleDescription, setToggleDescription] = useState(false);
  const [notCardMembers, setNotCardMembers] = useState(invitedMembers.filter((mem) => (!cardMembers.map((cMem) => cMem._id).includes(mem._id))));
  
  const styles = {
    paper: {
      margin: "auto",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      width: "600px",
    },
    description: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
      marginBottom: 20,
      width: '6'
    }
  };
  
  const handleOnDateChange = async (newValue) => {
    const newList = {
      ...list,
      cards: list.cards.map((mCard) => ((mCard._id === card._id) ? { ...card, dueDate: newValue } : mCard))
    };
    setBoardLists(boardLists.map((bList) => bList._id === list._id ? newList : bList));
    try {
      await axios.patch(`http://localhost:3001/card/${card._id}`, { dueDate: newValue });
      setCard({ ...card, dueDate: newValue });
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <Paper elevation={0} sx={styles.paper}>
        <div className="description">
          <div style={styles.description}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              justifyContent: 'center',
              marginBottom: 15
            }}>
              <GroupIcon/>Members
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {cardMembers.map((mem, index) => (
                <UserAvatar key={index} name={mem.name} color={mem.color}/>
              ))}
              <CardMemberInvite key={card._id} card={card} notCardMembers={notCardMembers}
                                setNotCardMembers={setNotCardMembers} cardMembers={cardMembers}
                                setCardMembers={setCardMembers} boardLists={boardLists} setBoardLists={setBoardLists}
                                list={list}/>
            </div>
          </div>
          
          <div style={styles.description}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              justifyContent: 'center',
              marginBottom: 15
            }}>
              <MenuIcon/>Description
            </div>
            <AddCardDescription toggleDescription={toggleDescription} setToggleDescription={setToggleDescription}
                                card={card} setCard={setCard}/>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <AccessTimeIcon/>
              <p>Due Date</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                name="date"
                value={new Date(card.dueDate)}
                onChange={handleOnDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{marginTop: 10}}>
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
              <LabelIcon />
              <p>Labels</p>
            </div>
            <AddLabel card={card} setCardLabel={setCardLabel} boardLists={boardLists} setBoardLists={setBoardLists} list={list} />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CardInfo;
