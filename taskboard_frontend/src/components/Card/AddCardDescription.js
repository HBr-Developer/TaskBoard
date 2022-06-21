import { InputBase, Paper, Typography, Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddCardDescription = ({ toggleDescription, setToggleDescription, card, setCard }) => {
  const addCardStyle = {
    add: {
      borderRadius: 0.7,
      padding: 0.2,
      marginTop: 0,
      marginLeft: 1,
      marginRight: 1,
      backgroundColor: "#f6f6f6",
      flexShrink: 0,
    },
    descriptionText: {
      fontSize: "1rem",
      border: "0.5px solid #d7d7d7",
      borderRadius: 1,
      padding: 1,
      paddingLeft: 1,
      paddingRight: 1,
      color: '#9a9a9a',
      '&:hover': {
        cursor: 'text',
        backgroundColor: '#fcfcfc'
      }
    }
  };
  const inputCard = {
    cont: {
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      // width: '500px',
      borderRadius: 0.7,
      marginTop: 0,
      marginLeft: 1,
      marginRight: 1,
      padding: 0.5,
      paddingBottom: 6,
    },
    addButton: {
      margin: 1
    },
  };
  
  const [description, setDescription] = useState(card.descData);
  const handleOnClick = async () => {
    if (!description) return;
    try {
      setCard({...card, descData: description})
      await axios.patch(`http://localhost:3001/card/${card._id}`, {...card, descData: description});
      setToggleDescription(!toggleDescription);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div style={{width: '100%'}}>
      <Collapse in={!toggleDescription}>
        <Typography onClick={() => setToggleDescription(!toggleDescription)}
                    sx={addCardStyle.descriptionText}>{card.descData ? (card.descData) : ("Card Description")}</Typography>
      </Collapse>
      
      <Collapse in={toggleDescription}>
        <div>
          <div>
            <Paper sx={inputCard.paper}>
              <InputBase
                multiline
                fullWidth
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Paper>
          </div>
         
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              
            }}
          >
            <Button
              sx={inputCard.addButton}
              variant="contained"
              children="Save"
              color="success"
              onClick={handleOnClick}
            />
            <CloseIcon
              fontSize="large"
              sx={{
                color: "#000000",
                marginLeft: 2,
                "&:hover": {
                  cursor: "pointer",
                  color: "#d8d8d8",
                },
              }}
              onClick={() => setToggleDescription(!toggleDescription)}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default AddCardDescription;
