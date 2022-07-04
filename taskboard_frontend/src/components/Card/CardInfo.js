import { Paper } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AddCardDescription from "./AddCardDescription";
import GroupIcon from '@mui/icons-material/Group';
import UserAvatar from "../avatar/UserAvatar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function CardInfo({ card, setCard, cardMembers }) {
  const [toggleDescription, setToggleDescription] = useState(false);
  
  const styles = {
    paper: {
      margin: "auto",
      paddingTop: 2,
      paddingBottom: 8,
      paddingLeft: 5,
      paddingRight: 5,
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
  
  const handleOnDateChange = async (newValue) => {
    setCard({ ...card, dueDate: newValue});
    try {
      await axios.patch(`http://localhost:3001/card/${card._id}`, {dueDate: newValue})
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <Paper elevation={0} sx={styles.paper}>
        <div className="description">
          <div style={styles.description}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'center', marginBottom: 15}}>
              <GroupIcon />Members
            </div>
            <div>
              {cardMembers.map((mem) => (
                <UserAvatar key={mem.name} name={mem.name} />
              ))}
            </div>
          </div>
  
          <div style={styles.description}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'center', marginBottom: 15}}>
              <MenuIcon/>Description
            </div>
            <AddCardDescription toggleDescription={toggleDescription} setToggleDescription={setToggleDescription}
                                card={card} setCard={setCard}/>
          </div>
          <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <AccessTimeIcon />
              <p>Due Date</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="date"
                value={new Date(card.dueDate)}
                onChange={handleOnDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CardInfo;
