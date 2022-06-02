import {useState, useRef} from "react";
import {Typography, InputBase, Popper, Paper, ClickAwayListener, MenuList, MenuItem} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

const Title = ({listTitle, setListTitle, listId, boardLists, setBoardLists}) => {
    const TitleStyle = {
        titleContainer: {
            marginLeft: 8,
            marginRight: 8,
            display: "flex",
            paddingTop: 3.5,
            paddingBottom: 4.5,
            justifyContent: 'center'
        },
        title: {
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: '1.2rem',
            marginBottom: 2
        },
        input: {
            paddingLeft: 1,
            paddingRight: 1,
            fontWeight: "bold",
            fontSize: '1.2rem',
            marginBottom: 2.1
        },
        more: {
            borderRadius: 0.6,
            '&:hover': {
                backgroundColor: "#C7CACB"
            }
        }
    };
    const firstTitle = listTitle;

    const [titleOpned, setTitleOpned] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleOnDelete = async (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        try {
            console.log('listId', listId);
            await axios.delete(`http://localhost:3001/list/${listId}`);
            const newBordLists = boardLists.filter(list => list._id !== listId);
            setBoardLists(newBordLists);
        } catch(err) {
            console.log(err);
        }
    }
    const handleClose = async (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const handleOnBlur = async () => {
        try {
            if (listTitle === firstTitle) {
                setTitleOpned(!titleOpned);
                return;
            }
            await axios.patch(`http://localhost:3001/list/${listId}`, {name: listTitle});
            setTitleOpned(!titleOpned);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {titleOpned ? (
                <div>
                    <InputBase
                        fullWidth
                        disableUnderline={true}
                        value={listTitle}
                        sx={TitleStyle.input}
                        onBlur={handleOnBlur}
                        onChange={(e) => setListTitle(e.target.value)}
                    />
                </div>
            ) : (
                <div style={TitleStyle.titleContainer}>
                    <Typography
                        onClick={() => setTitleOpned(!titleOpned)}
                        sx={TitleStyle.title}
                    >
                        {listTitle}
                    </Typography>
                    <MoreHorizIcon
                        sx={TitleStyle.more}
                        onClick={handleToggle}
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                    />
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        disablePortal
                    >
                        {({TransitionProps, placement}) => (
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        // onKeyDown={handleListKeyDown}
                                        onBlur={() => setOpen(false)}
                                    >
                                        {/*<MenuItem onClick={handleClose}>More</MenuItem>*/}
                                        <MenuItem onClick={handleOnDelete}>Delete List</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Popper>
                </div>
            )}
        </div>
    );
};

export default Title;
