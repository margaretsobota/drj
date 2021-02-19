import React, { useState, useEffect } from "react";
import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/database';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  phaseContainer: {
    backgroundColor: "#FCF6EC",
    padding: "16px",
    marginBottom: "16px",
    marginLeft: "72.11px",
    marginRight: "72.11px"
  },
  phaseButton: {
    marginTop: "10px",
    marginRight: "10px",
    background: "#F2F2F2",
    marginLeft: "10px"
  },
  phaseTitle: {
    // fontFamily: "Arboria",
    // fontSize: "23.5646px"
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
      <h2 className={styles.phaseTitle}>
        {phase}
      </h2>
      {returnSteps()}
      <Container>
        <Button
          className={styles.phaseButton}
          variant="contained"
          onClick={addStep}
        >
          <AddCircleIcon/>
          &nbsp;Add Step
        </Button>
      </Container>
    </Container>
  )
};



export default PhaseForm;
