import React, { useState } from "react";
import { Box, Container, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import DragHandleSharpIcon from '@material-ui/icons/DragHandleSharp';
import StarRatings from "react-star-ratings";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
     display: "flex",
     flexDirection: "column",
     flex: 2,
     padding:"0px"
  },
  inputRowContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    padding:"0px"
 },
  sentimentContainer: {
     display: "flex",
     flexDirection: "column",
     flex: 2,
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

const StepForm = ({ phase, step, phaseState, countState, deletedState }) => {
  const styles = useStyles();
  const [ratingState, setRating] = useState(0);
  const stepIndex = step.count;

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

  const handleStepTimeChange = (event) => {
    step.time = event.target.value;
  };

  const deleteStep = () => {
    const copyState = _.cloneDeep(phaseState.phaseState);
    copyState[phase].steps.splice(stepIndex, 1);
    for (let i = stepIndex; i<(copyState[phase].steps).length; i++)
    {
      copyState[phase].steps[i].count --;
    }
    copyState[phase].phaseTotalSteps --;
    phaseState.setPhase(copyState);
    countState.setCount(countState.countState - 1);
    if(step.uuid) {
      const copyDeletedState = _.cloneDeep(deletedState.deletedState);
      copyDeletedState.push(step.uuid);
      deletedState.setDeleted(copyDeletedState);
    }
  }

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
          <TextField
            id="stepTime"
            label="How many days did this take?"
            variant="outlined"
            style = {{marginTop: "57px"}}
            onChange={handleStepTimeChange}
          />
        </Container>
      </Box>
      <Box
        component="div"
        className={styles.iconContainer}
      >
        <IconButton className={styles.iconButton} onClick={deleteStep}>
          <HighlightOffSharpIcon/>
        </IconButton>
      </Box>
  </Container>
)};

export default StepForm;
