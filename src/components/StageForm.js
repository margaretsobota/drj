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

const StageForm = ({ stage, steps }) => {
  const styles = useStyles();
  const [stepsState, setSteps] = useState(steps);

  const getNewStep = (phase) => {
    const newStep = {
      title: "",
      description: "",
      stage: phase,
      rating: ""
    };
    return newStep;
  };

  const returnSteps = () => {
    const steps = stepsState.map((step) =>
      <StepForm stage={stage} step={step}/>
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
      </Container>
    </Container>
  )
};



export default StageForm;
