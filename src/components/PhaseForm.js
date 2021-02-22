import React, { useState } from "react";
import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/database';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  phaseContainer: {
    backgroundColor: "#FCF6EC",
    padding: "16px",
    marginBottom: "16px",
    marginLeft: "72.11px",
    marginRight: "72.11px"
  },
  phaseButton: {
    marginRight: "10px",
    background: "#F2F2F2",
    marginLeft: "10px"
  }
}));

const PhaseForm = ({ phase, state }) => {
  const styles = useStyles();
  let steps = state.stepsState[phase];
  const [countState, setCount] = useState(1);

  const getNewStep = () => {
    const newStep = {
      uuid: "",
      title: "",
      description: "",
      phase: phase,
      rating: "",
      count: countState
    };
    setCount(countState + 1);
    return newStep;
  };

  const returnSteps = () => {
    const renderedSteps = steps.map((step) =>
      <StepForm phase={phase} step={step}/>
    );
    return (
      <Box>
        {renderedSteps}
      </Box>
    )
  };

  const addStep = () => {
    steps.push(getNewStep());
    const copyState = _.cloneDeep(state.stepsState);
    copyState[phase] = steps;
    state.setSteps(copyState);
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
          startIcon={<AddCircleIcon style={{ color: "#F5BF4F", fontSize: 30 }}/>}
        >
          Add Step
        </Button>
      </Container>
    </Container>
  )
};



export default PhaseForm;
