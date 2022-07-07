import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import CardTitle from "./CardTitle";

const Popup = ({ card, setCard, children, openPopup, setOpenPopup, boardLists, setBoardLists }) => {
  const styles = {
    closeButton: {
      color: '#595656',
      '&:hover': {
        color: '#999696',
        cursor: 'pointer'
      }
    },
    topBar: {
      width: '100%',
      display: "flex",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }
  
  const handleCloseClicked = () => {
    setOpenPopup(false);
    // setRecordUpdate('');
  };
  
  return (
    <Dialog open={openPopup}>
      <div style={{ backgroundColor: '#FBFBFB' }}>
        <DialogTitle sx={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 1 }}>
          <div style={styles.topBar}>
            <div style={{width: '70%'}}>
              <CardTitle card={card} setCard={setCard} boardLists={boardLists}
                         setBoardLists={setBoardLists}/>
            </div>
            <CloseIcon
              onClick={handleCloseClicked}
              sx={styles.closeButton}
            />
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </div>
    </Dialog>
  );
};

export default Popup;
