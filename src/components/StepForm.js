import React, { useState, useEffect } from "react";
import { Paper, Button, Box, Container, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import DragHandleSharpIcon from '@material-ui/icons/DragHandleSharp';
import StarRatings from "react-star-ratings";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
     display: "flex",
     flexDirection: "column",
     flex: 1
  },
  stepTitle: {
    paddingBottom: "10px"
  },
  stepContainer: {
    margin: "5px"
  },
  iconContainer: {
    display:"flex",
    flexDirection: "row-reverse"
  },
  deleteIcon: {
    marginTop:"5px",
    marginRight:"5px"
  }
}));

const StepForm = ({ stage }) => {
  const styles = useStyles();
  const [ratingState, setRating] = useState(0);

  const changeRating= ( newRating, name ) => {
      setRating(newRating);
    }

  return (
    <Container className={styles.stepContainer}>
     <Paper style={{paddingBottom: "15px"}}>
       <Box
         component="div"
         className={styles.iconContainer}
       >
         <Button className={styles.deleteIcon}>
           <DragHandleSharpIcon/>
         </Button>
       </Box>
       <form style={{display: "flex"}}>
        <Container className={styles.inputContainer}>
          <TextField
            className={styles.stepTitle}
            id="stepTitle"
            label="Step Title"
          />
          <TextField
            id="stepDesc"
            label="Step Description"
            variant="outlined"
            multiline
          />
        </Container>
        <Container className={styles.inputContainer}>
          <h3>
            How did this step make you feel?
          </h3>
          <StarRatings
            rating={ratingState}
            changeRating={changeRating}
            starRatedColor="blue"
            numberOfStars={6}
            name="rating"
          />
        </Container>
      </form>
      <Box
        component="div"
        className={styles.iconContainer}
      >
        <Button className={styles.deleteIcon}>
          <HighlightOffSharpIcon/>
        </Button>
      </Box>
    </Paper>
  </Container>
)};

export default StepForm;
