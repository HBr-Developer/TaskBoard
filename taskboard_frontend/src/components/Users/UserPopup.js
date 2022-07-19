import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ children, openPopup, setOpenPopup, userToUpdate, setUserToUpdate }) => {
  
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
    setTimeout(() => {
      setUserToUpdate(null);
    }, 100)
  }
  
  return (
    <Dialog open={openPopup}>
      <div style={{ backgroundColor: '#FBFBFB' }}>
        <DialogTitle sx={{ padding: 1 }}>
          <div style={styles.topBar}>
            <div style={{ width: '70%' }}>
              <p>{userToUpdate ? "Update User" : "New User"}</p>
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
