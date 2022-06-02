import { TextField, Grid, Button, Stack, Paper, Alert } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardForm({ recordUpdate, openPopup, setOpenPopup }) {
  let initialState = recordUpdate;

  const styles = {
    form: {
      display: flexbox,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    inputStyle: {
      width: "100%",
      "&:not(:last-child)": {
        marginBottom: 5,
      },
    },
    title: {
      fontSize: 25,
      marginBottom: 50,
    },
    submit: {
      textAlign: "center",
    },
    paper: {
      margin: "auto",
      paddingTop: 2,
      paddingBottom: 8,
      paddingLeft: 5,
      paddingRight: 5,
      width: "10  0%",
    },
  };

  const [state, setState] = useState(initialState);

  const { name, descData } = state;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (state._id) {
      getSingleBoard(state._id);
    }
  }, []);

  //getSingleBoard
  const getSingleBoard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/board/${state._id}`
      );
      setState(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //addBoard
  const addBoard = (data) => {
    console.log('addData', data);
    axios
      .post("http://localhost:3001/board/create", data)
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //updateBoard
  const updateBoard = (data) => {
    console.log('updateData', data);
    axios
      .patch(`http://localhost:3001/board/${state._id}`, data)
      .then((res) => {
        // navigate('/');
        res.json(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handOnleSubmit = (e) => {
    e.preventDefault();
    if (!state._id) {
      addBoard(state);
      setOpenPopup(!openPopup);
    } else {
      updateBoard(state);
      setOpenPopup(!openPopup);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Paper sx={styles.paper}>
        <form onSubmit={handOnleSubmit}>
          <Grid container sx={styles.container}>
            {id && <p style={styles.title}>Update Board</p>}
            <Grid item>
              <TextField
                variant="outlined"
                label="Board Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                sx={styles.inputStyle}
              />
              <TextField
                variant="outlined"
                label="Board Description"
                name="descData"
                value={descData}
                onChange={handleInputChange}
                sx={styles.inputStyle}
              />
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  children="Submit"
                  size="large"
                  sx={styles.submit}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default BoardForm;
