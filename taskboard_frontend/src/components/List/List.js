import { Paper } from "@mui/material";
import Title from "./Title";
import Card from "../Card/Card";
import AddCard from "../Card/AddCard";
import { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ list, boardLists, setBoardLists, index, searched }) => {
  
  const paperStyle = {
    borderRadius: 0.7,
    width: "285px",
    backgroundColor: "#e1e2e9",
    marginLeft: 1.2,
    flexShrink: 0,
  };
  
  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [listTitle, setListTitle] = useState(list.name);
  const [currentList, setCurrentList] = useState(list);
  
  useEffect(() => {
    setCurrentList(list);
  }, [boardLists])
  
  return (
    <Draggable draggableId={currentList._id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper sx={paperStyle} {...provided.dragHandleProps}>
            <Title listTitle={listTitle} setListTitle={setListTitle} listId={currentList._id} boardLists={boardLists}
                   setBoardLists={setBoardLists}/>
            <Droppable
              droppableId={currentList._id}
              index={index}
              type="card"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentList.cards.map((card, index) => (
                    card.name.toLowerCase().includes(searched.search.toLowerCase()) ? (
                      <Card visibility='' key={card._id}
                            card={card} index={index} list={currentList} setList={setCurrentList} boardLists={boardLists}
                            setBoardLists={setBoardLists}/>
                    ) : (
                      <Card visibility='none' key={card._id}
                            card={card} index={index} list={currentList} setList={setCurrentList} boardLists={boardLists}
                            setBoardLists={setBoardLists}/>
                    )
                  ))}
                  {provided.placeholder}
                  <AddCard
                    toggleAddCard={toggleAddCard}
                    setToggleAddCard={setToggleAddCard}
                    list={currentList}
                    setList={setCurrentList}
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
