import React, { useState, useEffect } from "react";
import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/database';

const useStyles = makeStyles((theme) => ({
  phaseContainer: {
    backgroundColor: "#AAB6C5",
    padding: "10px",
    marginBottom: "5px"
  },
  phaseButton: {
    marginTop: "10px",
    marginRight: "10px"
  }
}));

const PhaseForm = ({ phase, steps }) => {
  const styles = useStyles();
  const [stepsState, setSteps] = useState(steps);

  useEffect(() => {
    setSteps(steps);
  }, [steps]);

  const getNewStep = (phase) => {
    const newStep = {
      uuid: "",
      title: "",
      description: "",
      phase: phase,
      rating: ""
    };
    return newStep;
  };

  const returnSteps = () => {
    const steps = stepsState.map((step) =>
      <StepForm phase={phase} step={step}/>
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
    <Container className={styles.phaseContainer}>
      <h2>
        {phase}
      </h2>
      {returnSteps()}
      <Container>
        <Button
          className={styles.phaseButton}
          variant="contained"
          onClick={addStep}
        >
          New Step
        </Button>
      </Container>
    </Container>
  )
};



export default PhaseForm;
