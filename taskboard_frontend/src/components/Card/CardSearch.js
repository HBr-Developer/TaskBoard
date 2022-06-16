import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserAvatar from "../avatar/UserAvatar";
import CloseIcon from "@mui/icons-material/Close";
import "./cardSearch.css";

const CardSearch = ({ searched, setSearched, invitedMembers, setOpen }) => {
  console.log('searched', searched);

  const handleOnChange = (e) => {
    if(e.target.name === 'members') {
      if(e.target.checked) {
        console.log(`${e.target.value} is checked`);
        setSearched((prevState) => ({
          ...prevState,
          [e.target.name]: [...searched.members ,e.target.value]
        }));
      } else if(!e.target.checked) {
        const spliced = searched.members.splice(searched.members.indexOf(e.target.value), 1);
        setSearched((prevState) => ({
          ...prevState,
          [e.target.name]: searched.members
        }))
      }
    } else
    setSearched((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const styles = {
    boxStyle: {
      width: "100%",
    },
  };
  return (
    <div className="cardSearch">
      <div className="filter-top-bar">
        <p>Filter</p>
        <CloseIcon
          color={"#474747"}
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
                checked={searched.members.length <= 0 ? (false) : (searched.members.includes(member.name))}
              />
              <UserAvatar name={member.name} />
              <span>{member.name}</span>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default CardSearch;
