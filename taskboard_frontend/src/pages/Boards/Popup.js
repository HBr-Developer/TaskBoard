import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ title, children, openPopup, setOpenPopup, setRecordUpdate }) => {
  const styles = {
    closeButton: {
      color: '#595656',
      '&:hover': {
        color: '#999696',
        cursor: 'pointer'
      }
    }
  }

  const handleCloseClicked = () => {
    setOpenPopup(false);
    setRecordUpdate('');
  };

  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <CloseIcon
              onClick={handleCloseClicked}
              sx={styles.closeButton}
          />
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
