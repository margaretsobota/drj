import React, { useState } from "react";
import { Button, Box, Container, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import DragHandleSharpIcon from '@material-ui/icons/DragHandleSharp';
import StarRatings from "react-star-ratings";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
     display: "flex",
     flexDirection: "column",
     flex: 2,
     padding:"0px"
  },
  sentimentContainer: {
     display: "flex",
     flexDirection: "column",
     flex: 1
  },
  stepTitle: {
    paddingBottom: "10px"
  },
  stepContainer: {
    margin: "0px 0px 15px 37px",
    background: "#F2F2F2",
    width: "840px"
  },
  iconContainer: {
    display:"flex",
    flexDirection: "row-reverse"
  },
  iconButton: {
    marginRight:"-5px"
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
         <IconButton className={styles.iconButton}>
           <DragHandleSharpIcon/>
         </IconButton>
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
            label="Enter description of step here"
            variant="outlined"
            multiline
            onChange={handleStepDescChange}
            rows={4}
          />
        </Container>
        <Container className={styles.sentimentContainer}>
          <h3 style={{fontSize:"12px", fontWeight:"400", fontFamily:"Roboto"}}>
            How did this step <strong>make you feel ?</strong>
          </h3>
          <StarRatings
            rating={ratingState}
            changeRating={changeRating}
            starRatedColor="blue"
            numberOfStars={5}
            name="rating"
            starDimension="15px"
          />
        </Container>
      </Box>
      <Box
        component="div"
        className={styles.iconContainer}
      >
        <IconButton className={styles.iconButton}>
          <HighlightOffSharpIcon/>
        </IconButton>
      </Box>
  </Container>
)};

export default StepForm;
