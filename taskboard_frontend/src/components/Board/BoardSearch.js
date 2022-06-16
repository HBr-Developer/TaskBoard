import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BoardSearch = ({ setSearched }) => {
  const handleOnChange = (e) =>
      setSearched(e.target.value);
  
  const styles = {
    boxStyle: {
      width: 400,
      maxWidth: '100%',
    },
    search: {
    },
  };
  
  return (
    <Box sx={styles.boxStyle}>
      <TextField
        sx={styles.search}
        fullWidth
        variant="outlined"
        label="Seacrh"
        id="fullWidth"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default BoardSearch;
