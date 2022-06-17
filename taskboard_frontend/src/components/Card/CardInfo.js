import { TextField, Grid, Button, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import AddCardDescription from "./AddCardDescription";

function CardInfo({ card, setCard, openPopup, setOpenPopup }) {
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start'
    }
  };
  
  const handleOnSubmit = () => {
    setOpenPopup(!openPopup);
  }
  
  return (
    <>
      <Paper elevation={0} sx={styles.paper}>
        <div className="description">
          <div style={styles.description}>
            <MenuIcon />Description
            <AddCardDescription toggleDescription={toggleDescription} setToggleDescription={setToggleDescription} card={card} setCard={setCard} />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CardInfo;
