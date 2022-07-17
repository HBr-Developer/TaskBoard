import { useEffect, useState } from "react";
import './addLabel.css';
import { Collapse } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddLabel = ({ card, setCardLabel, boardLists, setBoardLists, list }) => {
  const [showLabels, setShowLabels] = useState(false);
  const [newLabel, setNewLabel] = useState({ color: '', title: '' });
  const [labels, setLabels] = useState([{ color: '#ff0000', title: 'urgent' }, {
    color: '#ffe900',
    title: 'warning'
  }, { color: '#07de17', title: 'Mars IT' }]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [addLabel, setAddLabel] = useState(false);
  
  console.log('selectedLabel', selectedLabel);
  
  useEffect(() => {
    labelsOfBoard();
    setSelectedLabel(card.label);
  }, [])
  
  const labelsOfBoard = async () => {
    const boardLabels = await axios.get(`http://localhost:3001/label/${list.board_id}`);
    console.log('boardLabels', boardLabels.data);
    if (boardLabels.data) {
      setLabels(boardLabels.data);
    }
  }
  
  const handleNewLabel = async () => {
    if (newLabel.color === '' && newLabel.title === '') return;
    const nl = await axios.post('http://localhost:3001/label', { ...newLabel, board: list.board_id });
    setLabels([...labels, nl.data]);
    console.log('newLabel', nl.data);
    setAddLabel(false);
  }
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLabel) return;
    try {
      // await axios.patch(`http://localhost:3001/label/${selectedLabel._id}`, { card: card._id });
      await axios.patch(`http://localhost:3001/card/${card._id}`, { label: selectedLabel._id });
      const newList = {
        ...list,
        cards: list.cards.map((c) => c._id === card._id ? { ...card, label: selectedLabel } : c)
      };
      setBoardLists(boardLists.map((l) => l._id === newList._id ? newList : l));
    } catch (err) {
      console.log(err);
    }
    
    setCardLabel(selectedLabel);
    setShowLabels(false);
  }
  
  return (
    <div className="add-label-container">
      <Collapse in={!showLabels}>
        <div className="add-label-button" onClick={() => setShowLabels(!showLabels)}>Add Label</div>
      </Collapse>
      <Collapse in={showLabels}>
        <div className="labels-list">
        </div>
        <form className='label-form' onSubmit={handleOnSubmit}>
          {/*select exist labels*/}
          <div className="labels">
            {labels.map((label, index) => (
              <div key={index} style={{ marginBottom: 5 }}>
                <input type="radio" name="label" id={index}
                       onChange={() => setSelectedLabel({ _id: label._id, color: label.color, title: label.title })}/>
                <label htmlFor={index}>
                  <div style={{
                    backgroundColor: label.color,
                    display: 'inline-block',
                    color: '#FFF',
                    padding: "2px 8px",
                    marginLeft: 3,
                    borderRadius: 3
                  }}>{label.title}</div>
                </label>
              </div>
            ))}
          </div>
          <Collapse in={!addLabel}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: "#d9d9d9",
              justifyContent: 'center',
              color: '#FFF',
              padding: "5px",
              width: '20%'
            }} onClick={() => setAddLabel(!addLabel)}>
              <AddIcon sx={{ padding: 0 }}/> new label
            </div>
          </Collapse>
          <Collapse in={addLabel}>
            <div className="new-label">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input name='color' type="color" value={newLabel.color}
                       onChange={(event) => setNewLabel({ ...newLabel, color: event.target.value })}/>
                <input type="text" value={newLabel.title}
                       onChange={(event) => setNewLabel({ ...newLabel, title: event.target.value })}/>
                <div style={{
                  backgroundColor: '#4D56BF',
                  color: '#FFFFFF',
                  padding: "3px 10px",
                  marginLeft: 10,
                  borderRadius: 3,
                  cursor: 'pointer'
                }} onClick={handleNewLabel}>Save
                </div>
                <CloseIcon
                  fontSize="large"
                  sx={{
                    fontSize: '30px',
                    color: "#000000",
                    marginLeft: 1,
                    "&:hover": {
                      cursor: "pointer",
                      color: "#d8d8d8",
                    },
                  }}
                  onClick={() => setAddLabel(!addLabel)}
                />
              </div>
            </div>
          </Collapse>
          <div className="new-label-save">
            <input type="submit" value="Save" className="label-submit"/>
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
              onClick={() => setShowLabels(!showLabels)}
            />
          </div>
        </form>
      </Collapse>
    </div>
  );
};

export default AddLabel;
