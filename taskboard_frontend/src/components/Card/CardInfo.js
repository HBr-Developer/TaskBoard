import { Paper } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AddCardDescription from "./AddCardDescription";
import GroupIcon from '@mui/icons-material/Group';
import UserAvatar from "../avatar/UserAvatar";

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
      marginBottom: 30
    }
  };
  
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
        </div>
      </Paper>
    </>
  );
}

export default CardInfo;
