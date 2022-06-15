import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";
import {format, parseISO} from 'date-fns'
import {Button, Stack} from "@mui/material";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
function CardInfo({ openPopup, setOpenPopup, cardInfo, list, boardLists, setBoardLists }) {
    const [expanded, setExpanded] = useState(false);
    const [cardName, setCardName] = useState(cardInfo.name);
    const [descData, setDescData] = useState(cardInfo.descData)
    const [date, setDate] = useState(format(parseISO(cardInfo.createdAt), 'MM/dd/yyyy'));

    console.log('cardInfo', cardInfo);

    useEffect(() => {

    }, [cardName, descData,date]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (event) => {
        setCardName(event.target.value);
    };

    const handleOnSaveClick = async (id, e) => {
        e.preventDefault();
        const updatedData = await axios.patch(`http://localhost:3001/card/${id}`, {name: cardName, descData: descData});
        const newCard = {
            _id: updatedData.data._id,
            name: updatedData.data.name,
            descData: updatedData.data.descData,
            list_id: updatedData.data.list_id
        }
        const newListCards = list.cards.map(card => card._id === id ? newCard : card);
        const newBordLists = boardLists.map(boardList => boardList._id === list._id ? {...boardList, cards: newListCards} : boardList);
        setBoardLists(newBordLists);
        setOpenPopup(!openPopup);
    }


    const handOnleSubmit = (e) => {
        e.preventDefault();

        setOpenPopup(!openPopup);
    };

    useEffect(() => {
        handleOnSaveClick();
    }, [boardLists])

    const handleOnDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/card/${id}`);
            const newListCards = list.cards.filter(card => card._id !== id);
            const newBordLists = boardLists.map(boardList => boardList._id === list._id ? {...boardList, cards: newListCards} : boardList);
            setBoardLists(newBordLists);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleOnSaveClick();
    }, []);
    return (
        <div>
            <form onSubmit={handOnleSubmit}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "40ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={(e) => handleOnSaveClick(cardInfo._id, e)}
                    >
                        {/*<ModeEditOutlineIcon />*/}
                        Save
                    </Button>
                    {/*<DeleteForeverIcon sx={cardStyle.deleteButton} onClick={() => handleOnDelete(card._id)} />*/}
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            variant="standard"
                            value={cardName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-multiline-static"
                            label="Descrpition"
                            multiline
                            defaultValue={descData}
                            onChange={(e) => setDescData(e.target.value)}
                            variant="standard"
                        />
                    </div>
                    <Stack component="form" noValidate spacing={3}>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            defaultValue={date.toString()}
                            sx={{ width: 250 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Stack>
                </Box>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {/*<ExpandMore*/}
                    {/*    expand={expanded}*/}
                    {/*    onClick={handleExpandClick}*/}
                    {/*    aria-expanded={expanded}*/}
                    {/*    aria-label="show more"*/}
                    {/*>*/}
                    {/*    <ExpandMoreIcon />*/}
                    {/*</ExpandMore>*/}
                </CardActions>
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <Typography paragraph>Method:</Typography>*/}
                {/*        <Typography paragraph>*/}
                {/*            Heat 1/2 cup of the broth in a pot until simmering, add saffron*/}
                {/*            and set aside for 10 minutes.*/}
                {/*        </Typography>*/}
                {/*        <Typography paragraph>*/}
                {/*            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet*/}
                {/*            over medium-high heat. Add chicken, shrimp and chorizo, and cook,*/}
                {/*            stirring occasionally until lightly browned, 6 to 8 minutes.*/}
                {/*            Transfer shrimp to a large plate and set aside, leaving chicken*/}
                {/*            and chorizo in the pan. Add pimentón, bay leaves, garlic,*/}
                {/*            tomatoes, onion, salt and pepper, and cook, stirring often until*/}
                {/*            thickened and fragrant, about 10 minutes. Add saffron broth and*/}
                {/*            remaining 4 1/2 cups chicken broth; bring to a boil.*/}
                {/*        </Typography>*/}
                {/*        <Typography paragraph>*/}
                {/*            Add rice and stir very gently to distribute. Top with artichokes*/}
                {/*            and peppers, and cook without stirring, until most of the liquid*/}
                {/*            is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add*/}
                {/*            reserved shrimp and mussels, tucking them down into the rice, and*/}
                {/*            cook again without stirring, until mussels have opened and rice is*/}
                {/*            just tender, 5 to 7 minutes more. (Discard any mussels that*/}
                {/*            don&apos;t open.)*/}
                {/*        </Typography>*/}
                {/*        <Typography>*/}
                {/*            Set aside off of the heat to let rest for 10 minutes, and then*/}
                {/*            serve.*/}
                {/*        </Typography>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
            </form>
        </div>
    );
}

export default CardInfo;