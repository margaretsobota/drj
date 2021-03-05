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
    paddingBottom: "30px",
    marginBottom: "16px",
    marginLeft: "72.11px",
    marginRight: "72.11px",
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#303031"
  },
  phaseButton: {
    marginRight: "10px",
    background: "#F2F2F2",
    marginLeft: "16px",
    textTransform: "none",
    fontFamily: "Roboto",
    color: "#303031",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "14px",
    height: "30px",
    width: "130px",
    padding:"10px",
    boxShadow: "-1.13867px -1.13867px 2.27733px rgba(255, 255, 255, 0.5), 1.13867px 1.13867px 2.27733px rgba(170, 170, 204, 0.25), 2.27733px 2.27733px 4.55467px rgba(170, 170, 204, 0.5), -2.27733px -2.27733px 4.55467px #FCF6EC"
  },
  phaseTitle: {
    fontWeight: "400"
  }
}));

const PhaseForm = ({ phase, state, deletedState }) => {
  const styles = useStyles();
  let steps = state.phaseState[phase].steps;
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
      <StepForm
        phase={phase}
        step={step}
        phaseState={state}
        countState={{countState, setCount}}
        deletedState={deletedState}
      />
    );
    return (
      <Box>
        {renderedSteps}
      </Box>
    )
  };

  const addStep = () => {
    steps.push(getNewStep());
    const copyState = _.cloneDeep(state.phaseState);
    copyState[phase].steps = steps
    copyState[phase].phaseTotalSteps = copyState[phase].phaseTotalSteps + 1;
    state.setPhase(copyState);
  }

  const phaseIndex = Object.keys(state.phaseState).indexOf(phase);

  return (
    <Container className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>
        Phase {phaseIndex + 1}: <strong>{phase.charAt(0).toUpperCase() + phase.slice(1)}</strong>
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
