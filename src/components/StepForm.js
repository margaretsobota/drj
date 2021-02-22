import React, { useState } from "react";
import { Button, Box, Container, TextField } from "@material-ui/core";
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
    margin: "37.53px",
    background: "#F2F2F2",
    paddingBottom: "15px",
    width: "840px"
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

const StepForm = ({ phase, step }) => {
  const styles = useStyles();
  const [ratingState, setRating] = useState(0);

  const changeRating = ( newRating, name ) => {
      step.rating = newRating;
      setRating(newRating);
  }

  const handleStepTitleChange = (event) => {
    step.title = event.target.value;
  }

  const handleStepDescChange = (event) => {
    step.description = event.target.value;
  };

  return (
    <Container className={styles.stepContainer}>
       <Box
         component="div"
         className={styles.iconContainer}
       >
         <Button className={styles.deleteIcon}>
           <DragHandleSharpIcon/>
         </Button>
       </Box>
       <Box component="div" style={{display: "flex"}}>
        <Container className={styles.inputContainer}>
          <TextField
            className={styles.stepTitle}
            id="stepTitle"
            label="Step Title"
            onChange={handleStepTitleChange}
          />
          <TextField
            id="stepDesc"
            label="Step Description"
            variant="outlined"
            multiline
            onChange={handleStepDescChange}
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
            numberOfStars={5}
            name="rating"
          />
        </Container>
      </Box>
      <Box
        component="div"
        className={styles.iconContainer}
      >
        <Button className={styles.deleteIcon}>
          <HighlightOffSharpIcon/>
        </Button>
      </Box>
  </Container>
)};

export default StepForm;
