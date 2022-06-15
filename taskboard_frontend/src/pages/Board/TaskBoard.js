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
import Popup from "./Popup";
import InviteMember from '../../components/Member/InviteMember';
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import UserAvatar from "../../components/avatar/UserAvatar";

const Board = () => {
  // States
  const [toggleNewList, setToggleNewList] = useState(false);
  const [boardLists, setBoardLists] = useState([]);
  const [boardTitle, setBoardtitle] = useState("");
  const [recordUpdate, setRecordUpdate] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRightSidebar, setShowRightSideBar] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
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
    setIsLoading(true);
    setTimeout(() => {
      if (!user) {
        navigate('/login');
        return;
      }
      getSingleBoard();
      getAllMembers();
      setIsLoading(false);
    }, 300);
  }, [id]);
  
  // useEffect(() => {
  //   getAllMembers();
  //   console.log('invited');
  // }, []);
  
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
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
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
      }, config);
    } catch (err) {
      console.log(err);
    }
    setBoardLists(newBoard);
    // getSingleBoard();
  };
  
  // get Members
  const getAllMembers = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      // get invited members
      const response2 = await axios.get(`http://localhost:3001/member/${id}`);
      const allInvitedMember = response2.data.map((member) => (
        { _id: member.user._id, name: member.user.name, email: member.user.email, role: member.role }
      ))
      setInvitedMembers(allInvitedMember);
      
      // get All members
      const response1 = await axios.get("http://localhost:3001/member", config);
      const Member = response1.data.map((member) => ({ _id: member._id, name: member.name, email: member.email }));
      
      // checking for duplicated values
      for (let i = 0; i < allInvitedMember.length; i++) {
        const index = Member.findIndex((mem) => {
          return mem._id === allInvitedMember[i]._id;
        })
        Member.splice(index, 1);
      }
      setAllMembers(Member);
      
      // let found = false;
      // for (let i = 0; i < response1.data.length; i++) {
      //   found = false;
      //   for (let e = 0; e < allInvitedMember.length; e++) {
      //     if(response1.data[i]._id === allInvitedMember[e]._id) {
      //       found = true;
      //     }
      //   }
      //   if(!found) {
      //     Member.push(response1.data[i]);
      //   }
      // }
    } catch (err) {
      console.log(err)
    }
  }
  
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
      alignItems: 'center',
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
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    separator: {
      height: 18, borderRight: '1px solid #a6a6a6', marginRight: 7
    },
    membersAvatars: {
      display: 'flex',
      flexDirection: 'row'
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
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={BoardStyle.topBar}>
          <p style={BoardStyle.title}>{boardTitle}</p>
          <div style={BoardStyle.members}>
            <p style={BoardStyle.separator}></p>
            <div className='membersAvatars' style={BoardStyle.membersAvatars}>
              {invitedMembers.map((member) => (
                <UserAvatar key={member.name} name={member.name}/>
              ))}
            </div>
            <Button variant='contained' sx={{ paddingLeft: 1, paddingRight: 1, marginLeft: 1, fontSize: '0.8rem' }}
                    onClick={() => setOpenPopup(true)}>
              <PersonAddAltIcon sx={{ fontSize: 18, marginRight: 0.5 }}/> Share
            </Button>
          </div>
          
          {/*// Show menu button*/}
          <Button
            variant="contained"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
              marginLeft: 80,
              fontSize: "0.8rem",
            }}
            onClick={() => setShowRightSideBar(!showRightSidebar)}
          >
            <MenuOpenIcon sx={{ fontSize: 18 }}/> Show menu
          </Button>
          <RightSidebar
            showRightSidebar={showRightSidebar}
            setShowRightSideBar={setShowRightSideBar}
          />
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setRecordUpdate={setRecordUpdate}
        recordUpdate={recordUpdate}
        title={"Share board"}
      >
        <InviteMember
          allMembers={allMembers}
          setAllMembers={setAllMembers}
          invitedMembers={invitedMembers}
          setInvitedMembers={setInvitedMembers}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          recordUpdate={recordUpdate}
          user={user}
          boardId={id}
        />
      </Popup>
    </>
  );
};

export default Board;
