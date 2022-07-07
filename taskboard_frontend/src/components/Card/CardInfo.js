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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CardMemberInvite from "./CardMemberInvite";

function CardInfo({ card, setCard, cardMembers, board, invitedMembers, setCardMembers }) {
  const [toggleDescription, setToggleDescription] = useState(false);
  const [cardLabel, setCardLabel] = useState(card.label ? {
    name: card.label.name,
    color: card.label.color
  } : { name: '', color: '' });
  const [notCardMembers, setNotCardMembers] = useState(invitedMembers.filter((mem) => (!cardMembers.map((cMem) => cMem._id).includes(mem._id))));
  
  console.log('invitedMembers', notCardMembers);
  
  const styles = {
    paper: {
      margin: "auto",
      paddingTop: 2,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 3,
      width: "600px",
    },
    description: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
      marginBottom: 20
    }
  };
  
  const handleOnLabelSubmit = async (e) => {
    e.preventDefault();
    if (cardLabel.name === "" || cardLabel.color === "") {
    
    } else {
      if (!card.label) {
        try {
          const lb = await axios.post("http://localhost:3001/label/", {
            name: cardLabel.name,
            color: cardLabel.color,
            card: card._id,
            board: board
          });
          console.log('label' ,lb);
          await axios.patch(`http://localhost:3001/card/${card._id}`, { label: lb.data._id });
          setCard({ ...card, label: {name: cardLabel.name, color: cardLabel.color} });
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const lb = await axios.patch(`http://localhost:3001/label/${card._id}`, {
            name: cardLabel.name,
            color: cardLabel.color
          });
          setCard({ ...card, label: {name: cardLabel.name, color: cardLabel.color} });
          console.log('label' ,lb);
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
  
  const handleOnDateChange = async (newValue) => {
    setCard({ ...card, dueDate: newValue });
    try {
      await axios.patch(`http://localhost:3001/card/${card._id}`, { dueDate: newValue });
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
            <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              {cardMembers.map((mem, index) => (
                <UserAvatar key={index} name={mem.name} color={mem.color}/>
              ))}
              <CardMemberInvite key={card._id} card={card} notCardMembers={notCardMembers} setNotCardMembers={setNotCardMembers} cardMembers={cardMembers} setCardMembers={setCardMembers} />
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
          {/*Date Picker*/}
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <AccessTimeIcon/>
              <p>Due Date</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                inputFormat={"dd/MM/yyyy HH:mm"}
                name="date"
                value={new Date(card.dueDate)}
                onChange={handleOnDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          
          {/*label*/}
          <div style={{ marginTop: 15 }}>
            <p style={{marginBottom: 10}}>Label</p>
            <form onSubmit={handleOnLabelSubmit}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input type="color" name="color" value={cardLabel.color} onChange={(e) => setCardLabel({ ...cardLabel, color: e.target.value })}
                       style={{ border: 0, width: 30, height: 30 }}/>
                <input type="text" name="name" value={cardLabel.name} onChange={(e) => setCardLabel({ ...cardLabel, name: e.target.value })}
                       style={{ padding: 5, marginLeft: 10 }}/>
                <input type="submit" value={"save"}
                       style={{ padding: "6px 10px 6px 10px", margin: 0, marginLeft: 10 }}/>
              </div>
            </form>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CardInfo;
