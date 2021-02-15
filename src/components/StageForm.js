import React, { useState, useEffect } from "react";
import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';

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
    title: "",
    description: ""
  };
  const [stepsState, setSteps] = useState([newStep]);

  const returnSteps = () => {
    const steps = stepsState.map((step) =>
      <StepForm/>
    );
    return (
      <Box>
        {steps}
      </Box>
    )
  };

  const addStep = () => {
    const newSteps = stepsState.concat(newStep);
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
