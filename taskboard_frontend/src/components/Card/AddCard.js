import {
  Collapse,
  InputBase,
  Paper,
  Typography,
  unstable_useId,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddCard = ({
  toggleAddCard,
  setToggleAddCard,
  list,
  boardLists,
  setBoardLists,
}) => {
  const addCardStyle = {
    add: {
      borderRadius: 0.7,
      padding: 0.5,
      marginTop: 0.1,
      marginLeft: 1,
      marginRight: 1,
      backgroundColor: "#e1e2e9",
    },
  };
  const inputCard = {
    cont: {
      marginTop: 0.5,
      marginLeft: 1,
      marginRight: 1,
      paddingBottom: 4,
      paddingLeft: 1,
      paddingTop: 0.5,
    },
    addButton: {
      margin: 1,
    },
  };

  const [cardTitle, setCardTitle] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (!cardTitle) return;
    console.log(list);
    const { data } = await axios.post(
      `http://localhost:3001/card/${list._id}/create`,
      {
        name: cardTitle,
        list_id: list._id,
      }
    );
    const newCard = { _id: data._id, name: data.name, list_id: data.list_id };
    console.log("newCard", newCard);
    const newList = { ...list, cards: [...list.cards, newCard] };
    const newBoardLists = boardLists.map((boardList) =>
      boardList._id === list._id ? newList : boardList
    );
    setBoardLists(newBoardLists);
    setToggleAddCard(!toggleAddCard);
    setCardTitle("");
  };

  const handleOnClose = () => {
    setToggleAddCard(!toggleAddCard);
    setCardTitle("");
  };

  return (
    <>
      <Collapse in={!toggleAddCard}>
        <Paper sx={addCardStyle.add} variant={"elevation = 0"}>
          <Button
            children={
              <>
                <AddIcon sx={{ fontSize: "1rem" }} />
                <Typography sx={{ fontSize: "0.9rem" }}>Add card</Typography>
              </>
            }
            color="inherit"
            onClick={() => setToggleAddCard(!toggleAddCard)}
          />
        </Paper>
      </Collapse>

      <Collapse in={toggleAddCard}>
        <Paper sx={inputCard.cont}>
          <InputBase
            multiline
            fullWidth
            placeholder="Enter Card Title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </Paper>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            sx={inputCard.addButton}
            variant="contained"
            children="Add card"
            color="success"
            onClick={handleOnClick}
          />
          <CloseIcon
            fontSize="large"
            sx={{
              marginLeft: 2,
              "&:hover": {
                cursor: "pointer",
                color: "#353639",
              },
            }}
            onClick={handleOnClose}
          />
        </div>
      </Collapse>
    </>
  );
};

export default AddCard;
