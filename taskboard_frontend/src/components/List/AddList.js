import {InputBase, Paper, Typography, Collapse} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddCard = ({toggleNewList, setToggleNewList, boardLists, setBoardLists, boardId}) => {
    const addCardStyle = {
        add: {
            width: 300,
            padding: 0.5,
            marginTop: 0,
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: "#C7C8C9",
            flexShrink: 0,
        },
    };
    const inputCard = {
        cont: {
            display: "flex",
            flexDirection: "column",
        },
        paper: {
            width: 300,
            marginTop: 0,
            marginLeft: 1,
            marginRight: 1,
            padding: 0.5
        },
        addButton: {
            margin: 1,
        },
    };

    const [title, setTitle] = useState("");
    const handleOnClick = async () => {
        if (!title) return;
        try {
            console.log('boardLists', boardLists);
            const newListItem = {
                name: title,
                cards: [],
                board_id: boardId
            };

            const {data} = await axios.post(`http://localhost:3001/list/${boardId}/create`, newListItem);
            const newList = {_id: data._id, name: data.name, cards: data.cards, board_id: data.board_id}
            console.log('newList', newList);
            setBoardLists([...boardLists, {...newList}]);
            setTitle("");
            setToggleNewList(!toggleNewList);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Collapse in={!toggleNewList}>
                <Paper sx={addCardStyle.add}>
                    <Button
                        children={
                            <>
                                <AddIcon/>
                                <Typography>Add New List</Typography>
                            </>
                        }
                        color="inherit"
                        onClick={() => setToggleNewList(!toggleNewList)}
                    />
                </Paper>
            </Collapse>

            <Collapse in={toggleNewList}>
                <div>
                    <Paper sx={inputCard.paper}>
                        <InputBase
                            multiline
                            fullWidth
                            placeholder="Enter List Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            sx={inputCard.addButton}
                            variant="contained"
                            children="ADD List"
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
                            onClick={() => setToggleNewList(!toggleNewList)}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default AddCard;
