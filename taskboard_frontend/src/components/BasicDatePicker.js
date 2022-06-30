import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './styles.css'

export default function BasicDatePicker({ setSearched, searched, type }) {
  
  const handleOnChange = (newValue) => {
    if (type === 'start') {
      setSearched((prevState) => ({
        ...prevState,
        'dateRange': [newValue, searched.dateRange[1] !== undefined ? searched.dateRange[1] : null]
      }))
    } else {
      setSearched((prevState) => ({
        ...prevState,
        'dateRange': [searched.dateRange[0] !== undefined ? searched.dateRange[0] : null, newValue]
      }))
    }
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        // label="Basic example"
        name="date"
        value={type === 'start' ? (searched.dateRange[0] !== null ? searched.dateRange[0] : null) : (searched.dateRange[1] !== null ? searched.dateRange[1] : null)}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
