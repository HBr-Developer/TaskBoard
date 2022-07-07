import { TextField } from "@mui/material";
import UserAvatar from "../avatar/UserAvatar";
import CloseIcon from "@mui/icons-material/Close";
import "./cardSearch.css";
import BasicDatePicker from "../BasicDatePicker";
import * as XLSX from "xlsx"

const CardSearch = ({ searched, setSearched, invitedMembers, setOpen, filteredCards, boardLists }) => {
  console.log('searched', searched);
  
  const handleExport = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(filteredCards.length > 0 ? filteredCards : boardLists);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyData.xlsx");
  }

  const handleOnChange = (e) => {
    if(e.target.name === 'members') {
      if(e.target.checked) {
        console.log(`${e.target.value} is checked`);
        setSearched((prevState) => ({
          ...prevState,
          [e.target.name]: [...searched.members ,e.target.value]
        }));
      } else if(!e.target.checked) {
        searched.members.splice(searched.members.indexOf(e.target.value), 1);
        setSearched((prevState) => ({
          ...prevState,
          [e.target.name]: searched.members
        }))
      }
    } else if(e.target.name === 'search') {
      setSearched((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };

  const styles = {
    boxStyle: {
      width: "100%",
    },
    clear: {
      transition: 'background-color 100ms',
      color: "#FFF",
      backgroundColor: '#1976D2',
      width: "100%",
      textAlign: 'center',
      padding: '4px',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderRadius: '5px',
      marginRight: 4,
      cursor: 'pointer'
    },
    export: {
      transition: 'background-color 100ms',
      color: "#FFF",
      backgroundColor: '#05b02e',
      width: "100%",
      textAlign: 'center',
      padding: '4px',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderRadius: '5px',
      marginLeft: 4,
      cursor: 'pointer'
    },
    buttons: {
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };
  
  return (
    <div className="cardSearch">
      <div className="filter-top-bar">
        <p>Filter</p>
        <CloseIcon
          sx={{color: '#565656', transition: "color 100ms", '&:hover': {cursor: 'pointer', color: '#a8a8a8'}}}
          fontSize={"small"}
          onClick={() => setOpen(false)}
        />
      </div>
      <p>Keyword</p>
      <TextField
        value={searched.search}
        name="search"
        size="small"
        sx={styles.search}
        fullWidth
        variant="outlined"
        label="Seacrh"
        id="search"
        onChange={handleOnChange}
      />
      <div className={"membersList"}>
        <p>Members</p>
        <form>
          {invitedMembers.map((member) => (
            <div className="members" key={member.name}>
              <input
                name="members"
                type="checkbox"
                value={member.name}
                onChange={handleOnChange}
                checked={searched.members.length <= 0 ? false : (searched.members.includes(member.name))}
              />
              <UserAvatar name={member.name} color={member.color} />
              <span>{member.name}</span>
            </div>
          ))}
        </form>
      </div>
      <div>
        <p>Date</p>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <BasicDatePicker setSearched={setSearched} searched={searched} type='start' />
          <p style={{width: '35px', textAlign: 'center'}}>to</p>
          <BasicDatePicker setSearched={setSearched} searched={searched} type='end' />
        </div>
      </div>
      <div style={styles.buttons}>
        <div style={styles.clear} onClick={() => setSearched({ search: "", members: [], dateRange: [null, null] })}>Clear</div>
        <div style={styles.export} onClick={handleExport}>Export</div>
      </div>
    </div>
  );
};

export default CardSearch;
