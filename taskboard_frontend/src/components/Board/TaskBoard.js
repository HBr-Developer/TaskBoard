import AddList from "../List/AddList";
import List from "../List/List";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

//Demo data
const Board = () => {
  const [toggleNewList, setToggleNewList] = useState(false);
  const [boardLists, setBoardLists] = useState([]);
  const [boardTitle, setBoardtitle] = useState("");
  const { id } = useParams();

  // getting board data from DB
  const getSingleBoard = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/board/${id}`);
      setBoardtitle(response.data.name);
      setBoardLists(response.data.lists);
    } catch (err) {
      console.log(err);
    }
  };

  // update DB while dragging cards
  const updateLists = async (source, destination) => {
    const sourceList = {
      ...boardLists.filter((list) => list._id === source.droppableId)[0],
    };
    const destinationList = {
      ...boardLists.filter((list) => list._id === destination.droppableId)[0],
    };
    const draggedCard = sourceList.cards.splice(source.index, 1)[0];
    destinationList.cards.splice(destination.index, 0, draggedCard);
    if (sourceList._id === destinationList._id) {
      try {
        const cards = sourceList.cards.map((card) => card._id);
        await axios.patch(`http://localhost:3001/list/${sourceList._id}`, {
          cards: cards,
        });
        getSingleBoard();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const sourceCards = sourceList.cards.map((card) => card._id);
        const destinationCards = destinationList.cards.map((card) => card._id);
        // update list_id
        await axios.patch(`http://localhost:3001/card/${draggedCard._id}`, {
          list_id: destinationList._id,
        });
        //update sourceList
        await axios.patch(`http://localhost:3001/list/${sourceList._id}`, {
          cards: sourceCards,
        });
        // update destination list
        await axios.patch(`http://localhost:3001/list/${destinationList._id}`, {
          cards: destinationCards,
        });
        getSingleBoard();
      } catch (err) {
        console.log(err);
      }
    }
  };
  // const updateBoard = async (newBoardList)
  const updateBoard = async (source, destination) => {
    const newBoard = boardLists;
    console.log("newBoard", newBoard);
    const draggedList = newBoard.splice(source.index, 1)[0];
    console.log("draggedList", draggedList);
    newBoard.splice(destination.index, 0, draggedList);
    const newBoardLists = newBoard.map((list) => list._id);
    console.log("newBoardLists", newBoardLists);
    try {
      await axios.patch(`http://localhost:3001/board/${id}`, {
        lists: newBoardLists,
      });
    } catch (err) {
      console.log(err);
    }
    setBoardLists(newBoard);
    // getSingleBoard();
  };

  useEffect(() => {
    getSingleBoard();
  }, [boardLists]);

  const BoardStyle = {
    paddingTop: 30,
    // backgroundColor: "#282c34",
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    overflowX: "auto",
    title: {
      // color: '#E1E2E9',
      fontSize: "1.5rem",
      color: "#495151",
      margin: 0,
      paddingTop: 10,
      paddingLeft: "1rem",
      // backgroundColor: "#282c34",
    },
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (type === "list") {
      updateBoard(source, destination);
    } else {
      updateLists(source, destination);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <h1 style={BoardStyle.title}>{boardTitle}</h1>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={BoardStyle}
            >
              {boardLists.map((list, index) => (
                <List
                  index={index}
                  key={list._id}
                  list={list}
                  boardLists={boardLists}
                  setBoardLists={setBoardLists}
                />
              ))}
              {provided.placeholder}
              <AddList
                toggleNewList={toggleNewList}
                setToggleNewList={setToggleNewList}
                boardLists={boardLists}
                setBoardLists={setBoardLists}
                boardId={id}
              />
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
