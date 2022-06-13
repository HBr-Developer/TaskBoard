import AddList from "../../components/List/AddList";
import List from "../../components/List/List";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const Board = () => {
  const [toggleNewList, setToggleNewList] = useState(false);
  const [boardLists, setBoardLists] = useState([]);
  const [boardTitle, setBoardtitle] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  
  // getting board data from DB
  const getSingleBoard = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get(`http://localhost:3001/board/${id}`, config);
      setBoardtitle(response.data.name);
      setBoardLists(response.data.lists);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        navigate('/login');
        return;
      }
      setIsLoading(false);
    }, 500);
    getSingleBoard();
  }, [id]);
  
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
  
  const BoardStyle = {
    paddingTop: 15,
    // backgroundColor: "#282c34",
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      paddingTop: 7
    },
    title: {
      // color: '#E1E2E9',
      fontWeight: 'bold',
      fontSize: "1.3rem",
      color: "#495151",
      paddingLeft: "1rem",
      // backgroundColor: "#282c34",
    },
    members: {
      marginLeft: 100,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    member: { backgroundColor: '#449159', padding: 4, borderRadius: "50%", color: '#FFF', marginRight: 10 },
    separator: {
      height: 18, borderRight: '1px solid #a6a6a6', marginRight: 7
    }
  };
  
  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "list") {
      updateBoard(source, destination);
    } else {
      updateLists(source, destination);
    }
  };
  
  if (isLoading) {
    return <Spinner/>;
  }
  
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={BoardStyle.topBar}>
        <p style={BoardStyle.title}>{boardTitle}</p>
        <div style={BoardStyle.members}>
          <p style={BoardStyle.separator}></p>
          <p style={BoardStyle.member}>HE</p>
          <Button variant='contained' sx={{ paddingLeft: 1, paddingRight: 1, fontSize: '0.8rem' }}>
            <PersonAddAltIcon sx={{ fontSize: 18, marginRight: 0.5 }}/> Share
          </Button>
        </div>
      </div>
      <div>
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
