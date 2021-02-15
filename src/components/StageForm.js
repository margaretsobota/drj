import React, { useState, useEffect } from "react";
import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/database';
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  stageContainer: {
    backgroundColor: "#AAB6C5",
    padding: "10px",
    marginBottom: "5px"
  },
  stageButton: {
    marginTop: "10px",
    marginRight: "10px"
  }
}));

const StageForm = ({ stage }) => {
  const styles = useStyles();
  const newStep = {
    uuid: "",
    title: "",
    description: "",
    stage: stage
  };

  const getNewStep = () => {
    const initStep = _.cloneDeep(newStep);
    initStep.uuid = getNewStepKey(initStep);
    return initStep;
  }

  const getNewStepKey = ( step ) => {
   /* we would do something like this...
     * const teamUID = "";
     * his is not correct yet
     * let newItemKey = firebase.database().ref("teams").child(teamUID).push().key;
     * also not correct
     * firebase.database().ref("teams/" + teamUID + "/" + newItemKey).set(step);
     * return newItemKey;
   */
   return "";

 };

  const [stepsState, setSteps] = useState([getNewStep()]);

  const returnSteps = () => {
    const steps = stepsState.map((step) =>
      <StepForm stage={stage} stepKey={step.uuid}/>
    );
    return (
      <Box>
        {steps}
      </Box>
    )
  };



  const addStep = () => {
    const newSteps = stepsState.concat(getNewStep());
    setSteps(newSteps);
  }

  return (
    <Container className={styles.stageContainer}>
      <h2>
        {stage}
      </h2>
      {returnSteps()}
      <Container>
        <Button
          className={styles.stageButton}
          variant="contained"
          onClick={addStep}
        >
          New Step
        </Button>
        <Button
           className={styles.stageButton}
           variant="contained"
        >
          Save
        </Button>
      </Container>
    </Container>
  )
};



export default StageForm;
