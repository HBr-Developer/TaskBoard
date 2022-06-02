import {Paper} from "@mui/material";
import Title from "./Title";
import Card from "../Card/Card";
import AddCard from "../Card/AddCard";
import {useState} from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";

const List = ({ list, boardLists, setBoardLists, index }) => {
    const paperStyle = {
        width: "300px",
        backgroundColor: "#e1e2e9",
        marginLeft: 1.5,
        flexShrink: 0,
    };

    const [toggleAddCard, setToggleAddCard] = useState(false);
    const [listTitle, setListTitle] = useState(list.name);

    return (
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    <Paper sx={paperStyle} {...provided.dragHandleProps}>
                        <Title listTitle={listTitle} setListTitle={setListTitle} listId={list._id} boardLists={boardLists} setBoardLists={setBoardLists}/>
                        <Droppable
                            droppableId={list._id}
                            index={index}
                            type="card"
                        >
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {list.cards.map((card, index) => (
                                        <Card key={card._id} card={card} index={index} list={list} boardLists={boardLists} setBoardLists={setBoardLists} />
                                    ))}
                                    {provided.placeholder}
                                    <AddCard
                                        toggleAddCard={toggleAddCard}
                                        setToggleAddCard={setToggleAddCard}
                                        list={list}
                                        boardLists={boardLists}
                                        setBoardLists={setBoardLists}
                                    />
                                </div>
                            )}
                        </Droppable>
                    </Paper>
                </div>
            )}
        </Draggable>
    );
};

export default List;
